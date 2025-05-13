import { Info } from "lucide-react";
import React, { useContext } from "react";
import Card from "./Card";
import clsx from "clsx";
import { AlertContext, AlertType } from "../contexts/AlertContext";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheckBig } from "lucide-react";
import { TriangleAlert } from "lucide-react";

function NewAlert({ className }) {
  const { show, title, message, type } = useContext(AlertContext);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-5 right-5 w-[400px] z-[100]"
        >
          <Card
            className={clsx("flex flex-row gap-3 bg p-3", className, {
              "bg-green-600! text-white!": type === AlertType.success,
              "bg-red-600! text-white!": type === AlertType.error,
              "bg-white! text-gray-800!": type === AlertType.info,
            })}
          >
            {type === AlertType.success && <CircleCheckBig />}
            {type === AlertType.error && <TriangleAlert />}
            {type === AlertType.info && <Info />}
            <div>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="text-sm capitalize">{message}</p>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NewAlert;
