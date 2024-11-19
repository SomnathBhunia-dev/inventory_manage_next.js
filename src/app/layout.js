import localFont from "next/font/local";
import "./globals.css";
import { InventoryProvider } from './context/InventoryContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Inventory Management",
  description: "Streamline your inventory management with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InventoryProvider>
        {children}
        </InventoryProvider>
      </body>
    </html>
  );
}
