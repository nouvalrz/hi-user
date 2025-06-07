import React from "react";
import { Link, useLocation } from "react-router";
import Button from "./Button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const routeMap = segments.map((segment, index) => {
    if (/^\d+$/.test(segment)) {
      return {
        name: `Detail #${segment}`,
        route: "/" + segments.slice(0, index + 1).join("/"),
      };
    }
    return {
      name: segment,
      route: "/" + segments.slice(0, index + 1).join("/"),
    };
  });

  return (
    <div className="flex gap-2 text-sm capitalize items-center dark:text-gray-400!">
      <Button
        variant="secondary"
        className="rounded-full px-2! py-1! mr-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="size-4" />
      </Button>
      {routeMap.map((item, index) => {
        if (index === routeMap.length - 1) {
          return <p key={index}>{item.name}</p>;
        }

        return (
          <div className="flex gap-2" key={index}>
            <Link
              replace
              to={item.route}
              key={index}
              className=" text-sky-600 dark:text-sky-500 hover:underline"
            >
              {item.name}
            </Link>
            <p>/</p>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
