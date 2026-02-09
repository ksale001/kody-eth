import React from "react";
import SmoothlyCaseStudy from "./pages/SmoothlyCaseStudy";
import ObolCaseStudy from "./pages/ObolCaseStudy";
import Home from "./pages/Home";

export default function App() {
  const isSmoothlyCaseStudy = typeof window !== "undefined" && window.location.pathname.startsWith("/smoothly");
  const isObolCaseStudy = typeof window !== "undefined" && window.location.pathname.startsWith("/obol");

  if (isSmoothlyCaseStudy) {
    return <SmoothlyCaseStudy />;
  }
  if (isObolCaseStudy) {
    return <ObolCaseStudy />;
  }
  return <Home />;
}
