import React from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Header />
      </div>
      <main>
        <Toaster />
        {children}
      </main>
    </div>
  );
}
