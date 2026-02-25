import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js Body MFE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
