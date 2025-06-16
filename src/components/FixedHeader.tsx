import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, Star } from "lucide-react";

interface FixedHeaderProps {
  onMenuToggle: () => void;
  onLogoClick: () => void;
}

export function FixedHeader({ onMenuToggle, onLogoClick }: FixedHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{
        backdropFilter: `blur(${headerBlur}px)`,
      }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-cream-50/95 shadow-lg border-b border-brand-black/10"
          : "bg-cream-50/90"
      }`}
    >
      <div className="flex items-center justify-between p-4 md:px-8 lg:px-16">
        {/* Logo */}
        <motion.button
          onClick={onLogoClick}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-12 h-12 md:w-14 md:h-14 hover:opacity-70 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-opacity-50 rounded-full flex items-center justify-center"
        >
          <motion.svg
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="w-full h-full"
          >
            {/* Elegant wine glass silhouette with sparkle */}
            <motion.path
              d="M20 2L15 18H25L20 2Z"
              fill="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.circle
              cx="20"
              cy="25"
              r="7"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            <motion.rect
              x="18"
              y="32"
              width="4"
              height="6"
              fill="currentColor"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            />
            {/* Sparkling elements */}
            <motion.circle
              cx="28"
              cy="15"
              r="1.5"
              fill="currentColor"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
            />
            <motion.circle
              cx="12"
              cy="20"
              r="1"
              fill="currentColor"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.6, 1.4, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
            />
            <motion.circle
              cx="30"
              cy="28"
              r="0.8"
              fill="currentColor"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.5, 1.3, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 1.8 }}
            />
          </motion.svg>
        </motion.button>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Star Icon with rotation animation */}
          <motion.div
            whileHover={{
              rotate: 180,
              scale: 1.1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="cursor-pointer"
          >
            <Star
              size={24}
              className="text-brand-black hover:opacity-70 transition-opacity duration-200"
            />
          </motion.div>

          {/* Menu Button */}
          <motion.button
            onClick={onMenuToggle}
            whileHover={{
              backgroundColor: "rgb(0, 0, 0)",
              color: "rgb(255, 255, 255)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-opacity-50 rounded"
            aria-label="Toggle navigation menu"
          >
            <motion.div
              animate={{
                rotate: 0,
              }}
              whileHover={{
                rotate: 90,
              }}
              transition={{ duration: 0.3 }}
            >
              <Menu size={24} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Progress bar showing scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-brand-black origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 2000], [0, 1]),
        }}
      />
    </motion.header>
  );
}
