import { Noto_Sans_JP, Roboto } from 'next/font/google'
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ["latin"],
});

const robot = Roboto({
  variable: '--font-robot',
  weight: ["100", "300", "400", "700", "900"],
});


export const Layout =({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${notoSansJP.variable} ${robot.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

export default Layout;