'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/qbutton';
import { importProject } from '@/server/actions';
import { Progress } from '@/components/ui/progress';
const NATURE_BASED = 0,
  COOKSTOVE = 1,
  OTHER = 2,
  MANUAL = 3,
  VERRA = 4,
  GS = 5;

function BoxSelection({
  children,
  selected,
  disabled,
  onClickHandle,
}: {
  children?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClickHandle?: () => void;
}) {
  if (disabled) {
    return (
      <div
        className="w-[230px] h-[140px] bg-neutral-200 flex flex-col gap-2 items-center p-2 border border-neutral-300 rounded-sm hover:cursor-not-allowed opacity-60"
        onClick={() => {}}
      >
        <div className="absolute -mr-44 p-[2px] flex items-center justify-center bg-branding-green-600 rounded-full opacity-0">
          <Check className="w-4 h-4" />
        </div>
        {children}
      </div>
    );
  }
  if (!selected) {
    return (
      <div
        className="w-[230px] h-[140px] dark:bg-gray-200 flex flex-col gap-2 items-center p-2 border border-neutral-300 rounded-sm hover:border-branding-green-600 hover:cursor-pointer"
        onClick={onClickHandle}
      >
        <div className="absolute -mr-44 p-[2px] flex items-center justify-center bg-branding-green-600 rounded-full opacity-0">
          <Check className=" w-4 h-4" />
        </div>
        {children}
      </div>
    );
  }
  return (
    <div
      className="w-[230px] h-[140px] flex flex-col gap-2 items-center p-2 border rounded-sm bg-[#F4FEFA] border-branding-green-600 hover:cursor-pointer"
      onClick={onClickHandle}
    >
      <div className="absolute -mr-44 p-[2px] flex items-center justify-center bg-branding-green-600 rounded-full">
        <Check className="w-4 h-4" />
      </div>
      {children}
    </div>
  );
}

export default function NewProjectPage() {
  const [selectedProjectType, setSelectedProjectType] = useState<
    number | undefined
  >();
  const [selectedSource, setSelectedSource] = useState<number | undefined>();
  const [progress, setProgress] = useState(0);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    setSelectedSource(undefined);
  }, [selectedProjectType]);

  return (
    <div className="flex justify-center">
      <div className="bg-muted w-full rounded-lg border p-8 flex flex-col gap-8 max-w-[800px]">
        <span className="text-lg font-semibold">
          Create or import new project
        </span>
        <div className="flex flex-col gap-2">
          <span className="">Select Qatalyst Project Type</span>
          <div className="flex flex-row gap-4 items-center justify-center flex-wrap">
            <BoxSelection
              selected={selectedProjectType === NATURE_BASED}
              onClickHandle={() => setSelectedProjectType(NATURE_BASED)}
            >
              <Image
                src="/icons/nature-based.svg"
                alt="Nature-Based"
                width={128}
                height={80}
                priority
                className="w-32 h-20"
              />
              <span className="dark:text-black">Nature-based</span>
            </BoxSelection>
            <BoxSelection
              disabled={true}
              selected={selectedProjectType === COOKSTOVE}
              onClickHandle={() => setSelectedProjectType(COOKSTOVE)}
            >
              <Image
                src="/icons/cookstove.svg"
                alt="Cookstove"
                width={128}
                height={80}
                priority
                className="w-32 h-20"
              />
              <span className="dark:text-black">Cookstove</span>
            </BoxSelection>
            <BoxSelection
              disabled
              selected={selectedProjectType === OTHER}
              onClickHandle={() => setSelectedProjectType(OTHER)}
            >
              <Image
                src="/icons/other.svg"
                alt="Other"
                width={128}
                height={80}
                priority
                className="w-32 h-20"
              />
              <span className="dark:text-black">Other</span>
            </BoxSelection>
          </div>
        </div>
        {typeof selectedProjectType !== 'undefined' && (
          <div className="flex flex-col gap-2">
            <span>Choose method to create new project</span>
            <div className="flex flex-row gap-4 items-center justify-between">
              <BoxSelection
                disabled
                selected={selectedSource === MANUAL}
                onClickHandle={() => setSelectedSource(MANUAL)}
              >
                <Image
                  src="/icons/manual.svg"
                  alt="Other"
                  width={128}
                  height={80}
                  className="w-32 h-20"
                />
                <span className="dark:text-black">Create project manually</span>
              </BoxSelection>
              <BoxSelection
                selected={selectedSource === VERRA}
                onClickHandle={() => setSelectedSource(VERRA)}
              >
                <Image
                  src="/icons/verra.svg"
                  alt="Other"
                  width={128}
                  height={80}
                  className="w-32 h-20"
                />
                <span className="dark:text-black">Import from Verra</span>
              </BoxSelection>
              <BoxSelection
                disabled
                selected={selectedSource === GS}
                onClickHandle={() => setSelectedSource(GS)}
              >
                <Image
                  src="/icons/gs.svg"
                  alt="Other"
                  width={128}
                  height={80}
                  className="w-32 h-20"
                />
                <span className="dark:text-black">Import from Gold Standard</span>
              </BoxSelection>
            </div>
          </div>
        )}

        {typeof selectedSource !== 'undefined' && (
          <div className="flex flex-col gap-2">
            <span>Available projects to import</span>
            <div className="flex flex-row gap-4 items-center min-h-10">
              <span className='text-sm border p-2 rounded-sm'>
                1650 - Reduced Emissions from Deforestation and Degradation in
                Keo Seima Wildlife Sanctuary
              </span>

              <Button
                size="small"
                variant="secondary"
                onClick={() => {
                  setImporting(true);
                  setProgress(15);
                  setTimeout(() => setProgress(40), 500);
                  setTimeout(() => setProgress(75), 900);
                  setTimeout(() => {
                    setProgress(100);
                    importProject();
                  }, 1500);
                }}
              >
                Import
              </Button>
            </div>
            {importing && (
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm">Importing project...</span>
                <Progress value={progress} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
