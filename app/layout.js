export const metadata = {
  title: 'Business Hub',
  description: 'Earning money by training AI and digital creations'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
