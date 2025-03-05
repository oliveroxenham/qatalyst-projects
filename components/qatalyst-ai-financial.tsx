import { Dispatch, SetStateAction } from 'react';
import { Files } from 'lucide-react';
import { clsx } from 'clsx';
import Logo from '@/public/icons/logo.svg';
import { FAItem, Project } from '@/types/project';
import { FINANCIAL_ASSESSMENT_ITEMS } from '@/lib/constants';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function QatalystAi({
  projectData,
  aiSidebarOpen = false,
  setAiSidebarOpen,
  openDocumentUrl,
}: {
  projectData: Project | null;
  aiSidebarOpen?: boolean;
  setAiSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  openDocumentUrl?: Dispatch<SetStateAction<string | undefined>>;
}) {
  const { t } = useTranslation();
  console.log('QatalystAi projectData=', projectData);
  return (
    <div className="flex flex-row max-h-screen">
      {aiSidebarOpen && (
        <div className="w-[560px] bg-muted border-l p-4 flex flex-col justify-between">
          <div className="h-full border overflow-scroll" id="qatalyst-ai">
            {!projectData ||
              (!projectData.financialAssessment && (
                <span className="text-xs p-2 text-neutral-500">
                  {t('qatalystAi.notAvailable')}
                </span>
              ))}
            {projectData && ['1650'].indexOf(projectData?.id) < 0 && (
              <span className="text-xs p-2 text-neutral-500">
                {t('qatalystAi.notAvailable')}
              </span>
            )}
            {projectData &&
              projectData.financialAssessment &&
              FINANCIAL_ASSESSMENT_ITEMS.map((item) => {
                // @ts-expect-error Ignore type
                const faItem = projectData.financialAssessment[item] as FAItem;
                if (!faItem.ai) return null;
                return (
                  <div
                    key={item}
                    className="flex flex-col gap-2 p-2 transition-all"
                    id={faItem.id}
                  >
                    <div className="flex flex-row gap-1 items-start">
                      <div className="rounded-full bg-blaze-orange-500 flex items-center justify-center p-1 mt-[2px]">
                        <Logo className="w-[10px] h-[10px]" />
                      </div>

                      <p className="text-foreground text-sm font-semibold">
                        {t('qatalystAi.foundFollowing')}{' '}
                        <span className="text-secondary">
                          {faItem.ai.title}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm px-1">{faItem.ai.response}</p>
                    <div className="flex flex-row flex-wrap gap-2">
                      {faItem.sources.map((source, index) => {
                        if (
                          openDocumentUrl &&
                          source.name ===
                            'KSWS REDD+_VCS CCB MR_2020-2021_v1.9_final.pdf - page 3'
                        ) {
                          return (
                            <Link
                              href="#"
                              key={index}
                              className="underline text-blaze-orange-600"
                              onClick={() => openDocumentUrl('ok')}
                            >
                              <span
                                key={index}
                                className="text-xs"
                              >
                                [{index + 1}] {source.name}
                              </span>
                            </Link>
                          );
                        }
                        return (
                          <div key={index}>
                            <span className="text-xs">
                              [{index + 1}] {source.name}
                            </span>
                            <span className="text-[10px] bg-neutral-200 text-muted-foreground rounded-lg p-1 ml-1">
                              {t('qatalystAi.naInDemo')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="bg-background w-full h-14 border rounded-lg flex items-center p-2 mt-2">
            <span className="text-muted-foreground text-xs">
              {t('qatalystAi.askSomething')}
            </span>
          </div>
        </div>
      )}
      <div className="w-[72px] bg-background border-l py-4 flex flex-col gap-2">
        <div
          id="qatalyst-ai-button"
          className="flex flex-col items-center justify-center gap-1 hover:cursor-pointer hover:bg-blaze-orange-200/25 py-2 min-h-16"
          onClick={() =>
            setAiSidebarOpen ? setAiSidebarOpen(!aiSidebarOpen) : null
          }
        >
          <div
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center',
              {
                'bg-neutral-400': !aiSidebarOpen,
                'bg-blaze-orange-600': aiSidebarOpen,
              }
            )}
          >
            <Logo className="w-[18px] h-[18px] fill-white" />
          </div>
          <span className="text-[10px] text-center text-muted-foreground">
            {t('qatalystAi.title')}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 hover:cursor-pointer hover:bg-blaze-orange-200/25 py-2 min-h-16">
          <Files className="w-5 h-5 text-muted-foreground" />
          <span className="text-[10px] text-center text-muted-foreground">
            {t('sidebar.documents')}
          </span>
        </div>
      </div>
    </div>
  );
}
