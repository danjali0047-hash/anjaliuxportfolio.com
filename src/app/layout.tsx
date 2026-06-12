import type { Metadata } from "next";
import {
  Figtree,
  Urbanist,
  Poppins,
  Gaegu,
  Caveat,
  Fuzzy_Bubbles,
} from "next/font/google";
import "./globals.css";

const figtree = Figtree({ variable: "--ff-figtree", subsets: ["latin"] });
const urbanist = Urbanist({ variable: "--ff-urbanist", subsets: ["latin"] });
// "Figma Hand" is a proprietary Figma font; Caveat is the closest free handwriting match.
const hand = Caveat({ variable: "--ff-hand", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--ff-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const gaegu = Gaegu({
  variable: "--ff-gaegu",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const fuzzy = Fuzzy_Bubbles({
  variable: "--ff-fuzzy",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Anjali Dubey — Portfolio",
  description:
    "Portfolio of Anjali Dubey — UX & Product Designer. UX projects, case studies, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${urbanist.variable} ${hand.variable} ${poppins.variable} ${gaegu.variable} ${fuzzy.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
