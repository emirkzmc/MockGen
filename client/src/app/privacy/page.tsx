"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DICTIONARY = {
  en: {
    backToHome: "Back to Home",
    title: "Privacy Policy",
    s1Title: "1. Information We Collect",
    s1Desc: "When you register for MockGen, we may ask for information such as your name, email address, and company name. We also collect usage data to improve our services and understand how our platform is being used.",
    s2Title: "2. How We Use Your Information",
    s2Desc: "We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect MockGen and our users. We may also use this information to offer you tailored content and communication.",
    s3Title: "3. Data Security",
    s3Desc: "We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure.",
    s4Title: "4. Cookies",
    s4Desc: "We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.",
    s5Title: "5. Third-Party Disclosure",
    s5Desc: "We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users."
  },
  tr: {
    backToHome: "Ana Sayfaya Dön",
    title: "Gizlilik Politikası",
    s1Title: "1. Topladığımız Bilgiler",
    s1Desc: "MockGen'e kayıt olduğunuzda, adınız, e-posta adresiniz ve şirket adınız gibi bilgileri isteyebiliriz. Ayrıca hizmetlerimizi iyileştirmek ve platformumuzun nasıl kullanıldığını anlamak için kullanım verilerini topluyoruz.",
    s2Title: "2. Bilgilerinizi Nasıl Kullanıyoruz",
    s2Desc: "Topladığımız bilgileri hizmetlerimizi sağlamak, sürdürmak ve iyileştirmek, yeni hizmetler geliştirmek ve MockGen ile kullanıcılarımızı korumak için kullanıyoruz. Ayrıca bu bilgileri size özel içerik ve iletişim sunmak için kullanabiliriz.",
    s3Title: "3. Veri Güvenliği",
    s3Desc: "Kişisel bilgilerinizi girerken, gönderirken veya erişirken kişisel bilgilerinizin güvenliğini korumak için çeşitli güvenlik önlemleri uyguluyoruz. Ancak, İnternet üzerinden hiçbir aktarım yöntemi veya elektronik depolama yöntemi %100 güvenli değildir.",
    s4Title: "4. Çerezler",
    s4Desc: "Gelecekteki ziyaretleriniz için tercihlerinizi anlamak, kaydetmek ve gelecekte daha iyi site deneyimleri ve araçları sunabilmek amacıyla site trafiği ve site etkileşimi hakkında toplu veriler derlemek için çerezleri (cookies) kullanıyoruz.",
    s5Title: "5. Üçüncü Taraf İfşası",
    s5Desc: "Kullanıcılara önceden bildirimde bulunmadıkça, Kişisel Olarak Tanımlanabilir Bilgilerinizi satmıyor, takas etmiyor veya dış taraflara aktarmıyoruz. Buna, web sitemizi işletmemize, işimizi yürütmemize veya kullanıcılarımıza hizmet vermemize yardımcı olan web barındırma ortakları ve diğer taraflar dahil değildir."
  }
};

export default function PrivacyPage() {
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
