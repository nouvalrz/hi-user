import { Zap } from "lucide-react";
import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router";

const Jumbotron = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-sky-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] py-36 flex flex-col items-center px-4">
      <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
        <Zap className="size-4" />
        <p>Create for Fast</p>
      </div>
      <h1 className="text-center whitespace-pre-line text-4xl font-medium md:text-5xl leading-12 md:leading-14 lg:leading-16 text-sky-950 mt-2">
        One tool to{" "}
        <span className="underline decoration-yellow-300">manage</span> {"\n"}
        contracts and your team
      </h1>
      <p className="w-full max-w-[700px] text-center mt-6 text-sm md:text-base">
        Clause helps legal teams work faster, smarter and more efficiently,
        delivering the visibility and data-driven insights to mitigate risk and
        ensure compliance.
      </p>
      <div className="flex gap-4 mt-6">
        <Button variant="primary" onClick={() => navigate("/register")}>
          Start for Free
        </Button>
        <Button variant="secondary" className="bg-white!">
          Get a Demo
        </Button>
      </div>
    </div>
  );
};

export default Jumbotron;
