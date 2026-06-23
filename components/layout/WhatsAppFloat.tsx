import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function WhatsAppFloat({ locale, dict }: Props) {
  const phone = site.contact.whatsappNumber.replace(/[^\d+]/g, "");
  const text = encodeURIComponent(site.contact.whatsappPrefilled[locale]);
  const href = `https://wa.me/${phone.replace(/^\+/, "")}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.contatti.whatsappFloatAria}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-105 active:scale-100 transition-transform"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden
      >
        <path d="M19.11 17.39c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.84.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32zM16.02 6.18c-5.42 0-9.83 4.41-9.83 9.83 0 1.92.56 3.79 1.61 5.41l-1.06 3.86 3.97-1.04a9.81 9.81 0 0 0 5.31 1.55h.01c5.42 0 9.83-4.41 9.83-9.83a9.78 9.78 0 0 0-2.88-6.95 9.78 9.78 0 0 0-6.96-2.83zm0 17.91h-.01a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.07.81.82-2.99-.2-.31a8.13 8.13 0 0 1-1.25-4.35c0-4.51 3.67-8.17 8.18-8.17 2.18 0 4.23.85 5.78 2.4a8.12 8.12 0 0 1 2.39 5.78c0 4.51-3.67 8.17-8.18 8.17z" />
      </svg>
    </a>
  );
}
