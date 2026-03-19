"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

var NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Cases", href: "/cases" },
  { label: "Tools", href: "/tools" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Industries", href: "/industries" },
  { label: "Matters", href: "/matters" },
  { label: "Commentary", href: "/commentary" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteNav({ current }) {
  var [menu, setMenu] = useState(false);
  var [scrolled, setScrolled] = useState(false);

  useEffect(function () {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return function () { window.removeEventListener("scroll", handleScroll); };
  }, []);

  useEffect(function () {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return function () { document.body.style.overflow = ""; };
  }, [menu]);

  return (
    <>
      <nav className={"site-nav" + (scrolled ? " scrolled" : "")}>
        <div className="site-nav-in">
          <Link href="/" className="site-nav-logo">
            Arthur Karadzhyan
          </Link>
          <div className="site-nav-links">
            {NAV_ITEMS.map(function (item) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    "site-nav-link" +
                    (current === item.label ? " active" : "")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <button
            className="site-nav-burger"
            onClick={function () { setMenu(!menu); }}
            aria-label="Toggle navigation menu"
            aria-expanded={menu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      {menu && (
        <div className="site-nav-mobile">
          <button
            className="site-nav-mobile-close"
            onClick={function () { setMenu(false); }}
            aria-label="Close menu"
          >
            ×
          </button>
          {NAV_ITEMS.map(function (item) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="site-nav-mobile-link"
                onClick={function () { setMenu(false); }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
