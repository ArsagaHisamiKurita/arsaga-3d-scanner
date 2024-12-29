export const Home = () => {
  return (
    <div className="relative w-full h-full">
      {/* タイル */}
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-4">
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
        <div className="bg-neutral-950"></div>
      </div>
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
      {/* コンテンツ */}
      <div className="relative p-16 text-white">
        <h1 className="font-lato font-bold text-6xl">Arsaga 3D Scanner Experiments</h1>
        <p className="mt-9 font-bold text-xl">「現実の形状をデジタルに。」</p>
        <p className="mt-7 leading-8">Arsaga 3D Scanner Experimentsは、最先端の3Dスキャニング技術を用いて、<br />現実世界の形状や質感をデジタルデータとして記録・再現する実験的なプロジェクトです。<br />このサイトでは、スキャニングプロセスから得られる可能性と美しさを探求し、<br />未来のデザインやアートの新しい表現方法を模索しています。<br />リアルとバーチャルが交差する瞬間をご体感ください。</p>
      </div>
    </div>
  );
}

export default Home;