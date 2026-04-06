import { motion } from "framer-motion";

const SummaryCard = ({ title, value, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="p-5 rounded-2xl text-white shadow-md"
      style={{ background: color }}
    >
      <p className="opacity-80">{title}</p>
      <h2 className="text-3xl font-semibold">₹{value}</h2>
    </motion.div>
  );
};

export default SummaryCard;