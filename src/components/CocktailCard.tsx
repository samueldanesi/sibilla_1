import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Clock, Star, ChefHat } from "lucide-react";

interface Ingredient {
  name: string;
  amount: string;
}

interface CocktailCardProps {
  title: string;
  image: string;
  description: string;
  ingredients: Ingredient[];
  number: string;
  difficulty?: "easy" | "medium" | "hard";
  time?: number;
}

export function CocktailCard({
  title,
  image,
  description,
  ingredients,
  number,
  difficulty = "easy",
  time = 5,
}: CocktailCardProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const difficultyColors = {
    easy: "text-green-600",
    medium: "text-yellow-600",
    hard: "text-red-600",
  };

  return (
    <motion.div
      layout
      className="flex-shrink-0 w-80 md:w-96 bg-cream-100 overflow-hidden group cursor-pointer"
      whileHover={{
        y: -8,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Card Header with title and number */}
      <div className="p-8 pb-6">
        <div className="flex items-start justify-between">
          <motion.h3
            layout
            className="text-3xl md:text-4xl font-bold leading-tight"
          >
            {title}
          </motion.h3>
          <motion.span
            initial={{ opacity: 0.1, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            className="text-7xl font-thin text-brand-black leading-none"
          >
            {number}
          </motion.span>
        </div>

        {/* Difficulty and time indicators */}
        <div className="flex items-center gap-4 mt-4">
          <div
            className={`flex items-center gap-1 text-xs ${difficultyColors[difficulty]}`}
          >
            <ChefHat size={14} />
            <span className="uppercase tracking-wide font-medium">
              {t(`cocktails.difficulty.${difficulty}`)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-brand-black/60">
            <Clock size={14} />
            <span>{t("cocktails.time", { time })}</span>
          </div>
        </div>
      </div>

      {/* Image with loading state */}
      <div className="relative h-72 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-brand-black/5 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brand-black/20 border-t-brand-black rounded-full animate-spin" />
          </div>
        )}

        <motion.img
          src={image}
          alt={`${title} cocktail`}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 via-transparent to-transparent" />

        {/* Hover overlay with sparkle effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Floating sparkles on hover */}
        <AnimatePresence>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-70"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                repeat: Infinity,
                delay: Math.random() * 1,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Card Content */}
      <motion.div layout className="p-8">
        <motion.p
          layout
          className="text-sm leading-relaxed text-brand-black/80 mb-8 font-light"
        >
          {description}
        </motion.p>

        {/* Ingredients List */}
        <motion.div layout className="mb-8">
          <motion.h4
            layout
            className="text-xs uppercase tracking-widest text-brand-black/60 mb-6 font-medium"
          >
            {t("cocktails.ingredients")}
          </motion.h4>

          <AnimatePresence>
            <motion.ul layout className="space-y-3">
              {ingredients
                .slice(0, isExpanded ? ingredients.length : 3)
                .map((ingredient, index) => (
                  <motion.li
                    key={index}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="font-light">{ingredient.name}</span>
                    <span className="text-brand-black/60 font-light">
                      {ingredient.amount}
                    </span>
                  </motion.li>
                ))}
            </motion.ul>
          </AnimatePresence>

          {ingredients.length > 3 && (
            <motion.button
              layout
              className="text-xs text-brand-black/60 mt-4 hover:text-brand-black transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded
                ? "Show less"
                : `Show ${ingredients.length - 3} more ingredients`}
            </motion.button>
          )}
        </motion.div>

        {/* Action Button */}
        <motion.button
          layout
          whileHover={{
            scale: 1.02,
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full bg-transparent border border-brand-black text-brand-black py-3 px-6 transition-all duration-300 hover:bg-brand-black hover:text-brand-white text-sm font-medium tracking-wide group"
        >
          <span className="flex items-center justify-center gap-2">
            <Star
              size={16}
              className="group-hover:fill-current transition-all duration-300"
            />
            {t("cocktails.tryRecipe")}
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
