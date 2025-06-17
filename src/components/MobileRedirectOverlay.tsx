import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Smartphone, X, QrCode } from "lucide-react";

interface MobileRedirectOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export function MobileRedirectOverlay({
  isVisible,
  onClose,
}: MobileRedirectOverlayProps) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
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
          className="fixed inset-0 bg-cream-50 z-50 flex flex-col items-center justify-center"
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={onClose}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgb(0, 0, 0)",
              color: "rgb(255, 255, 255)",
            }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-8 left-8 p-3 hover:bg-brand-black hover:text-brand-white transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-opacity-50"
          >
            <X size={24} />
          </motion.button>

          {/* Language Selector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-8 right-8 flex gap-2"
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
                className={`px-6 py-3 border transition-all duration-300 ${
                  i18n.language === lang.code
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
            className="max-w-md text-center space-y-8"
          >
            {/* Animated Phone Icon */}
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.8,
              }}
              className="flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="relative"
              >
                <Smartphone size={80} className="text-brand-black" />

                {/* Phone screen glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute inset-2 bg-blue-400 rounded-lg opacity-30"
                />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-4"
            >
              <h1 className="text-xl font-medium leading-relaxed">
                {t("mobileRedirect.title")}
              </h1>

              <p className="text-lg text-brand-black/70">
                {t("mobileRedirect.subtitle")}
              </p>
            </motion.div>

            {/* Enhanced QR Code */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 1.2,
              }}
              className="relative"
            >
              <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg relative overflow-hidden shadow-lg">
                {/* Real QR Code Image */}
                <img
                  src="/qr-code.png"
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />

                {/* Scanning effect */}
                <motion.div
                  animate={{
                    y: [-48, 48, -48],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute left-0 right-0 h-1 bg-green-400 opacity-70"
                />
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-brand-black" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-brand-black" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-brand-black" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-brand-black" />
            </motion.div>

            {/* Additional Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-sm text-brand-black/60"
            >
              Point your camera at the QR code to open on mobile
            </motion.p>
          </motion.div>

          {/* Floating mobile elements */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
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
