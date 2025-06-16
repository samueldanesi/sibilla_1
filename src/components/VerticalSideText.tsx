import { motion } from "framer-motion";

interface VerticalSideTextProps {
  leftText: string;
  rightText: string;
  className?: string;
}

export function VerticalSideText({
  leftText,
  rightText,
  className = "",
}: VerticalSideTextProps) {
  return (
    <div className={`fixed inset-y-0 z-10 pointer-events-none ${className}`}>
      {/* Left side text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2"
      >
        <div
          className="text-xs md:text-sm font-light tracking-[0.2em] text-black/70"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {leftText}
        </div>
      </motion.div>

      {/* Right side text */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2"
      >
        <div
          className="text-xs md:text-sm font-light tracking-[0.2em] text-black/70"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {rightText}
        </div>
      </motion.div>
    </div>
  );
}
