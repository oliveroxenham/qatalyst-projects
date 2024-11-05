import IconGoal1 from '@/public/icons/goal-01.svg';
import IconGoal2 from '@/public/icons/goal-02.svg';
import IconGoal3 from '@/public/icons/goal-03.svg';
import IconGoal4 from '@/public/icons/goal-04.svg';
import IconGoal5 from '@/public/icons/goal-05.svg';
// import IconGoal6 from '@/public/icons/goal-06.svg';
// import IconGoal7 from '@/public/icons/goal-07.svg';
// import IconGoal8 from '@/public/icons/goal-08.svg';
// import IconGoal9 from '@/public/icons/goal-09.svg';
// import IconGoal10 from '@/public/icons/goal-10.svg';
// import IconGoal11 from '@/public/icons/goal-11.svg';
// import IconGoal12 from '@/public/icons/goal-12.svg';
// import IconGoal13 from '@/public/icons/goal-13.svg';
// import IconGoal14 from '@/public/icons/goal-14.svg';
// import IconGoal15 from '@/public/icons/goal-15.svg';
// import IconGoal16 from '@/public/icons/goal-16.svg';
// import IconGoal17 from '@/public/icons/goal-17.svg';

function SdgSummary() {
  return (
    <div className="m-4 rounded-lg border border-neutral-200 bg-white p-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-neutral-500">
          Sustainable Development Goals
        </span>
        <div className="flex flex-row gap-1">
          <IconGoal1 />
          <IconGoal2 />
          <IconGoal3 />
          <IconGoal4 />
          <IconGoal5 />
        </div>
      </div>
    </div>
  );
}

export default SdgSummary;
