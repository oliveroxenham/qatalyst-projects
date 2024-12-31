import { Separator } from '@/components/ui/separator';

export function SecondaryTopBar({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-row justify-between items-center bg-white p-2 rounded-lg">
        <p className="font-semibold">{title}</p>
        {children}
      </div>
      <Separator />
    </div>
  );
}
