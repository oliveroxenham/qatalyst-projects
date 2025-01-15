import IconGoal1 from '@/public/icons/goal-01.svg';
import IconGoal2 from '@/public/icons/goal-02.svg';
import IconGoal3 from '@/public/icons/goal-03.svg';
import IconGoal4 from '@/public/icons/goal-04.svg';
import IconGoal5 from '@/public/icons/goal-05.svg';
import IconGoal6 from '@/public/icons/goal-06.svg';
import IconGoal7 from '@/public/icons/goal-07.svg';
import IconGoal8 from '@/public/icons/goal-08.svg';
import IconGoal9 from '@/public/icons/goal-09.svg';
import IconGoal10 from '@/public/icons/goal-10.svg';
import IconGoal11 from '@/public/icons/goal-11.svg';
import IconGoal12 from '@/public/icons/goal-12.svg';
import IconGoal13 from '@/public/icons/goal-13.svg';
import IconGoal14 from '@/public/icons/goal-14.svg';
import IconGoal15 from '@/public/icons/goal-15.svg';
import IconGoal16 from '@/public/icons/goal-16.svg';
import IconGoal17 from '@/public/icons/goal-17.svg';

const SDG_ICONS = [
  <IconGoal1  key={0}/>,
  <IconGoal2  key={1}/>,
  <IconGoal3  key={2}/>,
  <IconGoal4  key={3}/>,
  <IconGoal5  key={4}/>,
  <IconGoal6  key={5}/>,
  <IconGoal7  key={6}/>,
  <IconGoal8  key={7}/>,
  <IconGoal9  key={8}/>,
  <IconGoal10 key={9} />,
  <IconGoal11 key={10} />,
  <IconGoal12 key={11} />,
  <IconGoal13 key={12} />,
  <IconGoal14 key={13} />,
  <IconGoal15 key={14} />,
  <IconGoal16 key={15} />,
  <IconGoal17 key={16} />,
];

export function SdgSummary({ sdgs }: { sdgs?: number[] }) {
  if (sdgs?.length === 0) {
    return (
      <div className="flex flex-row gap-1">
        <div className="w-[56px] h-[56px] bg-[#e5e5e5] flex justify-center items-center rounded">
          <span className="text-neutral-400">N/A</span>
        </div>
      </div>
    );
  }
  if (sdgs && sdgs.length > 0) {
    return (
      <div className="flex flex-row gap-1">
        {sdgs.map((sdg) => SDG_ICONS[sdg - 1])}
      </div>
    );
  }
  return null;
}
