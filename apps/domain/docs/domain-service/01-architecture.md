# Domain Service Architecture
Status: FINAL  
Version: 1.0  
Owner: Assistenku Admin (Core)

---

## 1. Tujuan

Dokumen ini mendefinisikan arsitektur teknis layanan **Domain sebagai Layanan (Managed Domain Service)** di Assistenku.

Tujuan utama:
- Domain sebagai layanan terkelola
- Admin sebagai pengendali lifecycle
- Pemisahan domain layer dan hosting layer
- Siap diskalakan secara nasional

---

## 2. Prinsip Arsitektur (Dikunci)

1. Assistenku bukan registrar, melainkan managed domain provider
2. Semua domain dikontrol oleh Admin
3. Customer tidak memiliki akses registrar
4. Domain dan hosting adalah layer terpisah
5. Semua aktivitas tercatat di audit log
6. Vendor hosting bersifat replaceable
7. Vercel tidak digunakan

---

## 3. High-Level Architecture
Customer App
↓
Assistenku Admin (Core)
↓
┌──────────────────┬───────────────────┐
│ Domain Layer │ Hosting Layer │
│ (Registrar API) │ (Web / App Server)│
└──────────────────┴───────────────────┘


---

## 4. Domain Layer

### Fungsi:
- Registrasi domain
- Renewal otomatis
- Suspend & release
- Transfer manual via Admin

### Data yang Disimpan:
- domain_name
- tld
- customer_id
- registrar
- registrar_domain_id
- expiry_date
- status
- auto_renew

Password registrar **tidak pernah disimpan**.

---

## 5. Hosting Layer

Hosting digunakan untuk:
- Website profil klien
- Landing page bisnis
- Aplikasi Assistenku

Hosting:
- Tidak dijual mentah
- Selalu bundled
- Dikelola oleh Admin

---

## 6. Keputusan Final

- Domain atas nama customer
- Kontrol penuh di Admin
- Renewal wajib
- Tidak ada domain tanpa kontrak layanan
