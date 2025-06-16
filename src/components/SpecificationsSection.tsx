import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface SpecificationsSectionProps {
  specifications: {
    volume: number;
    format: number;
    serving: string;
  };
}

export function SpecificationsSection({
  specifications,
}: SpecificationsSectionProps) {
  const { t } = useTranslation();

  const specs = [
    {
      label: "Volume [%]",
      value: specifications.volume.toString(),
    },
    {
      label: "Format [cl]",
      value: specifications.format.toString(),
    },
    {
      label: "Serving [°C]",
      value: specifications.serving,
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-4xl mx-auto">
        {specs.map((spec, index) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="border-b border-gray-200 py-8 md:py-12"
          >
            <div className="flex justify-between items-center">
              <motion.h3
                className="text-lg md:text-xl font-light text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                viewport={{ once: true }}
              >
                {spec.label}
              </motion.h3>
              <motion.div
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-black"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
              >
                {spec.value}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
