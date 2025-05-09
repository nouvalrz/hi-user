import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Outlet } from "react-router";

function RootLayout({ chidlren }) {
  const { theme } = useContext(ThemeContext);

  return <div className={theme}>{chidlren || <Outlet />}</div>;
}

export default RootLayout;
