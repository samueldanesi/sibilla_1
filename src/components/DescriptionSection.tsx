import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

interface DescriptionSectionProps {
  productData: any;
}

export function DescriptionSection({ productData }: DescriptionSectionProps) {
  const { t } = useTranslation();
  const numbersRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView || !numbersRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(
        ".description-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: [0.215, 0.61, 0.355, 1] },
      );

      // Animate main description text with typewriter effect
      gsap.fromTo(
        ".description-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: [0.215, 0.61, 0.355, 1],
        },
      );

      // Animate specification numbers with counting effect
      const numbers = numbersRef.current?.querySelectorAll(".spec-number");
      numbers?.forEach((number, index) => {
        const finalValue = parseInt(number.textContent || "0");
        gsap.fromTo(
          number,
          { textContent: 0 },
          {
            textContent: finalValue,
            duration: 2,
            delay: 0.6 + index * 0.2,
            ease: [0.23, 1, 0.32, 1],
            snap: { textContent: 1 },
            onUpdate: function () {
              if (number.textContent) {
                number.textContent = Math.ceil(
                  parseFloat(number.textContent),
                ).toString();
              }
            },
          },
        );
      });

      // Animate specification labels
      gsap.fromTo(
        ".spec-label",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.8,
          ease: [0.215, 0.61, 0.355, 1],
        },
      );
    });

    return () => ctx.revert();
  }, [inView, productData]);

  if (!productData) return null;

  return (
    <section ref={ref} id="description" className="py-20 px-4 md:px-8 lg:px-16">
      {/* Section Header */}
      <div className="description-header mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {t("description.title")}
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-1 bg-brand-black"
        />
      </div>

      {/* Main Description */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.p
          className="description-text text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-brand-black"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {productData.description || t("description.mainText")}
        </motion.p>
      </div>

      {/* Product Specifications with animated counters */}
      <div ref={numbersRef} className="max-w-4xl mx-auto mb-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Volume */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-left group"
          >
            <div className="spec-label text-sm text-brand-black/60 uppercase tracking-widest mb-4 transition-colors duration-300 group-hover:text-brand-black">
              {t("description.specs.volume")}
            </div>
            <div className="spec-number text-5xl md:text-6xl font-bold transition-transform duration-300 group-hover:scale-105">
              {productData.specifications?.volume || 10}
            </div>
          </motion.div>

          {/* Format */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left group"
          >
            <div className="spec-label text-sm text-brand-black/60 uppercase tracking-widest mb-4 transition-colors duration-300 group-hover:text-brand-black">
              {t("description.specs.format")}
            </div>
            <div className="spec-number text-5xl md:text-6xl font-bold transition-transform duration-300 group-hover:scale-105">
              {productData.specifications?.format || 75}
            </div>
          </motion.div>

          {/* Serving Temperature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left group"
          >
            <div className="spec-label text-sm text-brand-black/60 uppercase tracking-widest mb-4 transition-colors duration-300 group-hover:text-brand-black">
              {t("description.specs.serving")}
            </div>
            <div className="text-5xl md:text-6xl font-bold transition-transform duration-300 group-hover:scale-105">
              {productData.specifications?.serving || "6-8"}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional premium content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-r from-cream-100 to-cream-50 p-8 md:p-12 rounded-2xl border border-brand-black/5 hover:border-brand-black/10 transition-all duration-500 hover:shadow-xl">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold mb-6"
          >
            {t("description.perfectExperience.title")}
          </motion.h3>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-brand-black/80 font-light"
            >
              {t("description.perfectExperience.paragraph1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-brand-black/80 font-light"
            >
              {t("description.perfectExperience.paragraph2")}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
