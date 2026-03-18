"use client";
import { useState } from "react";
import S from "@/components/S";

export default function SiteFooter() {
  var [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <div className="site-footer">
        <div className="site-footer-copy">
          © {new Date().getFullYear()} Arthur Karadzhyan · Los Angeles,
          California
        </div>
        <div className="site-footer-legal">
          Attorney Advertising · Prior results do not guarantee a similar
          outcome · This website does not constitute legal advice ·{" "}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
            onClick={function () {
              setShowPrivacy(true);
            }}
          >
            Privacy & Terms
          </span>
        </div>
        <div className="site-footer-sub">
          No information submitted through this website is stored or shared.
          Contact information is used solely to respond to inquiries.
          Professional liability insurance status available upon request.
        </div>
      </div>

      {showPrivacy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Privacy policy"
          className="privacy-overlay"
          onClick={function () {
            setShowPrivacy(false);
          }}
        >
          <div
            className="privacy-modal"
            onClick={function (e) {
              e.stopPropagation();
            }}
          >
            <button
              onClick={function () {
                setShowPrivacy(false);
              }}
              className="privacy-close"
            >
              ×
            </button>
            <S
              fontSize={10}
              fontWeight={600}
              letterSpacing={4}
              textTransform="uppercase"
              color="#2c3e3a"
              marginBottom={8}
            >
              Privacy & Terms
            </S>
            <S fontSize={10} color="#999" marginBottom={24}>
              Last updated: March 2026
            </S>
            <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}>
              <strong>Information Collection.</strong> This website does not use
              cookies, tracking pixels, or analytics software. No personal
              information is collected automatically. If you contact the attorney
              via email or phone, the information you provide is used solely to
              respond to your inquiry and evaluate potential representation.
            </S>
            <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}>
              <strong>Interactive Tools.</strong> All calculations performed by
              the interactive tools on this site are executed entirely in your
              browser. No inputs, outputs, or tool interactions are transmitted
              to any server, stored, or logged. Your exposure models remain on
              your device.
            </S>
            <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}>
              <strong>No Legal Advice.</strong> This website provides general
              information about California employment law defense. It does not
              constitute legal advice, create an attorney-client relationship, or
              establish any duty of representation.
            </S>
            <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}>
              <strong>Attorney Advertising.</strong> This website constitutes
              attorney advertising under California Rules of Professional
              Conduct, Rule 7.1. Arthur Karadzhyan is responsible for this
              content. Prior results described on this site do not guarantee or
              predict a similar outcome in any future matter.
            </S>
            <S fontSize={13} lineHeight="2" color="#555" marginBottom={16}>
              <strong>Professional Liability Insurance.</strong> Information
              regarding professional liability insurance coverage is available
              upon request.
            </S>
            <S fontSize={13} lineHeight="2" color="#555">
              <strong>California Residents.</strong> Under the California
              Consumer Privacy Act (CCPA), California residents have the right to
              know what personal information is collected and to request its
              deletion. Because this website does not collect personal
              information automatically, these rights are implicated only if you
              voluntarily provide personal information via email or phone. To
              exercise your rights, contact arthur.karadzhyan@gmail.com.
            </S>
          </div>
        </div>
      )}
    </>
  );
}
