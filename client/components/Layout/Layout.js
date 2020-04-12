import React from "react";

// Component
import Nav from "../Nav/Nav";
import Footer from "../Footer";
import Meta from "./Head";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
