import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/providers/client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "A24 | Crypto Airdrops Platform",
  description: "Discover and track the latest crypto airdrops with A24 - Your trusted platform for airdrop opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
