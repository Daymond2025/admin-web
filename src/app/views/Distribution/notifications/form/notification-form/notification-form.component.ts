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

    if (raw.scheduled && raw.send_at) {
      const sendAt = new Date(raw.send_at);
      const formatted = sendAt.toISOString().slice(0, 19).replace("T", " ");
      formData.append("send_at", formatted);
    }

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

        if (notifId) {
          console.log("🚀 Envoi immédiat de la notification...");
          this.notificationService.sendNow(notifId).subscribe({
            next: (response) => {
              console.log("📣 Notification envoyée avec succès !");
              console.log("📦 Réponse de l’envoi :", response);

              // 👀 Ajoute ces logs pour voir ce qui sort du backend
              if (response?.tokens_debug?.length === 0) {
                console.warn(
                  "⚠️ Aucun token n’a été récupéré pour cette audience !"
                );
                console.log(
                  "🎯 Utilisateurs ciblés :",
                  response?.user_ids_debug || []
                );
              } else {
                console.log("📬 Tokens ciblés :", response?.tokens_debug);
              }

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
              console.error("🪵 Erreur d’envoi :", err);
            },
          });
        } else {
          console.error("❌ Aucun ID récupéré après création.");
        }
      },
      error: (err) => {
        console.error("❌ Échec de la création !");
        console.error("🪵 Détails :", err);
        if (err?.error?.message)
          console.error("📩 Message du backend :", err.error.message);
        if (err?.error?.errors)
          console.error("📋 Erreurs de validation :", err.error.errors);
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
