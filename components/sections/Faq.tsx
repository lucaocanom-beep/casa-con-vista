import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <Section
      id="faq"
      eyebrow={dict.faq.eyebrow}
      title={dict.faq.title}
      tone="white"
      containerClassName="max-w-3xl"
    >
      <p className="text-lg text-pietra-700 leading-relaxed mb-10">
        {dict.faq.body}
      </p>

      <Accordion items={dict.faq.items} mode="single" defaultOpen={0} />
    </Section>
  );
}
