import React from "react";

const Pricing = () => {
  return (
    <div className="container mx-auto px-4" id="pricing">
      <div className="bg-sky-600 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] px-6 md:px-8 lg:px-10 rounded-lg py-12 mb-12">
        <h3 className="text-2xl font-medium md:text-3xl text-center text-white">
          Pricing
        </h3>
        <p className="text-center text-white mt-2">Here are our packages</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1000px] mx-auto mt-12">
          <div className="rounded-lg bg-white p-5 flex flex-col items-center hover:scale-105 transition">
            <h3 className="font-medium text-xl">Basic Plan – $29/month</h3>
            <p className="text-sm mt-2">
              Perfect for individuals or small teams just getting started.
            </p>
            <ul className="list-disc list-inside text-sm mt-6">
              <li>Core biodata management</li>
              <li>Up to 500 entries</li>
              <li>Single user access</li>
              <li>Standard email support</li>
              <li>Weekly backups</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-5 flex flex-col items-center hover:scale-105 transition">
            <h3 className="font-medium text-xl">Pro Plan – $79/month</h3>
            <p className="text-sm mt-2">
              Ideal for growing teams that need collaboration features.
            </p>
            <ul className="list-disc list-inside text-sm mt-6">
              <li>Everything in Basic</li>
              <li>Up to 5,000 entries</li>
              <li>Up to 5 user accounts</li>
              <li>Real-time team collaboration</li>
              <li>Priority email support</li>
              <li>Daily backups</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-5 flex flex-col items-center hover:scale-105 transition">
            <h3 className="font-medium text-xl text-center">
              Enterprise Plan – $199/month
            </h3>
            <p className="text-sm mt-2">
              Designed for large teams with advanced security and customization
              needs.
            </p>
            <ul className="list-disc list-inside text-sm mt-6">
              <li>Everything in Pro</li>
              <li>Unlimited entries</li>
              <li>Unlimited users</li>
              <li>Custom role & permission settings</li>
              <li>Audit logs and advanced analytics</li>
              <li>Dedicated account manager</li>
              <li>24/7 support and SLA guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
