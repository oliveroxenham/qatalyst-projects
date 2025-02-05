import { QatalystResponse } from './qatalyst-response';
import Logo from '@/public/icons/logo.svg';

export function QatalystResponseBoxed({ response }: { response?: number }) {
  return (
    <div className="border rounded-sm px-2 flex flex-row justify-between bg-white h-[36px] items-center">
      <QatalystResponse response={response} />
      <div className="rounded-full bg-blaze-orange-500 flex items-center justify-center w-[17px] h-[17px] ml-2">
        <Logo className="w-[10px] h-[10px]" />
      </div>
    </div>
  );
}
