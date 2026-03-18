"use client";
import { useState, useEffect } from "react";

export default function BackToTop() {
  var [visible, setVisible] = useState(false);

  useEffect(function () {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return function () { window.removeEventListener("scroll", handleScroll); };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={"back-to-top" + (visible ? " visible" : "")}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
