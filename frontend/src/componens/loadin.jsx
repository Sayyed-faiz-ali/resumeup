import { motion } from "framer-motion";

export default function LoadingDots() {
  return (
    <div className="flex space-x-2 justify-center items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-3 h-3 bg-blue-600 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
