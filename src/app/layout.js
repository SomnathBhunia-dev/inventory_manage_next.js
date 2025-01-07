import localFont from "next/font/local";
import "./globals.css";
import { InventoryProvider } from './context/InventoryContext';
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 to-purple-50`}
      >
        {/* Navigation */}
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white shadow-lg ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center md:justify-between items-center h-16">
              <Link href='/'>
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold text-blue-600">InventoryPro</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
        <InventoryProvider>
          {children}
        </InventoryProvider>
        {/* Footer */}
        <footer className="bg-gray-900">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/SomnathBhunia-dev" target="blank" className="text-gray-400 hover:text-gray-300" aria-label="Facebook">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/somnath-bhunia-web-developer/" target="blank" className="text-gray-400 hover:text-gray-300" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
            </div>
            <div className="mt-8 text-center">
              <p className="text-base text-gray-400">2024 &copy; Somnath. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
