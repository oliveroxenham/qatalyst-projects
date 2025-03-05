import { Dispatch, SetStateAction } from 'react';
import { Files } from 'lucide-react';
import { clsx } from 'clsx';
import Logo from '@/public/icons/logo.svg';
import { EsgRisk, Project } from '@/types/project';
import { translateRiskName, translateAiResponse } from '@/mock/translations';
import { useTranslation } from 'react-i18next';

export function QatalystAi({
  projectData,
  aiSidebarOpen = false,
  setAiSidebarOpen,
}: {
  projectData: Project | null;
  aiSidebarOpen?: boolean;
  setAiSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const risks = projectData?.esgAssessment.risks;
  if (!risks || risks.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-row max-h-screen">
      {aiSidebarOpen && (
        <div className="w-[560px] bg-muted border-l p-4 flex flex-col justify-between">
          <div className="h-full border overflow-scroll" id="qatalyst-ai">
            {!projectData || (!projectData.esgAssessment && null)}
            {projectData && ['1650'].indexOf(projectData?.id) < 0 && (
              <span className="text-xs p-2 text-neutral-500">
                Qatalyst AI is not available for this project in demo app.
              </span>
            )}
            {projectData &&
              projectData.esgAssessment &&
              risks.map((riskItem:EsgRisk) => {
                if (!riskItem.ai) return null;
                return (
                  <div
                    key={riskItem.id}
                    className="flex flex-col gap-2 p-2 transition-all"
                    id={riskItem.id}
                  >
                    <div className="flex flex-row gap-1 items-start">
                      <div className="rounded-full bg-blaze-orange-500 flex items-center justify-center p-1 mt-[2px]">
                        <Logo className="w-[10px] h-[10px]" />
                      </div>

                      <p className="text-foreground text-sm font-semibold">
                        Qatalyst found the following for{' '}
                        <span className="text-secondary">
                          {translateRiskName(riskItem.ai.title)}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm px-1">
                      {riskItem.id && riskItem.ai?.response && 
                        translateAiResponse(`${riskItem.id}.response`, riskItem.ai.response)
                      }
                    </p>
                    <p className="flex flex-row flex-wrap gap-2">
                      {riskItem.sources?.map((source, index) => {
                        return (
                          <span key={index} className="text-xs">
                            [{index + 1}] {source.name}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                );
              })}
          </div>
          <div className="bg-background w-full h-14 border rounded-lg flex items-center p-2 mt-2">
            <span className="text-muted-foreground text-xs">
              Ask Qatalyst AI something...
            </span>
          </div>
        </div>
      )}
      <div className="w-[72px] bg-background border-l py-4 flex flex-col gap-2">
        <div
          id="qatalyst-ai-button"
          className="flex flex-col items-center justify-center gap-1 hover:cursor-pointer hover:bg-blaze-orange-200/25 py-2 min-h-16"
          onClick={() => setAiSidebarOpen ? setAiSidebarOpen(!aiSidebarOpen) : null}
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
            Qatalyst AI
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 hover:cursor-pointer hover:bg-blaze-orange-200/25 py-2 min-h-16">
          <Files className="w-5 h-5 text-muted-foreground" />
          <span className="text-[10px] text-center text-muted-foreground">
            Documents
          </span>
        </div>
      </div>
    </div>
  );
}
