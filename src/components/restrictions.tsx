import { AnimatedTitle } from "./animated-title";
import { FiSlash, FiCheck } from "react-icons/fi";
import type { TranslationKey } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n";

const RESTRICTIONS_DATA = [
  { labelKey: "restrictions.item.windowsOnly", status: "required" },
  { labelKey: "restrictions.item.noVpn", status: "blocked" },
  { labelKey: "restrictions.item.noDatacenterIsp", status: "blocked" },
  { labelKey: "restrictions.item.noBotTraffic", status: "blocked" },
  { labelKey: "restrictions.item.noEmailTraffic", status: "blocked" },
  { labelKey: "restrictions.item.noIncentTraffic", status: "blocked" },
  { labelKey: "restrictions.item.noBrandBidding", status: "blocked" },
  { labelKey: "restrictions.item.noIllegalWebsites", status: "blocked" },
] as const satisfies readonly { labelKey: TranslationKey; status: "required" | "blocked" }[];

export const Restrictions = () => {
  const { t } = useI18n();

  return (
    <section
      id="restrictions"
      className="relative w-screen overflow-hidden bg-black px-6 py-32 text-white"
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

        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />
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
        <div className="flex flex-col items-center mb-16 text-center">
          <p className="font-general text-xs uppercase tracking-[0.3em] text-red-500 mb-4 font-bold">
            {t("restrictions.kicker")}
          </p>

          <AnimatedTitle containerClass="pointer-events-none !text-white drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]">
            {t("restrictions.title")}
          </AnimatedTitle>
          <div className="mx-auto mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESTRICTIONS_DATA.map((item, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-between p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-red-500/50 transition-all duration-300"
            >
              <span className="text-lg font-medium tracking-tight text-zinc-300 group-hover:text-white transition-colors">
                {t(item.labelKey)}
              </span>
              
              <div className={`flex items-center justify-center size-10 rounded-full ${
                item.status === 'required' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-red-500/10 text-red-500'
              }`}>
                {item.status === 'required' ? <FiCheck className="text-xl" /> : <FiSlash className="text-xl" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
