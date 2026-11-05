
import "./globals.css";

export const metadata = {
  title: {
    default: "SmartDev | Web & 3D Solutions",
    template: "%s | SmartDev",
  },
  description:
    "SmartDev provides modern web development, business software solutions and interactive 3D experiences for businesses.",
  keywords: [
    "SmartDev",
    "Web Development Sri Lanka",
    "Business Websites",
    "POS Systems",
    "Three.js",
    "3D Web Development",
  ],
  applicationName: "SmartDev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
