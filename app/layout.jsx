import './globals.css';
import BackToTop from '@/components/BackToTop';

export const metadata = {
  title: 'Arthur Karadzhyan | PAGA Defense · Employment Litigation · California',
  description: 'California employment defense attorney specializing in PAGA representative actions, wage-and-hour class actions, and workplace investigations. Interactive exposure modeling tools, penalty calculators, and defense publications.',
  metadataBase: new URL('https://www.arthurkaradzhyan.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Arthur Karadzhyan | Employment Defense Attorney | California',
    description: 'PAGA defense, wage-and-hour class actions, workplace investigations. Eight interactive analytical tools, twelve publications, twelve case law analyses.',
    type: 'website',
    url: 'https://www.arthurkaradzhyan.com',
    siteName: 'Arthur Karadzhyan — Employment Defense Attorney',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Arthur Karadzhyan | Employment Defense Attorney | California',
    description: 'PAGA defense, wage-and-hour class actions, workplace investigations. Eight interactive analytical tools and twelve publications.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth', scrollPaddingTop: '80px' }}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Attorney",
              "name": "Arthur Karadzhyan",
              "description": "California employment defense attorney specializing in PAGA representative actions, wage-and-hour class actions, and workplace investigations.",
              "url": "https://www.arthurkaradzhyan.com",
              "telephone": "(818) 421-8324",
              "email": "arthur.karadzhyan@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "areaServed": {
                "@type": "State",
                "name": "California"
              },
              "knowsAbout": [
                "PAGA Defense",
                "Wage and Hour Litigation",
                "Employment Law",
                "Class Action Defense",
                "Workplace Investigations",
                "California Labor Code",
                "PAGA Penalty Analysis",
                "Employment Defense Litigation"
              ],
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Pepperdine University School of Law"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "University of California, Berkeley"
                }
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Bar Admission",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "State Bar of California"
                }
              },
              "sameAs": [
                "https://www.linkedin.com/in/karadzhyan/"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Arthur Karadzhyan — Employment Defense Attorney",
              "url": "https://www.arthurkaradzhyan.com",
              "description": "Analytical platform for California employment defense. Interactive PAGA tools, case law analyses, industry profiles, and defense publications."
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div id="main-content">
          {children}
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
