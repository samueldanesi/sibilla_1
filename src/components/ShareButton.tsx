import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Share2, Check, Copy, Facebook, Twitter, Linkedin } from "lucide-react";

export function ShareButton() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("share.title"),
          text: t("share.text"),
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      await handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t("share.text"))}`,
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
  ];

  const handleSocialShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400");
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-8 right-4 md:right-8 z-30">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-16 right-0 bg-cream-50 border border-brand-black/10 rounded-lg shadow-2xl p-4 min-w-[200px]"
          >
            {/* Share options */}
            <div className="space-y-2">
              {shareOptions.map((option, index) => (
                <motion.button
                  key={option.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSocialShare(option.url)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-white rounded transition-colors duration-200 ${option.color}`}
                >
                  <option.icon size={16} />
                  <span className="text-sm font-medium">{option.name}</span>
                </motion.button>
              ))}

              {/* Copy link button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-2 bg-brand-black text-brand-white rounded hover:bg-brand-black/80 transition-colors duration-200"
              >
                {showCopied ? (
                  <>
                    <Check size={16} />
                    <span className="text-sm font-medium">
                      {t("share.copied")}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span className="text-sm font-medium">
                      {t("share.copyLink")}
                    </span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main share button */}
      <motion.button
        onClick={() => {
          if (navigator.share && !isExpanded) {
            handleShare();
          } else {
            setIsExpanded(!isExpanded);
          }
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-brand-black text-brand-white px-6 py-3 transition-all duration-300 hover:bg-brand-white hover:text-brand-black border border-brand-black shadow-lg group rounded-full"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              rotate: isExpanded ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Share2
              size={18}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.div>
          <span className="text-sm font-medium tracking-wide">
            {t("share.button")}
          </span>
        </div>
      </motion.button>

      {/* Success message */}
      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-full right-0 mb-2 bg-green-500 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap"
          >
            {t("share.copied")}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
