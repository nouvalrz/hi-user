import Footer from "@/components/Footer";
import Features from "@/components/LandingPage/Features";
import Jumbotron from "@/components/LandingPage/Jumbotron";
import LandingPageNavbar from "@/components/LandingPage/LandingPageNavbar";
import Pricing from "@/components/LandingPage/Pricing";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <Jumbotron />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};

export default LandingPage;
