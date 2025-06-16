import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface PremiumLoaderProps {
  isVisible: boolean;
}

export function PremiumLoader({ isVisible }: PremiumLoaderProps) {
  const { t } = useTranslation();

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 bg-cream-50 z-50 flex flex-col items-center justify-center"
    >
      {/* Logo with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl font-bold tracking-wider mb-8"
      >
        {t("brand.name")}
      </motion.div>

      {/* Animated bottle silhouette */}
      <div className="relative mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-16 h-24 bg-brand-black relative rounded-sm"
        >
          {/* Glitter particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-lg text-brand-black/70 mb-8"
      >
        {t("loading.text")}
      </motion.p>

      {/* Progress indicator */}
      <div className="w-48 h-1 bg-brand-black/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          className="h-full bg-brand-black rounded-full"
        />
      </div>

      {/* Floating sparkles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </motion.div>
  );
}
