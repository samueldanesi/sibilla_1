import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export function NavigationMenu({
  isOpen,
  onClose,
  onNavigate,
}: NavigationMenuProps) {
  const { t, i18n } = useTranslation();

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  const navigationLinks = [
    { labelKey: "nav.howToEnjoy", section: "instructions" },
    { labelKey: "nav.whatIsThis", section: "description" },
    { labelKey: "nav.cocktails", section: "cocktails" },
  ];

  const languages = [
    { code: "en", label: "EN" },
    { code: "it", label: "IT" },
    { code: "ko", label: "한국어" },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/20 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 right-0 z-50 bg-cream-50 shadow-2xl"
          >
            <div className="p-4 md:px-8 lg:px-16 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-12 py-4">
                <motion.div
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="none"
                    className="text-brand-black"
                  >
                    <path d="M20 2L15 18H25L20 2Z" fill="currentColor" />
                    <circle cx="20" cy="25" r="7" fill="currentColor" />
                    <rect
                      x="18"
                      y="32"
                      width="4"
                      height="6"
                      fill="currentColor"
                    />
                    <circle
                      cx="28"
                      cy="15"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <circle
                      cx="12"
                      cy="20"
                      r="1"
                      fill="currentColor"
                      opacity="0.6"
                    />
                    <circle
                      cx="30"
                      cy="28"
                      r="0.8"
                      fill="currentColor"
                      opacity="0.7"
                    />
                  </svg>
                  <span className="text-xl font-bold tracking-wider">
                    {t("brand.name")}
                  </span>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.15 }}
                  onClick={onClose}
                  whileHover={{
                    backgroundColor: "rgb(0, 0, 0)",
                    color: "rgb(255, 255, 255)",
                    rotate: 90,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-opacity-50"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="mb-16">
                <ul className="space-y-8">
                  {navigationLinks.map((link, index) => (
                    <motion.li
                      key={link.section}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <motion.button
                        onClick={() => {
                          onNavigate(link.section);
                          onClose();
                        }}
                        whileHover={{
                          x: 10,
                          color: "rgba(0, 0, 0, 0.7)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="block text-3xl md:text-4xl lg:text-5xl font-medium hover:opacity-70 transition-opacity duration-200 text-left focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-opacity-50 rounded"
                      >
                        {t(link.labelKey)}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Language Selector */}
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h4 className="text-sm text-brand-black/60 uppercase tracking-widest font-medium">
                  {t("nav.language")}
                </h4>
                <div className="flex gap-3">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`px-6 py-3 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-opacity-50 ${
                        i18n.language === lang.code
                          ? "bg-brand-black text-brand-white border-brand-black"
                          : "bg-transparent text-brand-black border-brand-black hover:bg-brand-black hover:text-brand-white"
                      }`}
                    >
                      {lang.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Additional menu items */}
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.7 }}
                className="mt-16 pt-8 border-t border-brand-black/10"
              >
                <div className="grid md:grid-cols-2 gap-8 text-sm text-brand-black/60">
                  <div>
                    <h5 className="font-medium mb-2">
                      {t("footer.businessInquiries")}
                    </h5>
                    <p>{t("footer.email")}</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">
                      {t("footer.headquarter")}
                    </h5>
                    <p>{t("footer.location")}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating sparkles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-30"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.5, 0.1],
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
        </>
      )}
    </AnimatePresence>
  );
}
