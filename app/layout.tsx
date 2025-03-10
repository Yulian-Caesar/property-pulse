import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Property Pulse",
	keywords: "rental, property, real estate",
	description: "Find the perfect rental property",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
