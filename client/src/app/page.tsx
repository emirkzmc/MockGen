"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { StormCanvas } from "@/components/ui/StormCanvas";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { ArrowRight, Code, ArrowUpRight } from "lucide-react";

const DICTIONARY = {
  en: {
    signIn: "Sign In",
    getStarted: "Get Started",
    buildDynamic: "Build Dynamic",
    mockApis: "Mock APIs",
    withoutBackend: "Without Backend Code",
    heroDesc: "Define your data models once, attach them to endpoints, and get realistic mock data with live previews. The ultimate modular platform for frontend developers.",
    startGenerating: "Start Generating",
    viewOnGithub: "View on GitHub",
    scrollToDive: "Scroll to dive",
    decoupledArch: "Decoupled Architecture",
    decoupledDesc: "Separation of concerns between Data Models (Schemas) and API Routes (Endpoints). Create a model once and use it across multiple endpoints effortlessly.",
    dynamicEngine: "Dynamic Data Engine",
    dynamicDesc: "Powered by faker.js. Support for recursive arrays, nested objects, and a wide variety of primitive types to generate realistic data structures in real-time.",
    instantApi: "Instant API Generation",
    instantApiDesc: "No servers to provision or databases to manage. Deploy your endpoints instantly to our edge network and start fetching data in milliseconds.",
    howItWorksPart1: "How it",
    howItWorksPart2: "works",
    howItWorksDesc: "Our platform helps you manage everything seamlessly — from setup and integration to generating dynamic data. Everything you need in one powerful system.",
    startForFree: "Start for Free",
    step1: "Step 1",
    build: "Build",
    step1Desc: "Create and customize your data models using our visual schema builder. Attach faker.js generators to output realistic names, emails, UUIDs, and more.",
    step2: "Step 2",
    connect: "Connect",
    step2Desc: "Instantly map your schemas to RESTful routes. Configure path, methods, and item counts to create dynamic endpoints without touching a backend server.",
    step3: "Step 3",
    fetch: "Fetch",
    step3Desc: "Consume the API instantly in your frontend. Enjoy zero-latency live preview and unblock your UI development immediately.",
    terms: "Terms",
    privacy: "Privacy"
  },
  tr: {
    signIn: "Giriş Yap",
    getStarted: "Başlayın",
    buildDynamic: "Backend Kodu Olmadan",
    mockApis: "Dinamik Mock API'ler",
    withoutBackend: "Oluşturun",
    heroDesc: "Veri modellerinizi bir kez tanımlayın, API uç noktalarına bağlayın ve canlı önizlemelerle gerçekçi sahte (mock) veriler elde edin. Frontend geliştiricileri için en üst düzey modüler platform.",
    startGenerating: "Oluşturmaya Başla",
    viewOnGithub: "GitHub'da İncele",
    scrollToDive: "Daha fazlası için kaydırın",
    decoupledArch: "Ayrık Mimari",
    decoupledDesc: "Veri Modelleri (Şemalar) ve API Rotaları (Uç Noktalar) arasında sorumlulukların ayrılması. Bir modeli bir kez oluşturun ve birden fazla uç noktada zahmetsizce kullanın.",
    dynamicEngine: "Dinamik Veri Motoru",
    dynamicDesc: "Faker.js tarafından desteklenir. Gerçek zamanlı olarak gerçekçi veri yapıları oluşturmak için özyinelemeli dizileri, iç içe nesneleri ve çok çeşitli ilkel türleri destekler.",
    instantApi: "Anında API Üretimi",
    instantApiDesc: "Yönetilecek sunucu veya veritabanı yok. Uç noktalarınızı (endpoints) anında ağımıza dağıtın ve milisaniyeler içinde veri çekmeye başlayın.",
    howItWorksPart1: "Nasıl",
    howItWorksPart2: "çalışır?",
    howItWorksDesc: "Platformumuz kurulumdan entegrasyona ve dinamik veri oluşturmaya kadar her şeyi sorunsuz bir şekilde yönetmenize yardımcı olur. İhtiyacınız olan her şey tek bir güçlü sistemde.",
    startForFree: "Ücretsiz Başla",
    step1: "Adım 1",
    build: "Oluştur",
    step1Desc: "Görsel şema oluşturucumuzu kullanarak veri modellerinizi yaratın ve özelleştirin. Gerçekçi isimler, e-postalar, UUID'ler ve daha fazlasını üretmek için faker.js üreteçlerini ekleyin.",
    step2: "Adım 2",
    connect: "Bağla",
    step2Desc: "Şemalarınızı anında RESTful rotalarla eşleştirin. Backend sunucusuna dokunmadan dinamik uç noktalar oluşturmak için yolu, metodları ve öğe sayılarını yapılandırın.",
    step3: "Adım 3",
    fetch: "İstek At",
    step3Desc: "API'yi frontend uygulamanızda anında kullanın. Sıfır gecikmeli canlı önizlemenin keyfini çıkarın ve UI geliştirme sürecindeki engelleri hemen kaldırın.",
    terms: "Şartlar",
    privacy: "Gizlilik"
  }
};

