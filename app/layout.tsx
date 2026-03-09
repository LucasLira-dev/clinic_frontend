import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConditionalLayout } from "./ConditionalLayout";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClinicFlow",
  description: "Sistema de gerenciamento para uma clínica médica, facilitando o agendamento de consultas, gerenciamento de pacientes e comunicação entre médicos e pacientes.",
  openGraph: {
    title: "ClinicFlow",
    description: "Sistema de gerenciamento para uma clínica médica, facilitando o agendamento de consultas, gerenciamento de pacientes e comunicação entre médicos e pacientes.",
    images: ["/capa.png"],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClinicFlow",
    description: "Sistema de gerenciamento para uma clínica médica, facilitando o agendamento de consultas, gerenciamento de pacientes e comunicação entre médicos e pacientes.",
    images: ["/capa.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script 
          src="https://upload-widget.cloudinary.com/latest/global/all.js" 
          strategy="beforeInteractive"
        />
        <Providers>
          <Toaster />
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
