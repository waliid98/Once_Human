import { useI18n } from "@/lib/i18n";

interface ImageClipBoxProps {
  src: string;
  alt: string;
  clipClass?: string;
}

const ImageClipBox = ({ src, alt, clipClass }: ImageClipBoxProps) => (
  <div className={clipClass}>
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  </div>
);

export const Contact = () => {
  const { t } = useI18n();

  return (
    <section id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute top-0 -left-20 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/img-1_759a48d4.webp"
            alt={t("alt.contactBg1")}
            clipClass="contact-clip-path-1"
          />

          <ImageClipBox
            src="/img/img-2.webp"
            alt={t("alt.contactBg2")}
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:right-10 md:left-auto lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/img-2.webp"
            alt={t("alt.swordmanPartial")}
            clipClass="absolute md:scale-125"
          />

          <ImageClipBox
            src="/img/111.webp"
            alt={t("alt.swordman")}
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="font-general text-[10px] uppercase">{t("contact.kicker")}</p>

          <p
            className="special-font font-zentry mt-10 w-full text-5xl leading-[0.9] md:text-[6rem]"
            dangerouslySetInnerHTML={{ __html: t("contact.title") }}
          />
        </div>
      </div>
    </section>
  );
};
