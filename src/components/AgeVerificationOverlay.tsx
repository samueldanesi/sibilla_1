import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface AgeVerificationOverlayProps {
  isVisible: boolean;
  onVerify: (isOfAge: boolean) => void;
}

export function AgeVerificationOverlay({
  isVisible,
  onVerify,
}: AgeVerificationOverlayProps) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-cream-50 z-50 flex flex-col items-center justify-center px-4"
        >
          {/* Logo - Hidden on mobile, visible on tablet+ */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 left-8 hidden md:block"
          >
            <div className="text-4xl font-bold tracking-wider">SIBILLA</div>
          </motion.div>

          {/* Language Selector - Repositioned for mobile */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-1 md:gap-2"
          >
            {[
              { code: "en", label: "EN" },
              { code: "it", label: "IT" },
              { code: "ko", label: "한국어" },
            ].map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`px-3 py-2 md:px-6 md:py-3 border transition-all duration-300 text-sm md:text-base ${
                  selectedLanguage === lang.code
                    ? "bg-brand-black text-brand-white border-brand-black"
                    : "bg-transparent text-brand-black border-brand-black hover:bg-brand-black hover:text-brand-white"
                }`}
              >
                {lang.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-md text-center space-y-6 md:space-y-8 mt-16 md:mt-0"
          >
            {/* Mobile Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="block md:hidden mb-8"
            >
              <div className="text-3xl font-bold tracking-wider">SIBILLA</div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-2xl font-medium leading-relaxed"
            >
              {t("ageVerification.question")}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-4"
            >
              <motion.button
                onClick={() => onVerify(true)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full bg-brand-black text-brand-white px-8 py-4 text-lg border border-brand-black transition-all duration-300 hover:bg-brand-white hover:text-brand-black"
              >
                {t("ageVerification.yes")}
              </motion.button>

              <motion.button
                onClick={() => onVerify(false)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full bg-transparent text-brand-black px-8 py-4 text-lg border border-brand-black transition-all duration-300 hover:bg-brand-black hover:text-brand-white"
              >
                {t("ageVerification.no")}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating sparkles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-40"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
