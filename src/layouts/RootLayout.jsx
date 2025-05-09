import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full p-2 lg:p-4 my-15">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
