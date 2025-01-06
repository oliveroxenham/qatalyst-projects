import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center">
      <video
        src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/globe-trim-xZC2QMW0T9HfyvTBcAqzXq9WChcEwI.mp4"
        autoPlay
        loop
        muted
        className="absolute w-auto min-w-full min-h-full max-w-none"
      ></video>
      <SignIn />
    </div>
  );
}
