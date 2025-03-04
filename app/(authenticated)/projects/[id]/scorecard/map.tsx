import { Project } from '@/types/project';

function Map({ projectData }: { projectData: Project }) {
  return (
    <div
      className={`h-[500px] rounded-lg border bg-background p-6`}
    >
      <div
        // @ts-expect-error - image-url is a custom property
        style={{ '--image-url': `url(${projectData?.mapUrl})` }}
        className={`flex gap-3 h-full bg-muted border justify-center items-center bg-center bg-[image:var(--image-url)]`}
      />
    </div>
  );
}

export default Map;
