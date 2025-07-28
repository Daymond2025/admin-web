export interface Notification {
  id: number;
  title: string;
  message?: string;
  audience: 'all' | 'sellers' | 'recruiters' | string;
  is_sent: boolean;          // ← ajouté
  send_at?: string | Date;   // ← ajouté
  sent_at?: string | Date;   // ← si besoin
}