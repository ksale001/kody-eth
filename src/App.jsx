import React from "react";
import SmoothlyCaseStudy from "./pages/SmoothlyCaseStudy";
import ObolCaseStudy from "./pages/ObolCaseStudy";
import Home from "./pages/Home";

export default function App() {
  const hash = typeof window !== "undefined" ? window.location.hash || "" : "";
  const isSmoothlyCaseStudy = hash.startsWith("#/smoothly");
  const isObolCaseStudy = hash.startsWith("#/obol");

  if (isSmoothlyCaseStudy) {
    return <SmoothlyCaseStudy />;
  }
  if (isObolCaseStudy) {
    return <ObolCaseStudy />;
  }
  return <Home />;
}
