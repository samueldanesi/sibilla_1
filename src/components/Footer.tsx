import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Star, Instagram, Facebook, Mail, MapPin, ArrowUp } from "lucide-react";

interface FooterProps {
  onScrollToTop: () => void;
}

export function Footer({ onScrollToTop }: FooterProps) {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.footer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-cream-100 py-20 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black/5 to-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-black rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
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
      </div>

      <div className="relative px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Header with Logo and Star */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-4xl md:text-5xl font-bold tracking-wider cursor-pointer"
          >
            SIBILLA
          </motion.div>

          <motion.div
            whileHover={{
              rotate: 180,
              scale: 1.2,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="cursor-pointer"
          >
            <Star size={40} className="text-brand-black" />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Brand Tagline */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-2xl md:text-3xl font-light mb-6 leading-relaxed"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {t("footer.tagline")}
            </motion.h3>

            <motion.p
              className="text-lg text-brand-black/70 leading-relaxed font-light"
              whileInView={{ opacity: 0.8, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t("footer.description")}
            </motion.p>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="lg:text-right">
            <div className="mb-8">
              <motion.h4
                className="text-sm uppercase tracking-widest text-brand-black/60 mb-6 font-medium"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t("footer.socials")}
              </motion.h4>

              <div className="flex lg:justify-end gap-8">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-3 text-lg hover:opacity-70 transition-opacity duration-200 font-light group"
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Instagram
                      size={24}
                      className="group-hover:text-pink-500 transition-colors duration-200"
                    />
                  </motion.div>
                  {t("footer.instagram")}
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-3 text-lg hover:opacity-70 transition-opacity duration-200 font-light group"
                >
                  <motion.div
                    whileHover={{ rotate: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Facebook
                      size={24}
                      className="group-hover:text-blue-500 transition-colors duration-200"
                    />
                  </motion.div>
                  {t("footer.facebook")}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 py-16 border-t border-brand-black/20"
        >
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 text-sm text-brand-black/70 font-light group"
          >
            <Mail
              size={16}
              className="group-hover:text-brand-black transition-colors duration-200"
            />
            <div>
              <strong className="font-medium text-brand-black">
                {t("footer.businessInquiries")}
              </strong>{" "}
              <a
                href="mailto:info@sibilladrinks.com"
                className="hover:text-brand-black transition-colors duration-200"
              >
                {t("footer.email")}
              </a>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 text-sm text-brand-black/70 font-light group"
          >
            <MapPin
              size={16}
              className="group-hover:text-brand-black transition-colors duration-200"
            />
            <div>
              <strong className="font-medium text-brand-black">
                {t("footer.headquarter")}
              </strong>{" "}
              {t("footer.location")}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-brand-black/20"
        >
          <motion.div
            className="text-sm text-brand-black/60 mb-4 md:mb-0 font-light"
            whileInView={{ opacity: 0.6, y: 0 }}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("footer.copyright")}
          </motion.div>

          <motion.button
            onClick={onScrollToTop}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgb(0, 0, 0)",
              color: "rgb(255, 255, 255)",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 bg-transparent border border-brand-black text-brand-black px-8 py-3 transition-all duration-300 text-sm font-medium tracking-wide rounded focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-opacity-50"
          >
            <ArrowUp size={16} />
            {t("footer.backToTop")}
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
}
