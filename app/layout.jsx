import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./store/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Invento",
  description: "expand your business margin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
