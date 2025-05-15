import { Info } from "lucide-react";
import React, { useContext } from "react";
import Card from "./Card";
import clsx from "clsx";
import { AlertContext, AlertType } from "../contexts/AlertContext";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheckBig } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { X } from "lucide-react";

function NewAlert({ className }) {
  const { alerts, close } = useContext(AlertContext);

  return (
    <div className="fixed bottom-5 right-5 w-[400px] z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            layout
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={clsx(
                "flex flex-row gap-3 bg p-3 relative",
                className,
                {
                  "bg-green-600! text-white!": alert.type === AlertType.success,
                  "bg-red-600! text-white!": alert.type === AlertType.error,
                  "bg-white! text-gray-800!": alert.type === AlertType.info,
                }
              )}
            >
              <X
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => close(alert.id)}
              />
              {alert.type === AlertType.success && <CircleCheckBig />}
              {alert.type === AlertType.error && <TriangleAlert />}
              {alert.type === AlertType.info && <Info />}
              <div>
                <h3 className="text-sm font-medium">{alert.title}</h3>
                <p className="text-sm capitalize">{alert.message}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default NewAlert;
