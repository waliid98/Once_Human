import { FaDiscord, FaTwitch, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { TranslationKey } from "@/lib/i18n";

export const NAV_ITEMS: readonly { labelKey: TranslationKey; href: string }[] = [
  { labelKey: "nav.trailer", href: "#hero" },
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.deviation", href: "#scenario" },
  { labelKey: "nav.qa", href: "#story" },
  { labelKey: "nav.restrictions", href: "#restrictions" },
  { labelKey: "nav.contact", href: "#contact" },
];

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/game-website",
} as const;

export const SOCIAL_LINKS = [
  {
    href: "https://discord.com",
    icon: FaDiscord,
  },
  {
    href: "https://x.com/_sanidhyy",
    icon: FaXTwitter,
  },
  {
    href: "https://youtube.com",
    icon: FaYoutube,
  },
  {
    href: "https://twitch.com",
    icon: FaTwitch,
  },
] as const;

export const VIDEO_LINKS = {
  feature1: "/videos/ved3.mp4",
  feature2: "/videos/ved5.mp4",
  feature3: "/videos/ved6.mp4",
  feature4: "/videos/ved7.mp4",
  feature5: "/videos/ved7.mp4",
  hero1: "/videos/20260119.mp4",
  hero2: "/videos/ved2.mp4",
  hero3: "/videos/ved6.mp4",
  hero4: "/videos/ved7.mp4",
} as const;
