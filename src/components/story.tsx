import { useState } from "react";
import { AnimatedTitle } from "./animated-title";
import { FiPlus } from "react-icons/fi"; // Remplacement par un Plus pour un look plus moderne
import { useI18n } from "@/lib/i18n";

const FAQ_DATA = [
  { qKey: "story.faq.q1", aKey: "story.faq.a1" },
  { qKey: "story.faq.q2", aKey: "story.faq.a2" },
  { qKey: "story.faq.q3", aKey: "story.faq.a3" },
  { qKey: "story.faq.q4", aKey: "story.faq.a4" },
] as const;

export const Story = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="story"
      className="relative min-h-dvh w-screen overflow-hidden bg-black px-6 py-32 text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url(/img/p1_086_en_横_滑翔场景展示02_0s_陈晓尧_AIGC绘画_1200x628.webp)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />

        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 flex size-full flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-24 text-center">
          <p className="font-general text-xs uppercase tracking-[0.5em] text-violet-400 mb-4">
            {t("story.kicker")}
          </p>
          <AnimatedTitle containerClass="mt-5 pointer-events-none !text-white drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]">
            {t("story.title")}
          </AnimatedTitle>
          <div className="mx-auto mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />
        </div>

        {/* FAQ Accordion Container */}
        <div className="w-full max-w-4xl space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isOpen 
                    ? 'border-white/20 bg-white/[0.05] backdrop-blur-md' 
                    : 'border-white/5 bg-transparent hover:border-white/10'
                }`}
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-6">
                    <span className={`font-mono text-sm transition-colors duration-500 ${isOpen ? 'text-violet-400' : 'text-zinc-600'}`}>
                      0{index + 1}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-robert-medium transition-colors duration-500 ${
                      isOpen ? 'text-white drop-shadow-[0_0_14px_rgba(236,72,153,0.45)]' : 'text-white/85 drop-shadow-[0_0_10px_rgba(236,72,153,0.25)]'
                    }`}>
                      {t(item.qKey)}
                    </h3>
                  </div>

                  <div className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ${
                    isOpen ? 'rotate-[135deg] border-violet-500 bg-violet-500 text-white' : 'border-zinc-700 text-zinc-500'
                  }`}>
                    <FiPlus className="text-xl" />
                  </div>
                </button>

                {/* Smooth Height Animation */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-16 pb-8 md:pb-10">
                      <p className="font-circular-web text-lg text-zinc-400 leading-relaxed max-w-2xl">
                        {t(item.aKey)}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

        {/* Footer Action - Espace vide pour tes futurs boutons */}
        <div className="mt-20 h-20 w-full" />
      </div>
    </section>
  );
};
