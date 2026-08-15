# MockGen - Server (Backend)

Bu proje MockGen uygulamasının backend (sunucu) tarafını oluşturur. Güçlü ve ölçeklenebilir bir mimari için NestJS kullanılarak geliştirilmiştir.

##  Teknoloji Yığını (Tech Stack)

- **Framework:** [NestJS 11](https://nestjs.com/)
- **Dil:** TypeScript
- **Veritabanı Sürücüsü:** PostgreSQL (`pg`)
- **Kimlik Doğrulama:** JWT (`@nestjs/jwt`) & bcrypt
- **Sahte Veri (Mocking):** [@faker-js/faker](https://fakerjs.dev/)

##  Başlangıç

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Ön Koşullar

- Node.js (v20 veya üzeri önerilir)
- PostgreSQL Veritabanı
- Docker (İsteğe bağlı, ancak veritabanı kurulumu için önerilir)

### Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Ortam değişkenlerini ayarlayın:
`.env.example` dosyasını kopyalayarak `.env` dosyası oluşturun ve veritabanı bilgileri gibi gerekli değişkenleri doldurun.

```bash
cp .env.example .env
```

### Veritabanı (PostgreSQL)

Eğer Docker yüklüyse projedeki `docker-compose.yml` (ana dizindeki) ile veya kendi yerel PostgreSQL sunucunuz ile veritabanını ayağa kaldırabilirsiniz.
Gerekli tablo yapıları veya başlangıç verileri için `init.sql` dosyasını inceleyebilirsiniz.

### Uygulamayı Çalıştırma

```bash
# Geliştirme modu (watch modu aktif)
npm run start:dev

# Standart çalıştırma
npm run start

# Production modu (önce build alınmalıdır)
npm run build
npm run start:prod
```

##  Proje Yapısı

NestJS'in modüler yapısı benimsenmiştir. Her özellik kendi modülü içinde (Controller, Service, Entity/DTO) gruplandırılmıştır.

- `src/`: Kaynak kodların bulunduğu ana dizin.
  - Genellikle özellikler (features) modüller halinde klasörlenir (örn: `auth`, `users` vb.)
- `init.sql`: Veritabanı şeması veya başlangıç mock verilerini oluşturmak için kullanılan SQL betiği.

##  Testler

Projeyi test etmek için aşağıdaki komutları kullanabilirsiniz:

```bash
# Birim (Unit) testleri
npm run test

# Uçtan uca (e2e) testler
npm run test:e2e

# Test kapsam (coverage) raporu
npm run test:cov
```

##  Kod Standartları

Bu proje genel mimari kuralları (`AGENTS.md`) çerçevesinde geliştirilmektedir. NestJS'in en iyi pratiklerini takip edin:
- Dependency Injection kullanın.
- Controller'lar olabildiğince ince tutulmalı, iş mantığı Service katmanında yer almalıdır.
- Çevresel değişkenler için ConfigModule kullanmaya özen gösterin.
