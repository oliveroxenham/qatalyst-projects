'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/qbutton';
import { clsx } from 'clsx';
const NATURE_BASED = 0,
  COOKSTOVE = 1,
  OTHER = 2,
  MANUAL = 3,
  VERRA = 4,
  GS = 5;

function BoxSelection({
  children,
  selected,
  onClickHandle,
}: {
  children?: React.ReactNode;
  selected?: boolean;
  onClickHandle?: () => void;
}) {
  if (!selected) {
    return (
      <div
        className="w-[230px] h-[140px] bg-white flex flex-col gap-2 items-center p-2 border border-neutral-300 rounded-sm hover:bg-[#F4FEFA] hover:border-branding-green-600 hover:cursor-pointer"
        onClick={onClickHandle}
      >
        <div className="absolute -mr-44 p-[2px] flex items-center justify-center bg-branding-green-600 rounded-full opacity-0">
          <Check className="text-white w-4 h-4" />
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
        <Check className="text-white w-4 h-4" />
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
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >();

  useEffect(() => {
    setSelectedSource(undefined);
    setSelectedProjectId(undefined);
  }, [selectedProjectType]);

  return (
    <div className="flex justify-center">
      <div className="bg-white w-full rounded-lg border border-neutral-200 p-8 flex flex-col gap-8 max-w-[800px]">
        <span className="text-lg font-semibold">
          Create or import new project
        </span>
        <div className="flex flex-col gap-2">
          <span className="">Select Qatalyst Project Type</span>
          <div className="flex flex-row gap-4 items-center justify-between">
            <BoxSelection
              selected={selectedProjectType === NATURE_BASED}
              onClickHandle={() => setSelectedProjectType(NATURE_BASED)}
            >
              <Image
                src="/icons/nature-based.svg"
                alt="Nature-Based"
                width={128}
                height={80}
              />
              <span>Nature-based</span>
            </BoxSelection>
            <BoxSelection
              selected={selectedProjectType === COOKSTOVE}
              onClickHandle={() => setSelectedProjectType(COOKSTOVE)}
            >
              <Image
                src="/icons/cookstove.svg"
                alt="Cookstove"
                width={128}
                height={80}
              />
              <span>Cookstove</span>
            </BoxSelection>
            <BoxSelection
              selected={selectedProjectType === OTHER}
              onClickHandle={() => setSelectedProjectType(OTHER)}
            >
              <Image
                src="/icons/other.svg"
                alt="Other"
                width={128}
                height={80}
              />
              <span>Other</span>
            </BoxSelection>
          </div>
        </div>
        {typeof selectedProjectType !== 'undefined' && (
          <div className="flex flex-col gap-2">
            <span>Choose method to create new project</span>
            <div className="flex flex-row gap-4 items-center justify-between">
              <BoxSelection
                selected={selectedSource === MANUAL}
                onClickHandle={() => setSelectedSource(MANUAL)}
              >
                <Image
                  src="/icons/manual.svg"
                  alt="Other"
                  width={128}
                  height={80}
                />
                <span>Create project manually</span>
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
                />
                <span>Import from Verra</span>
              </BoxSelection>
              <BoxSelection
                selected={selectedSource === GS}
                onClickHandle={() => setSelectedSource(GS)}
              >
                <Image
                  src="/icons/gs.svg"
                  alt="Other"
                  width={128}
                  height={80}
                />
                <span>Import from Gold Standard</span>
              </BoxSelection>
            </div>
          </div>
        )}

        {typeof selectedSource !== 'undefined' && (
          <div className="flex flex-col gap-2">
            <span>Available projects to import</span>
            <div className="flex flex-row gap-4 items-center min-h-10">
              <Badge
                className={clsx('hover:cursor-pointer', {
                  'bg-branding-green-600 text-white':
                    selectedProjectId === '1678',
                })}
                variant="outline"
                onClick={() => setSelectedProjectId('1678')}
              >
                1678
              </Badge>
              {typeof selectedProjectId !== 'undefined' && (
                <Button size="small" variant="secondary">Import</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
