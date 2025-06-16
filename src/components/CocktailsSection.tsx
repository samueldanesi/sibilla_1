import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { CocktailCard } from "./CocktailCard";

interface CocktailsSectionProps {
  recipesData: any[];
}

export function CocktailsSection({ recipesData }: CocktailsSectionProps) {
  const { t } = useTranslation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(
        ".cocktails-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: [0.215, 0.61, 0.355, 1] },
      );

      // Animate cocktail cards with stagger
      gsap.fromTo(
        ".cocktail-card",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: [0.215, 0.61, 0.355, 1],
          delay: 0.3,
        },
      );

      // Animate scroll hint
      gsap.fromTo(
        ".scroll-hint",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 1.5,
          ease: [0.215, 0.61, 0.355, 1],
        },
      );
    });

    return () => ctx.revert();
  }, [inView]);

  // Auto-scroll effect for carousel
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (carousel) {
          const maxScroll = carousel.scrollWidth - carousel.clientWidth;
          const currentScroll = carousel.scrollLeft;

          if (currentScroll >= maxScroll) {
            carousel.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            carousel.scrollBy({ left: 400, behavior: "smooth" });
          }
        }
      }, 5000);
    };

    const stopAutoScroll = () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };

    carousel.addEventListener("mouseenter", stopAutoScroll);
    carousel.addEventListener("mouseleave", startAutoScroll);
    carousel.addEventListener("touchstart", stopAutoScroll);

    startAutoScroll();

    return () => {
      stopAutoScroll();
      carousel.removeEventListener("mouseenter", stopAutoScroll);
      carousel.removeEventListener("mouseleave", startAutoScroll);
      carousel.removeEventListener("touchstart", stopAutoScroll);
    };
  }, [recipesData]);

  if (!recipesData || recipesData.length === 0) return null;

  return (
    <section ref={ref} id="cocktails" className="py-20">
      {/* Section Header */}
      <div className="cocktails-header mb-20 px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {t("cocktails.title")}
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-1 bg-brand-black"
        />
      </div>

      {/* Cocktail Carousel */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scroll-hide pb-8 px-4 md:px-8 lg:px-16 scroll-smooth"
        >
          {recipesData.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              className="cocktail-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CocktailCard
                title={recipe.title}
                image={recipe.image}
                description={recipe.description}
                ingredients={recipe.ingredients}
                number={String(index + 1).padStart(2, "0")}
                difficulty={recipe.difficulty}
                time={recipe.time}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="scroll-hint text-center mt-8 text-sm text-brand-black/60 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.span
            animate={{
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            ←
          </motion.span>
          <span className="mx-4">{t("cocktails.scrollHint")}</span>
          <motion.span
            animate={{
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            →
          </motion.span>
        </motion.div>

        {/* Gradient overlays for visual enhancement */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream-50 to-transparent pointer-events-none" />
      </div>

      {/* Recipe statistics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-black mb-2">
              {recipesData.length}
            </div>
            <div className="text-sm text-brand-black/60 uppercase tracking-wide">
              Cocktails
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black mb-2">
              {recipesData.filter((r) => r.difficulty === "easy").length}
            </div>
            <div className="text-sm text-brand-black/60 uppercase tracking-wide">
              {t("cocktails.difficulty.easy")}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black mb-2">
              {Math.round(
                recipesData.reduce((acc, r) => acc + r.time, 0) /
                  recipesData.length,
              )}
            </div>
            <div className="text-sm text-brand-black/60 uppercase tracking-wide">
              Avg Minutes
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black mb-2">
              {recipesData.reduce((acc, r) => acc + r.ingredients.length, 0)}
            </div>
            <div className="text-sm text-brand-black/60 uppercase tracking-wide">
              Total Ingredients
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
