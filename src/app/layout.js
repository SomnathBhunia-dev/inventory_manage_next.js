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
        {/* Navigation */}
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white shadow-lg ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center md:justify-between items-center h-16">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">InventoryPro</span>
              </div>
            </div>
          </div>
        </nav>
        <InventoryProvider>
          {children}
        </InventoryProvider>
      </body>
    </html>
  );
}
