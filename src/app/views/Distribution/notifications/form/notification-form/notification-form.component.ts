import { Component, Inject, OnInit, Optional } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/shared/services/notification.service";
import { distinctUntilChanged } from "rxjs/operators";
import { ChangeDetectorRef } from "@angular/core";

interface Seller {
  id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  phone_number?: string;
}

@Component({
  selector: "app-notification-form",
  standalone: true,
  templateUrl: "./notification-form.component.html",
  styleUrls: ["./notification-form.component.css"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class NotificationFormComponent implements OnInit {
  form!: FormGroup;
  sellers: Seller[] = [];
  imageFile: File | null = null;
  imagePreview: string | null = null;
  isSubmitting = false;

  audiences = [
    { value: "sellers", label: "Tous les vendeurs" },
    { value: "some", label: "Certains utilisateurs" },
  ];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    @Optional() private dialogRef?: MatDialogRef<NotificationFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        title: ["", [Validators.required, Validators.maxLength(100)]],
        message: ["", [Validators.required, Validators.maxLength(500)]],
        audience: ["sellers", Validators.required],
        selectedUsers: [[]],
        scheduled: [false],
        send_at: [null],
        send_at_time: ["12:00"], // Heure par défaut (midi ?)
      },
      { validators: [this.selectedUsersValidator()] }
    );

    console.log("🎯 Form initialized:", this.form.value);

    this.form
      .get("audience")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        console.log("📢 Audience changed to:", value);
        if (value === "some" && this.sellers.length === 0) {
          console.log("📥 Chargement des vendeurs...");
          this.notificationService.getSellers().subscribe({
            next: (response: Seller[] | { data: Seller[] }) => {
              if (Array.isArray(response)) {
                this.sellers = response;
              } else if (
                response &&
                "data" in response &&
                Array.isArray(response.data)
              ) {
                this.sellers = response.data;
              } else {
                console.warn(
                  "⚠️ Réponse inattendue pour getSellers():",
                  response
                );
                this.sellers = [];
              }

              console.log("✅ Vendeurs chargés :", this.sellers);
            },
            error: (err) => {
              console.error("❌ Erreur chargement vendeurs :", err);
              if (err.error?.errors) {
                console.error("📋 Erreurs de validation :", err.error.errors);
              }
            },
          });
        }
      });

    if (this.data?.notification) {
      this.form.patchValue(this.data.notification);
      console.log("✏️ Formulaire pré-rempli :", this.data.notification);
    }

    setTimeout(() => {
      this.form.get("audience")?.setValue("some");
    }, 1000);
  }

  toggleScheduled(): void {
    if (!this.form.get("scheduled")?.value) {
      this.form.get("send_at")?.setValue(null);
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Seules les images sont autorisées.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("L’image ne doit pas dépasser 2 Mo.");
      return;
    }

    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  private selectedUsersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const audience = control.get("audience")?.value;
      const selected = control.get("selectedUsers")?.value;
      return audience === "some" && (!selected || selected.length === 0)
        ? { noUsersSelected: true }
        : null;
    };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn(
        "⚠️ Formulaire invalide :",
        this.form.errors,
        this.form.value
      );
      return;
    }

    this.isSubmitting = true;
    const raw = this.form.value;
    const formData = new FormData();

    formData.append("title", raw.title.trim());
    formData.append("body", raw.message.trim());
    formData.append("audience", raw.audience);

    // 💡 Traitement de la planification avec date + heure
    if (raw.scheduled && raw.send_at && raw.send_at_time) {
      try {
        const [hours, minutes] = raw.send_at_time.split(":").map(Number);

        const fullDate = new Date(raw.send_at);
        fullDate.setHours(hours);
        fullDate.setMinutes(minutes);
        fullDate.setSeconds(0);
        fullDate.setMilliseconds(0);

        const formatted = fullDate.toISOString().slice(0, 19).replace("T", " ");
        formData.append("send_at", formatted);

        console.log("🗓️ Date et heure combinées :", formatted);
      } catch (err) {
        console.error("⛔ Erreur de combinaison date/heure :", err);
        this.isSubmitting = false;
        return;
      }
    }

    // 🎯 Cibler certains utilisateurs si audience = "some"
    if (raw.audience === "some" && raw.selectedUsers?.length) {
      raw.selectedUsers.forEach((userId: number) => {
        formData.append("selectedUsers[]", userId.toString());
      });
    }

    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }

    console.log("📤 Création de notification avec les données :", formData);

    this.notificationService.createNotification(formData).subscribe({
      next: (res) => {
        const notifId = res?.notification_id || res?.notification?.id;
        console.log("✅ Notification créée avec succès !");
        console.log("🧾 Réponse complète du backend :", res);
        console.log("🆔 ID de la notification :", notifId);

        if (!notifId) {
          console.error(
            "❌ Aucun ID de notification trouvé, arrêt du processus."
          );
          return;
        }

        // ✅ Envoi immédiat uniquement si non programmé
        if (!raw.scheduled) {
          console.log("🚀 Envoi immédiat de la notification...");

          this.notificationService.sendNow(notifId).subscribe({
            next: (response) => {
              console.log("📣 Notification envoyée avec succès !");
              console.log("📦 Réponse brute de l’envoi :", response);

              const tokens = response?.tokens_debug || [];
              const users = response?.user_ids_debug || [];
              const fcmResponse = response?.fcm_response;

              if (!Array.isArray(tokens)) {
                console.warn("❗ 'tokens_debug' n’est pas un tableau !");
              }

              if (tokens.length === 0) {
                console.warn("⚠️ Aucun token récupéré pour cette audience !");
                console.log("👥 Utilisateurs ciblés :", users);
              } else {
                console.log(
                  `📬 ${tokens.length} token(s) récupéré(s) :`,
                  tokens
                );
              }

              if (fcmResponse) {
                console.log("📨 Réponse brute FCM :", fcmResponse);
              } else {
                console.warn("🕳️ Aucune réponse FCM dans la réponse API.");
              }

              if (response?.fcm_errors?.length) {
                console.warn("🚫 Erreurs FCM détectées :", response.fcm_errors);
              }

              // UI feedback
              if (this.dialogRef) {
                console.log("🔙 Fermeture du dialogue.");
                this.dialogRef.close(true);
              } else {
                console.log("🔀 Redirection vers la liste des notifications.");
                this.router.navigate(["/admin/notifications"]);
              }
            },
            error: (err) => {
              console.error("❌ Envoi de la notification échoué !");
              console.error("🪵 Erreur complète :", err);

              if (err?.error?.message)
                console.error("📩 Message du backend :", err.error.message);

              if (err?.error?.errors)
                console.error("📋 Erreurs de validation :", err.error.errors);

              if (err?.status) {
                console.warn("🔢 Code d’erreur HTTP :", err.status);
              }
            },
          });
        } else {
          // ⏳ Notification planifiée, pas d’envoi immédiat
          console.log(
            "⏳ Notification planifiée pour plus tard, envoi différé."
          );

          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            this.router.navigate(["/admin/notifications"]);
          }
        }
      },
      error: (err) => {
        console.error("❌ Échec de la création de la notification !");
        console.error("🪵 Détails de l’erreur :", err);

        if (err?.error?.message)
          console.error("📩 Message du backend :", err.error.message);

        if (err?.error?.errors)
          console.error("📋 Erreurs de validation :", err.error.errors);

        if (err?.status) {
          console.warn("🔢 Code d’erreur HTTP :", err.status);
        }
      },
    });
  }

  onCancel(): void {
    if (this.dialogRef) {
      console.log("❌ Annulation via modal.");
      this.dialogRef.close(false);
    } else {
      console.log("❌ Annulation via redirection.");
      this.router.navigate(["/admin/notifications"]);
    }
  }
}
