import './globals.css';

export const metadata = {
  title: 'Arthur Karadzhyan | PAGA Defense · Employment Litigation · California',
  description: 'California employment defense attorney specializing in PAGA representative actions, wage-and-hour class actions, and workplace investigations. Interactive exposure modeling tools, penalty calculators, and defense publications.',
  openGraph: {
    title: 'Arthur Karadzhyan | Employment Defense Attorney | California',
    description: 'PAGA defense, wage-and-hour class actions, workplace investigations. Eight interactive analytical tools, twelve publications, twelve case law analyses.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth', scrollPaddingTop: '80px' }}>
      <head>
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
              "url": "https://arthurkaradzhyan.com",
              "telephone": "(818) 421-8324",
              "email": "arthur.karadzhyan@gmail.com",
              "address": { "@type": "PostalAddress", "addressLocality": "Los Angeles", "addressRegion": "CA", "addressCountry": "US" },
              "areaServed": "California",
              "knowsAbout": ["PAGA Defense", "Wage and Hour Litigation", "Employment Law", "Class Action Defense", "Workplace Investigations"],
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        {children}
      </body>
    </html>
  );
}
