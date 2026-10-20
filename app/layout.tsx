
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className=" h-full"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
