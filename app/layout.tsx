import "./globals.css";
import { Cormorant_Garamond, Lato, Poppins } from "next/font/google";
import SiteChrome from "./components/SiteChrome";
import { AuthProvider } from "./contexts/AuthContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Premo Heritage Villa",
  description: "Luxury heritage villa in Sri Lanka",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${lato.variable} ${poppins.variable} min-h-screen`}
      >
        <AuthProvider>
          <SiteChrome>{children}</SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}