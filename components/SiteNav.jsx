"use client";
import { useState } from "react";
import Link from "next/link";

var NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Tools", href: "/tools" },
  { label: "Insights", href: "/insights" },
  { label: "Industries", href: "/industries" },
  { label: "Cases", href: "/cases" },
  { label: "Matters", href: "/matters" },
  { label: "Commentary", href: "/commentary" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteNav({ current }) {
  var [menu, setMenu] = useState(false);

  return (
    <>
      <nav className="site-nav">
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
