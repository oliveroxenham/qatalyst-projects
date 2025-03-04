import { QATALYST_RESPONSE } from '@/lib/constants';

export function QatalystResponse({ response }: { response?: number }) {
  if (response === QATALYST_RESPONSE.SATISFACTORY) {
    return (
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-row gap-[2px]">
          <div className="w-1 h-3 rounded bg-branding-green-500" />
          <div className="w-1 h-3 rounded bg-branding-green-500" />
          <div className="w-1 h-3 rounded bg-branding-green-500" />
        </div>
        <span className="text-xs text-foreground">Satisfactory</span>
      </div>
    );
  } else if (response === QATALYST_RESPONSE.INVESTIGATE) {
    return (
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-row gap-[2px]">
          <div className="w-1 h-3 rounded bg-blaze-orange-300" />
          <div className="w-1 h-3 rounded bg-blaze-orange-300" />
          <div className="w-1 h-3 rounded bg-neutral-300" />
        </div>
        <span className="text-xs text-foreground">Investigate</span>
      </div>
    );
  } else if (response === QATALYST_RESPONSE.UNSATISFACTORY) {
    return (
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-row gap-[2px]">
          <div className="w-1 h-3 rounded bg-red-500" />
          <div className="w-1 h-3 rounded bg-neutral-300" />
          <div className="w-1 h-3 rounded bg-neutral-300" />
        </div>
        <span className="text-xs text-foreground">Unsatisfactory</span>
      </div>
    );
  } else {
    return null;
  }
}
