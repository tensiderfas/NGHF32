import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { FaqAccordion } from "../components/home/FaqAccordion";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { FAQ_ITEMS } from "../data/defaultData";

export function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Частые вопросы"
        description="Собрали ответы на то, что спрашивают чаще всего — о договоре, правах, выплатах и процессе работы."
      />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <FaqAccordion items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/6 bg-paper-soft py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl">
              Не нашли ответ?
            </h2>
            <p className="mt-4 text-stone">
              Напишите нам — ответим лично и поможем разобраться в вашей
              ситуации.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                to="/contact"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Написать
              </Button>
              <Button to="/apply" variant="outline" size="lg">
                Подать заявку
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
