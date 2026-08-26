"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DICTIONARY = {
  en: {
    backToHome: "Back to Home",
    title: "Terms of Service",
    s1Title: "1. Acceptance of Terms",
    s1Desc: "By accessing and using MockGen, you accept and agree to be bound by the terms and provision of this agreement.",
    s2Title: "2. Use of Service",
    s2Desc: "MockGen provides a platform for generating mock APIs. You agree to use this service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of MockGen.",
    s3Title: "3. Data Generation and Privacy",
    s3Desc: "The mock data generated using faker.js is random and fictional. Do not use real personally identifiable information (PII) in your schema configurations. We are not responsible for any sensitive data you choose to hardcode into your mock schemas.",
    s4Title: "4. Disclaimer of Warranties",
    s4Desc: "The service is provided \"as is\". MockGen makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    s5Title: "5. Limitation of Liability",
    s5Desc: "In no event shall MockGen or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MockGen's website."
  },
  tr: {
    backToHome: "Ana Sayfaya Dön",
    title: "Hizmet Şartları",
    s1Title: "1. Şartların Kabulü",
    s1Desc: "MockGen'e erişerek ve kullanarak, bu sözleşmenin şart ve hükümlerini kabul etmiş ve bunlara bağlı kalmayı onaylamış olursunuz.",
    s2Title: "2. Hizmetin Kullanımı",
    s2Desc: "MockGen, sahte (mock) API'ler oluşturmak için bir platform sağlar. Bu hizmeti yalnızca yasal amaçlarla ve başkalarının MockGen'i kullanımını kısıtlamayacak veya engellemeyecek şekilde kullanmayı kabul edersiniz.",
    s3Title: "3. Veri Üretimi ve Gizlilik",
    s3Desc: "Faker.js kullanılarak üretilen sahte veriler rastgele ve kurgusaldır. Şema yapılandırmalarınızda gerçek kişisel olarak tanımlanabilir bilgiler (PII) kullanmayın. Mock şemalarınıza doğrudan (hardcode) yazdığınız hiçbir hassas veriden sorumlu değiliz.",
    s4Title: "4. Garanti Reddi",
    s4Desc: "Hizmet \"olduğu gibi\" sunulmaktadır. MockGen, açık veya zımni hiçbir garanti vermez ve ticari elverişlilik, belirli bir amaca uygunluk veya fikri mülkiyetin ihlal edilmemesi gibi durumlar da dahil olmak üzere diğer tüm garantileri işbu belgeyle reddeder.",
    s5Title: "5. Sorumluluğun Sınırlandırılması",
    s5Desc: "Hiçbir durumda MockGen veya tedarikçileri, MockGen'in web sitesindeki materyallerin kullanımından veya kullanılamamasından kaynaklanan hiçbir zarardan (veri veya kar kaybı veya iş kesintisi dahil, ancak bunlarla sınırlı olmamak üzere) sorumlu tutulamaz."
  }
};

export default function TermsPage() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#810100]/30 py-20 px-6 overflow-hidden z-0">
      {/* Background Red Glow Effects - Breathing & Scattered */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#810100]/40 via-[#810100]/10 to-transparent pointer-events-none animate-[pulse_6s_ease-in-out_infinite]"></div>
      
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#810100]/20 blur-[120px] rounded-full pointer-events-none animate-[pulse_4s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 right-[-100px] w-[400px] h-[400px] bg-[#810100]/20 blur-[100px] rounded-full pointer-events-none animate-[pulse_5s_ease-in-out_infinite]"></div>
      <div className="absolute top-32 left-[-150px] w-[350px] h-[350px] bg-[#810100]/15 blur-[100px] rounded-full pointer-events-none animate-[pulse_7s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-32 right-1/4 w-[450px] h-[450px] bg-[#810100]/10 blur-[120px] rounded-full pointer-events-none animate-[pulse_5.5s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#810100]/5 blur-[150px] rounded-full pointer-events-none animate-[pulse_8s_ease-in-out_infinite]"></div>
      
      <div className="relative max-w-3xl mx-auto z-10">
        <a href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12">
          <ArrowLeft size={16} />
          {t.backToHome}
        </a>
        
        <h1 className="text-4xl font-bold mb-8 tracking-tight">{t.title}</h1>
        
        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{t.s1Title}</h2>
            <p>{t.s1Desc}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{t.s2Title}</h2>
            <p>{t.s2Desc}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{t.s3Title}</h2>
            <p>{t.s3Desc}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{t.s4Title}</h2>
            <p>{t.s4Desc}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{t.s5Title}</h2>
            <p>{t.s5Desc}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
