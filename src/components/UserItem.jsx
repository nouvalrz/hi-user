import React from "react";
import { useNavigate } from "react-router";
import Card from "./Card";
import Button from "./Button";
import { Phone, Mail } from "lucide-react";
import { dateFormat } from "../utils/dateTimeFormat";
import { motion, AnimatePresence } from "motion/react";

function UserItem({ user }) {
  const {
    id,
    email,
    first_name,
    last_name,
    avatar,
    role,
    employment_type,
    join_date,
    phone,
  } = user;

  const navigate = useNavigate();

  return (
    <motion.div
      key={id}
      layout
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border border-gray-200 p-5 flex flex-col items-center">
        <img
          src={
            avatar ||
            `https://ui-avatars.com/api/?name=${first_name.trim()}+${last_name.trim()}`
          }
          alt="profile"
          className="w-24 h-24 object-cover rounded-full"
        />
        <h2
          className="font-medium mt-1 text-lg hover:text-sky-600 cursor-pointer hover:font-semibold"
          onClick={() => navigate(`/users/${id}`)}
        >
          {first_name} {last_name}
        </h2>
        <p className="text-xs bg-gray-100 px-3 py-1 rounded-full my-1">
          {role}
        </p>
        <div className="grid grid-cols-2 text-xs gap-y-1 gap-x-3 mt-2 ">
          <p className="font-medium">Type</p>
          <p>{employment_type}</p>
          <p className="font-medium">Join Date</p>
          <p>{dateFormat(join_date)}</p>
        </div>
        <div className="flex gap-2 mt-3">
          <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank">
            <Button variant="secondary" className="rounded-full">
              <Phone className="size-4" />
            </Button>
          </a>
          <a href={`mailto:${email}`}>
            <Button variant="secondary" className="rounded-full">
              <Mail className="size-4" />
            </Button>
          </a>
        </div>
      </Card>
    </motion.div>
  );
}

export default UserItem;
