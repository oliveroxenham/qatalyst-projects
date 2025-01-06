import { clsx } from 'clsx';

export function Tag({
  children,
  type = 'verra',
  size = 'medium',
  className = '',
}: {
  children: React.ReactNode | string;
  type: string;
  size: string;
  className?: string;
}) {
  const cn = clsx({
    'text-xs': size.toUpperCase() === 'SMALL',
    'text-md': size.toUpperCase() === 'MEDIUM',
    'text-lg': size.toUpperCase() === 'LARGE',
    'bg-glacier-400 text-white': type.toUpperCase() === 'VERRA',
    'bg-glacier-500 text-white': type.toUpperCase() === 'GS',
    'bg-neutral-100 text-neutral-600': type.toUpperCase() === 'MANUAL',
  });
  return (
    <div
      className={clsx(
        'flex items-center justify-center py-1 px-2 rounded-sm h-5 gap-2',
        cn,
        className
      )}
    >
      {children}
    </div>
  );
}
