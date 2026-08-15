# MockGen - Client (Frontend)

Bu proje MockGen uygulamasının frontend (istemci) tarafını oluşturur. Modern React ve Next.js pratikleri kullanılarak geliştirilmiştir.

## 🛠 Teknoloji Yığını (Tech Stack)

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Kütüphanesi:** [React 19](https://react.dev/)
- **Stil & Tasarım:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Veri Çekme (Data Fetching):** [TanStack React Query](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Animasyonlar:** [Framer Motion](https://www.framer.com/motion/)
- **İkonlar:** [Lucide React](https://lucide.dev/)
- **Sahte Veri (Mocking):** [@faker-js/faker](https://fakerjs.dev/)

##  Başlangıç

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Ön Koşullar

- Node.js (v20 veya üzeri önerilir)
- npm veya yarn/pnpm

### Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Ortam değişkenlerini ayarlayın:
`.env.example` dosyasını kopyalayarak `.env` veya `.env.local` dosyası oluşturun ve gerekli değişkenleri doldurun.

```bash
cp .env.example .env.local
```

### Geliştirme Sunucusunu Başlatma

Aşağıdaki komutla projeyi geliştirme modunda başlatabilirsiniz:

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışmaya başlayacaktır.

##  Proje Yapısı

Proje genel olarak feature-sliced veya standart Next.js App Router yapısını takip eder. Lütfen projenin ana dizinindeki `AGENTS.md` (Codex Engineering Rules) dosyasını okuduğunuzdan emin olun. Tüm mimari kararlar bu kurallara göre alınmalıdır.

- `src/app`: Sayfalar ve route tanımlamaları.
- `src/components`: Yeniden kullanılabilir UI bileşenleri.
- `src/api`: Axios interceptorları ve API çağrı fonksiyonları.
- `src/hooks`: Custom React hook'ları.
- `src/types`: TypeScript arayüzleri ve tipleri.

##  Mimari ve Kod Standartları Kuralları

Bu projede **SOLID prensipleri**, **Atomic Design** ve **Feature-Sliced Design** prensipleri benimsenmektedir:

- Bileşenler tek bir sorumluluğa sahip olmalı (Single Responsibility).
- API çağrıları doğrudan bileşenlerden (`fetch` veya `axios` ile) yapılmamalı, `src/api` katmanına aktarılmalı ve Hook'lar (`useQuery` vs.) aracılığıyla kullanılmalıdır.
- Tailwind CSS ile stil yazarken tutarlı utility class'lar kullanın.
- Ayrıntılı geliştirici kuralları için ana dizindeki `AGENTS.md` dosyasına başvurun.

##  Kullanılabilir Scriptler

- `npm run dev`: Geliştirme sunucusunu başlatır.
- `npm run build`: Projeyi production için derler.
- `npm run start`: Derlenmiş projeyi production modunda başlatır.
- `npm run lint`: ESLint ile kod analizini çalıştırır.
