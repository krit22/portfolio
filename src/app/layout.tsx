import type { Metadata } from "next";
import { fontSans, fontHeading, fontPixel, fontMono } from "@/lib/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import MusicPlayer from "@/components/MusicPlayer";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontPixel.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans antialiased min-h-screen selection:bg-brand-cyan selection:text-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={true}
        >
          <CustomCursor />
          {children}
          <MusicPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}

