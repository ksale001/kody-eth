import React, { useEffect, useState } from "react";
import SmoothlyCaseStudy from "./pages/SmoothlyCaseStudy";
import ObolCaseStudy from "./pages/ObolCaseStudy";
import LaunchOSCaseStudy from "./pages/LaunchOSCaseStudy";
import Home from "./pages/Home";

export default function App() {
  const [hash, setHash] = useState(() => (typeof window !== "undefined" ? window.location.hash || "" : ""));

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const isSmoothlyCaseStudy = hash.startsWith("#/smoothly");
  const isObolCaseStudy = hash.startsWith("#/obol");
  const isLaunchOSCaseStudy = hash.startsWith("#/launch-os");

  if (isSmoothlyCaseStudy) {
    return <SmoothlyCaseStudy />;
  }
  if (isObolCaseStudy) {
    return <ObolCaseStudy />;
  }
  if (isLaunchOSCaseStudy) {
    return <LaunchOSCaseStudy />;
  }
  return <Home />;
}
