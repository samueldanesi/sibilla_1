import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

interface InstructionsSectionProps {
  instructionsData: any[];
}

export function InstructionsSection({
  instructionsData,
}: InstructionsSectionProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Track which instruction is in view for auto-play - better mobile triggers
  const [step1Ref, step1InView] = useInView({
    threshold: window.innerWidth < 768 ? 0.3 : 0.6,
    rootMargin: window.innerWidth < 768 ? "0px 0px -100px 0px" : "0px",
  });
  const [step2Ref, step2InView] = useInView({
    threshold: window.innerWidth < 768 ? 0.3 : 0.6,
    rootMargin: window.innerWidth < 768 ? "0px 0px -100px 0px" : "0px",
  });
  const [step3Ref, step3InView] = useInView({
    threshold: window.innerWidth < 768 ? 0.3 : 0.6,
    rootMargin: window.innerWidth < 768 ? "0px 0px -100px 0px" : "0px",
  });

  // Animation states
  const [shouldAnimateStep1, setShouldAnimateStep1] = useState(false);
  const [shouldAnimateStep2, setShouldAnimateStep2] = useState(false);
  const [shouldAnimateStep3, setShouldAnimateStep3] = useState(false);

  // Update animation states based on visibility
  useEffect(() => {
    if (step1InView) setShouldAnimateStep1(true);
  }, [step1InView]);

  useEffect(() => {
    if (step2InView) setShouldAnimateStep2(true);
  }, [step2InView]);

  useEffect(() => {
    if (step3InView) setShouldAnimateStep3(true);
  }, [step3InView]);

  // Initial section animations
  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".instruction-step",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: [0.215, 0.61, 0.355, 1],
          delay: 0.3,
        },
      );

      // Animate images with scale effect
      gsap.fromTo(
        ".instruction-image",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: [0.175, 0.885, 0.32, 1.275],
          delay: 0.6,
        },
      );
    });

    return () => ctx.revert();
  }, [inView]);

  if (!instructionsData || instructionsData.length === 0) return null;

  return (
    <section
      ref={ref}
      id="instructions"
      className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Section Header */}
      <div className="instructions-header mb-20">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-1 bg-brand-black"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mt-6"
        >
          {t("instructions.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl md:text-2xl font-light mt-4 max-w-2xl"
        >
          {t("instructions.subtitle")}
        </motion.p>
      </div>

      {/* Instructions Steps */}
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24 md:space-y-32">
        {instructionsData.map((instruction, index) => (
          <motion.div
            key={instruction.step}
            ref={
              instruction.step === 1
                ? step1Ref
                : instruction.step === 2
                  ? step2Ref
                  : instruction.step === 3
                    ? step3Ref
                    : undefined
            }
            className="instruction-step"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${
                index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
              }`}
            >
              <div
                className={`${index % 2 === 0 ? "order-1 lg:order-2" : "order-1"}`}
              >
                <motion.div
                  className="instruction-image relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden group"
                  whileHover={{
                    scale: window.innerWidth >= 768 ? 1.02 : 1,
                    y: window.innerWidth >= 768 ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.img
                    src={instruction.image}
                    alt={`Step ${instruction.step}: ${instruction.title}`}
                    className="relative z-10 w-full h-full object-contain object-center filter brightness-110 contrast-105"
                    style={{
                      mixBlendMode: "multiply",
                      filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                    }}
                    animate={
                      instruction.step === 1 && shouldAnimateStep1
                        ? {
                            rotate: [0, 45, 90, 135, 180],
                            scale:
                              window.innerWidth < 768
                                ? [1.8, 1.7, 1.6, 1.7, 1.8]
                                : [2.2, 2.1, 2.0, 2.1, 2.2],
                            y: [0, -10, -20, -10, 0],
                          }
                        : instruction.step === 2 && shouldAnimateStep2
                          ? {
                              rotate: 180,
                              scale: window.innerWidth < 768 ? 1.8 : 2.2,
                              transition: {
                                duration: 0.8,
                                ease: "easeInOut",
                              },
                            }
                          : instruction.step === 3 && shouldAnimateStep3
                            ? {
                                x: [0, -8, 8, -6, 6, -4, 4, 0],
                                y: [0, -4, 4, -3, 3, -2, 2, 0],
                                rotate: [0, -2, 2, -1.5, 1.5, -1, 1, 0],
                                scale:
                                  window.innerWidth < 768
                                    ? [1.8, 1.82, 1.78, 1.81, 1.79, 1.8]
                                    : [2.2, 2.22, 2.18, 2.21, 2.19, 2.2],
                              }
                            : { scale: window.innerWidth < 768 ? 1.8 : 2.2 }
                    }
                    transition={
                      instruction.step === 1
                        ? {
                            duration: 3,
                            repeat: Infinity,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            repeatDelay: 2,
                          }
                        : instruction.step === 2
                          ? {
                              duration: 1.2,
                              ease: [0.215, 0.61, 0.355, 1],
                            }
                          : instruction.step === 3
                            ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: [0.25, 0.1, 0.25, 1],
                                repeatDelay: 2.5,
                              }
                            : { duration: 1.2 }
                    }
                    initial={{
                      scale: 2.4,
                      rotate: 0,
                      x: 0,
                      y: 0,
                    }}
                    whileInView={{
                      scale: window.innerWidth < 768 ? 1.8 : 2.2,
                    }}
                    whileHover={
                      window.innerWidth >= 768
                        ? instruction.step === 1
                          ? {
                              rotate: [0, 180, 360],
                              transition: {
                                duration: 1.5,
                                ease: "easeInOut",
                              },
                            }
                          : instruction.step === 2
                            ? {
                                x: [-20, 20, -15, 15, -10, 10, 0],
                                y: [-10, 10, -8, 8, -5, 5, 0],
                                transition: {
                                  duration: 0.8,
                                  ease: "easeInOut",
                                },
                              }
                            : {}
                        : {}
                    }
                    whileTap={
                      window.innerWidth < 768
                        ? instruction.step === 1
                          ? {
                              rotate: [0, 180],
                              transition: {
                                duration: 0.8,
                                ease: "easeInOut",
                              },
                            }
                          : instruction.step === 2
                            ? {
                                scale: 1.85,
                                rotate: [0, 180],
                                transition: {
                                  duration: 0.8,
                                  ease: "easeInOut",
                                },
                              }
                            : instruction.step === 3
                              ? {
                                  x: [-10, 10, -8, 8, -5, 5, 0],
                                  y: [-5, 5, -4, 4, -2, 2, 0],
                                  transition: {
                                    duration: 0.4,
                                    ease: "easeInOut",
                                  },
                                }
                              : {}
                        : {}
                    }
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-brand-black/0 transition-all duration-300 group-hover:bg-brand-black/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </div>
              <div
                className={`${
                  index % 2 === 0 ? "order-2 lg:order-1" : "order-2"
                } space-y-4`}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-sm font-medium tracking-widest text-brand-black/60 uppercase"
                >
                  {t("instructions.stepPrefix")} {instruction.step}
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold"
                >
                  {instruction.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-lg sm:text-xl font-light text-brand-black/80"
                >
                  {instruction.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-32 text-center"
      >
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-light italic text-brand-black/60 max-w-2xl mx-auto"
        >
          "{t("instructions.quote")}"
        </motion.blockquote>
      </motion.div>
    </section>
  );
}