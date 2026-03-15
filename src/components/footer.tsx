import { useI18n } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="w-screen bg-violet-300 py-4 text-violet-50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; <strong className="font-semibold">Once Human</strong>{" "}
          {new Date().getFullYear()}. {t("footer.rights")}
        </p>

        <div className="flex items-center gap-1.5">
          <a
            href="#"
            className="text-center text-sm transition hover:underline hover:opacity-75 md:text-right"
          >
            {t("footer.privacy")}
          </a>

          <b>|</b>

          <a
            href="#"
            className="text-center text-sm transition hover:underline hover:opacity-75 md:text-right"
          >
            {t("footer.terms")}
          </a>
        </div>
      </div>
    </footer>
  );
};
