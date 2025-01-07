// import Image from 'next/image';
function Map({ project = 1 }: { project?: number }) {
  const bgUrl =
    project === 1 ? "bg-[url('/cambodia.png')]" : "bg-[url('/brazil.png')]";
  return (
    <div
      className={`h-[400px] rounded-lg border border-neutral-200 bg-white p-6 pb-20`}
    >
      <div className={`w-full h-full bg-no-repeat ${bgUrl} bg-center bg-contain`}></div>
    </div>
  );
}

export default Map;
