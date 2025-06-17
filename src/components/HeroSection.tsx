import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

interface HeroSectionProps {
  productData: any;
}

export function HeroSection({ productData }: HeroSectionProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Advanced GSAP animations
  useEffect(() => {
    if (!bottleRef.current) return;

    // Bottle floating animation
    const bottleTimeline = gsap.timeline({ repeat: -1 });
    bottleTimeline
      .to(bottleRef.current, {
        y: -15,
        rotation: 2,
        duration: 3,
        ease: [0.645, 0.045, 0.355, 1],
      })
      .to(bottleRef.current, {
        y: 0,
        rotation: -1,
        duration: 3,
        ease: "power2.inOut",
      })
      .to(bottleRef.current, {
        y: -8,
        rotation: 1,
        duration: 2.5,
        ease: "power2.inOut",
      });

    return () => {
      bottleTimeline.kill();
    };
  }, []);

  if (!productData) return null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-cream-50 overflow-hidden"
    >
      {/* Vertical Side Text - only in hero section, visible on all devices */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Left side text */}
        <div className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2">
          <div
            className="text-xs lg:text-sm font-light tracking-[0.1em] sm:tracking-[0.2em] text-black/70 space-y-4 sm:space-y-6 lg:space-y-8"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {t("hero.sideTextLeft").split(" ")[0].toUpperCase()}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {t("hero.sideTextLeft")
                .split(" ")
                .slice(1)
                .join(" ")
                .toUpperCase()}
            </motion.div>
          </div>
        </div>

        {/* Right side text */}
        <div className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2">
          <div
            className="text-xs lg:text-sm font-light tracking-[0.1em] sm:tracking-[0.2em] text-black/70"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {t("hero.sideTextRight").toUpperCase()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 text-center px-4 md:px-8 w-full max-w-6xl mx-auto"
        style={{ y: springY, opacity, scale }}
      >
        {/* Premium Hero Bottle */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative mb-8 md:mb-12 z-10 flex justify-center"
        >
          <div
            ref={bottleRef}
            className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] w-full flex justify-center"
          >
            <motion.img
              src={productData.images.hero}
              alt="Sibilla sparkling wine bottle"
              className="w-full h-full object-contain filter drop-shadow-2xl mt-[-4rem] md:mt-0"
              initial={{ opacity: 0, y: 100, scale: 1.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: window.innerWidth < 768 ? 1.8 : 2.2,
              }}
              transition={{
                duration: 2,
                ease: [0.215, 0.61, 0.355, 1],
                delay: 0.3,
              }}
              whileHover={window.innerWidth >= 768 ? {
                scale: 2.25,
                y: -10,
                transition: { duration: 0.3 },
              } : {}}
              whileTap={window.innerWidth < 768 ? {
                scale: 1.85,
                y: -10,
                transition: { duration: 0.3 },
              } : {}}
            />
          </div>
        </motion.div>

        {/* Hero Title - positioned at bottom like reference */}
        <motion.div
          className="absolute bottom-16 sm:bottom-24 md:bottom-32 left-0 right-0 px-4 md:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 tracking-tight">
            {t("hero.title")}
          </h1>

          {/* Hero Subtitle */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 text-base sm:text-lg md:text-xl lg:text-2xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {t("hero.subtitle")
              .split(". ")
              .map((part, index) => (
                <span key={index}>{part.replace(".", "").toUpperCase()}.</span>
              ))}
          </motion.div>
        </motion.div>

        {/* Dynamic glitter effects */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Share Button floating */}
      <motion.div
        className="fixed bottom-8 right-8 z-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-colors duration-300">
          {t("share.button").toUpperCase()}
        </button>
      </motion.div>
    </section>
  );
}