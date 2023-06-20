import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Footer from "./footer";
import Breadcrumbs from "./components/Breadcrumbs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buns and Burgers",
  description: "Unleash your cravings",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Breadcrumbs />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