export default function HomePage() {
  const { lang, setLang } = useLanguage();
  const t = DICTIONARY[lang];
  const [canvasKey, setCanvasKey] = useState(0);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Sayfa bfcache'ten (ileri/geri tuşlarıyla) yüklendiğinde WebGL context kurtarma için remount
        setCanvasKey(prev => prev + 1);
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <div className="relative min-h-[300vh] bg-black text-white selection:bg-[#810100]/30">
      <StormCanvas key={canvasKey} />
      
      <div className="relative z-10 pointer-events-none">
        <header className="fixed top-0 w-full border-b border-white/5 bg-black/20 backdrop-blur-md z-50 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              MockGen
            </div>
            <nav className="flex gap-4 items-center">
              <LanguageSwitch value={lang} onChange={setLang} />
              <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                {t.signIn}
              </Link>
              <Link href="/register" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition-colors shadow-sm">
                {t.getStarted}
              </Link>
            </nav>
          </div>
        </header>

        <main className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center pointer-events-auto">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1]">
            {t.buildDynamic} <span className="text-[#810100]">{t.mockApis}</span> {t.withoutBackend}
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link 
              href="/register" 
              className="flex items-center gap-2 px-8 py-4 bg-[#810100] hover:bg-[#a30100] text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(129,1,0,0.3)] hover:shadow-[0_0_30px_rgba(129,1,0,0.5)]"
            >
              {t.startGenerating}
              <ArrowRight size={18} />
            </Link>
            <Link 
              href="https://github.com/emirkzmc/MockGen" 
              target="_blank"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all backdrop-blur-sm"
            >
              <Code size={18} />
              {t.viewOnGithub}
            </Link>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-white/70">{t.scrollToDive}</span>
            <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </main>
        
        <div className="min-h-screen flex items-center max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl pointer-events-auto shadow-2xl transition-all hover:-translate-y-2 hover:border-[#810100]/50 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors">
                <Image src="/icons/database.svg" alt="Database Icon" width={28} height={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.decoupledArch}</h3>
              <p className="text-white/60 leading-relaxed">
                {t.decoupledDesc}
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl pointer-events-auto shadow-2xl transition-all hover:-translate-y-2 hover:border-[#810100]/50 group">
              <div className="w-12 h-12 rounded-xl   flex items-center justify-center mb-6 transition-colors">
                <Image src="/icons/layers.svg" alt="Layers Icon" width={28} height={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.dynamicEngine}</h3>
              <p className="text-white/60 leading-relaxed">
                {t.dynamicDesc}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl pointer-events-auto shadow-2xl transition-all hover:-translate-y-2 hover:border-[#810100]/50 group">
              <div className="w-12 h-12 rounded-xl  flex items-center justify-center mb-6 transition-colors">
                <Image src="/icons/zap.svg" alt="Zap Icon" width={28} height={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.instantApi}</h3>
              <p className="text-white/60 leading-relaxed">
                {t.instantApiDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Documentation / How it works Section */}
        <section className="relative w-full pt-32 pb-48 pointer-events-auto overflow-hidden">
          {/* Animated Background Gradient matching the theme - Solid and Strong */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#3a0000] to-black pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#810100]/40 via-transparent to-transparent pointer-events-none animate-pulse duration-1000" />
          
          <div className="relative max-w-7xl mx-auto px-6 z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-32">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
                {t.howItWorksPart1}<br />{t.howItWorksPart2}
              </h2>
              <div className="max-w-md">
                <p className="text-white/70 text-lg mb-6 leading-relaxed">
                  {t.howItWorksDesc}
                </p>
                <Link href="/register" className="inline-flex items-center justify-center px-6 py-3 bg-[#810100] hover:bg-[#a30100] text-white rounded-lg font-medium transition-colors">
                  {t.startForFree}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-24 md:gap-32">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/3">
                  <div className="text-white/60 mb-2">{t.step1}</div>
                  <h3 className="text-4xl font-bold mb-4 flex items-center gap-2">
                    {t.build} <ArrowUpRight className="text-[#810100]" size={36} />
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {t.step1Desc}
                  </p>
                </div>
                <div className="w-full md:w-2/3 h-80 rounded-[3rem] bg-black/60 border border-white/10 backdrop-blur-md overflow-hidden flex items-center justify-center relative shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#810100]/20 to-transparent pointer-events-none"></div>
                   <div className="relative z-10 bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 font-mono text-sm text-white/80 w-3/4 shadow-2xl">
                     <pre><code>{`{
  "id": "{{datatype.uuid}}",
  "name": "{{name.fullName}}",
  "email": "{{internet.email}}",
  "role": "ADMIN"
}`}</code></pre>
                   </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="w-full md:w-1/3">
                  <div className="text-white/60 mb-2">{t.step2}</div>
                  <h3 className="text-4xl font-bold mb-4 flex items-center gap-2">
                    {t.connect} <ArrowUpRight className="text-[#810100]" size={36} />
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {t.step2Desc}
                  </p>
                </div>
                <div className="w-full md:w-2/3 h-80 rounded-[3rem] bg-black/60 border border-white/10 backdrop-blur-md overflow-hidden flex items-center justify-center relative shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-tl from-[#810100]/20 to-transparent pointer-events-none"></div>
                   <div className="relative z-10 bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 font-mono text-sm text-white/80 w-3/4 shadow-2xl">
                     <pre><code>{`POST /endpoints
{
  "path": "/api/v1/users",
  "method": "GET",
  "schemaId": "sch_123",
  "count": 50
}`}</code></pre>
                   </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/3">
                  <div className="text-white/60 mb-2">{t.step3}</div>
                  <h3 className="text-4xl font-bold mb-4 flex items-center gap-2">
                    {t.fetch} <ArrowUpRight className="text-[#810100]" size={36} />
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {t.step3Desc}
                  </p>
                </div>
                <div className="w-full md:w-2/3 h-80 rounded-[3rem] bg-black/60 border border-white/10 backdrop-blur-md overflow-hidden flex items-center justify-center relative shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#810100]/20 to-transparent pointer-events-none"></div>
                   <div className="relative z-10 bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 font-mono text-sm text-[#a5d6ff] w-3/4 shadow-2xl overflow-x-auto">
                     <pre><code>{`fetch('https://mockgen.com.tr/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// returns Array(50) [ { id: "...", name: "..." } ]`}</code></pre>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="relative z-10 w-full border-t border-white/10 bg-[#020202] pt-12 pb-8 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-white">
              MockGen
            </div>
            <div className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} MockGen. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-white/50">
              <Link href="https://github.com/emirkzmc/MockGen" className="hover:text-white transition-colors">GitHub</Link>
              <Link href="/terms" className="hover:text-white transition-colors">{t.terms}</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">{t.privacy}</Link>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
