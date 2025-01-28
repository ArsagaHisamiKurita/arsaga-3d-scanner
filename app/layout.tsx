import { Metadata } from 'next';
import { Noto_Sans_JP, Roboto } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  title: 'Arsaga 3D Scanner Experiments',
  description: 'Arsaga 3D Scanner Experiments このサイトは iPhone Application の Scaniverse を使用して、アルサーガオフィスの形状や質感をデジタルデータとして記録・再現する実験的なプロジェクトです。近年の iPhone には LiDARスキャナ というレーザー光の反射を利用して、物や地形の「距離」を読み取る機能が搭載されています。この機能により高精度の3Dスキャンが可能と言われています。',
  openGraph: {
    images: [
      {
        url: 'https://d1vreyr5jpg65u.cloudfront.net/ogp.png',
      },
    ],
  },
};

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ["latin"],
});

const robot = Roboto({
  variable: '--font-robot',
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});


const Layout =({
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