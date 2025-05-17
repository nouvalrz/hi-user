import { Layers } from "lucide-react";
import React from "react";
import Button from "../Button";

const Features = () => {
  return (
    <div
      className="container mx-auto px-4 py-24 flex flex-col items-center"
      id="features"
    >
      <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
        <Layers className="size-4" />
        <p>Features</p>
      </div>

      <h2 className="text-center whitespace-pre-line text-3xl font-medium md:text-4xl leading-8 md:leading-10 lg:leading-12 text-sky-950 mt-2 w-full max-w-[600px]">
        Latest advance technologies to ensure everything you needs
      </h2>
      <p className="text-sm md:text-base w-full max-w-[500px] text-center mt-2">
        Maximize your team's productivity and security with our affordable,
        user-friendly contract management system.
      </p>
      <div className="w-full mt-16">
        <div className="bg-sky-50 p-6 md:p-8 lg:p-10 w-full rounded-lg flex md:flex-row flex-col justify-between gap-8 md:gap-18 border border-sky-100">
          <div className="flex-1">
            <h3 className="text-2xl font-medium md:text-3xl ">
              Dynamic Dashboard
            </h3>
            <p className="text-sm mt-2">
              Hi Employee helps legal teams work faster, smarter and more
              efficiently, delivering the visibility and data-driven insights to
              mitigate risk and ensure compliance.
            </p>
            <Button className="mt-8">Explore All</Button>
          </div>
          <div className="flex-1">
            <img src="./dashboard.webp" className="rounded" alt="Dashboard" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="bg-sky-50  w-full rounded-lg border border-sky-100 overflow-clip">
            <div className="p-6 md:p-8 lg:p-10  flex flex-col items-center">
              <h3 className="text-2xl font-medium md:text-3xl ">
                Activity Tracker
              </h3>
              <p className="text-sm mt-2 text-center  ">
                Hi Employee empowers legal teams to stay informed and in control
                by tracking key activities in real-time, ensuring greater
                accountability, transparency, and streamlined collaboration
                across every stage of the workflow.
              </p>
            </div>
            <img
              src="./key-selling1.webp"
              alt="Activity Tracker"
              className="w-full"
            />
          </div>
          <div className="bg-sky-50  w-full rounded-lg border border-sky-100 overflow-clip">
            <div className="p-6 md:p-8 lg:p-10  flex flex-col items-center">
              <h3 className="text-2xl font-medium md:text-3xl ">
                Biodata Management
              </h3>
              <p className="text-sm mt-2 text-center  ">
                Hi Employee simplifies the management of employee and client
                information, allowing legal teams to securely store, update, and
                access biodata with ease, improving organization and operational
                efficiency.
              </p>
            </div>
            <img
              src="./key-selling2.webp"
              alt="Biodata Management"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
