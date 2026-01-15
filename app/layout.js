import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Happy Birthday!",
  description: "A beautiful birthday card",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={`${outfit.className} antialiased`}>
            {children}
        </body>
      </html>
  );
}
