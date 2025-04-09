import { Canvas } from "./canvas";
import { Tile } from "./tile";

const Home = () => {
  return (
    <div className="relative w-full h-full">
      {/* タイル */}
      <Tile />
      {/* 外枠線 */}
      <span className="absolute top-0 left-0 w-full h-1 bg-main opacity-80"></span>
      <span className="absolute top-0 right-0 w-1 h-full bg-main opacity-80"></span>
      <span className="absolute bottom-0 left-0 w-full h-1 bg-main opacity-80"></span>
      <span className="absolute bottom-0 left-0 w-1 h-full bg-main opacity-80"></span>
      {/* 内枠線 */}
      <span className="absolute top-0 left-[calc(100%_/_5)] w-[1px] h-full bg-main opacity-30"></span>
      <span className="absolute top-0 left-[calc(100%_/_5_*_2)] w-[1px] h-full bg-main opacity-30"></span>
      <span className="absolute top-0 left-[calc(100%_/_5_*_3)] w-[1px] h-full bg-main opacity-30"></span>
      <span className="absolute top-0 left-[calc(100%_/_5_*_4)] w-[1px] h-full bg-main opacity-30"></span>
      <span className="absolute top-[calc(100%_/_4)] left-0 w-full h-[1px] bg-main opacity-30"></span>
      <span className="absolute top-[calc(100%_/_4_*_2)] left-0 w-full h-[1px] bg-main opacity-30"></span>
      <span className="absolute top-[calc(100%_/_4_*_3)] left-0 w-full h-[1px] bg-main opacity-30"></span>
      {/* キャンバス */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <Canvas />
      </div>
      {/* コンテンツ */}
      <div className="relative md:p-16 p-8 text-white">
        <h1 className="font-lato font-bold md:text-6xl text-2xl">Arsaga 3D Scanner Experiments</h1>
        <p className="mt-9 font-bold md:text-xl text-base">Used with iPhone Application Scaniverse</p>
        <p className="mt-7 md:text-[1rem] text-xs leading-8">
        ※このサイトは、アルサーガが開催した「年末年始開発コンテスト2025」において、社員が自主的に設計・開発したものです。<br />
        「年末年始開発コンテスト2025」の詳細はこちら<br />
        <a href="https://www.arsaga.jp/news/blog-year-end-new-year-dev-contest-2025/" target="_blank" rel="noreferrer noopener" className="text-blue-500 underline">https://www.arsaga.jp/news/blog-year-end-new-year-dev-contest-2025/</a><br />
          このサイトは iPhone Application の <a href="https://apps.apple.com/jp/app/scaniverse-3d-scanner/id1541433223" target="_blank" rel="noreferrer noopener" className="text-blue-500 underline">Scaniverse</a> を使用して、<br />
          アルサーガオフィスの形状や質感をデジタルデータとして記録・再現する実験的なプロジェクトです。<br />
          近年の iPhone には LiDARスキャナ というレーザー光の反射を利用して、<br/>
          物や地形の「距離」を読み取る機能が搭載されています。<br/>
          </p>
        <div className="mt-6">
          <p className="md:text-base text-xs leading-8">以下のリンクからデモをご覧いただけます。</p>
          <ul className="mt-4">
            <li><a href="https://www.arsaga.jp/wp-content/newyear-dev-2025/demo01" className="text-blue-500 font-bold">・アルサーガラウンジ(全体)</a></li>
            <li className="mt-2"><a href="https://www.arsaga.jp/wp-content/newyear-dev-2025/demo02" className="text-blue-500 font-bold">・アルサーガラウンジ(一部)</a></li>
            <li className="mt-2"><a href="https://www.arsaga.jp/wp-content/newyear-dev-2025/demo03" className="text-blue-500 font-bold">・アルサーガラウンジ(一部)</a></li>
            <li className="mt-2"><a href="https://www.arsaga.jp/wp-content/newyear-dev-2025/demo04" className="text-blue-500 font-bold">・アルサーガラウンジ(一部)</a></li>
            <li className="mt-2"><a href="https://www.arsaga.jp/wp-content/newyear-dev-2025/demo05" className="text-blue-500 font-bold">・アルサーガラウンジ(回遊)</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;