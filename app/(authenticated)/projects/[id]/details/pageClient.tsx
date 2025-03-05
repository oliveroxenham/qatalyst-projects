'use client';

import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import { SdgSummary } from '@/components/sdg-summary';
import { CollaboratorTag } from '@/components/collaborator-tag';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { AssigneeSelector } from '@/components/assignee-selector';
import { GenerateAssessmentButton } from '@/components/generate-assessment-button';
import { Badge } from '@/components/ui/badge';
import { getInitialsFromName } from '@/lib/utils';
import { EditButton } from './edit-button';
import { DriverJs } from '@/components/driverjs/driverjs';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { Project } from '@/types/project';
import { translateProjectBackground, translateProjectProponent, translateProjectName, translateCountryName } from '@/mock/translations';

interface SerializedUser {
  id: string;
  fullName: string | null;
}

interface ProjectDetailsClientProps {
  projectData: Project | null;
  projectId: string;
  user: SerializedUser | null;
}

export default function ProjectDetailsClient({
  projectData,
  projectId,
  user,
}: ProjectDetailsClientProps) {
  const { t } = useTranslation();

  return (
    <div>
      <TopBar title={t('projectDetails.title')}>
        <div className="flex justify-between items-center w-full gap-2">
          {projectData && (
            <ProjectInfoTooltip
              name={translateProjectName(projectData.id, projectData.name)}
              sourceType={projectData.sourceType}
              originalId={projectData.id}
              projectType={projectData.projectType}
            />
          )}
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 grid lg:grid-cols-5 gap-2">
        <div className="col-span-1 lg:col-span-3 bg-background rounded-lg border">
          <div className="flex items-center justify-between py-2 px-4">
            <span className="font-semibold">{t('projectDetails.details')}</span>
            <EditButton />
          </div>
          <Separator />
          <div>
            <div className="flex p-4 gap-3">
              <div className="flex flex-col gap-1 grow">
                <span>{t('projectDetails.registryId')}</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectId}
                </p>
              </div>
              <div className="flex flex-col gap-1 grow">
                <span>{t('projectDetails.projectType')}</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectData?.projectType}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.projectName')}</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.id && projectData?.name ? translateProjectName(projectData.id, projectData.name) : ''}
              </p>
            </div>

            <div className="flex p-4 gap-3">
              <div className="flex flex-col gap-1 grow">
                <span>{t('projectDetails.country')}</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectData?.countryName ? translateCountryName(projectData.countryName) : ''}
                </p>
              </div>
              {projectData?.state ? (
                <div className="flex flex-col gap-1 grow">
                  <span>{t('projectDetails.state')}</span>
                  <p className="text-sm p-2 border rounded bg-muted">
                    {projectData.state}
                  </p>
                </div>
              ) : null}
            </div>
            <div
              // @ts-expect-error - image-url is a custom property
              style={{ '--image-url': `url(${projectData?.mapUrl})` }}
              className={`flex m-4 gap-3 h-[220px] bg-muted border justify-center items-center bg-center bg-[image:var(--image-url)]`}
            />

            <div className="flex p-4 gap-3">
              <div className="flex flex-col gap-1 grow">
                <span>{t('projectDetails.latitude')}</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectData?.latitude}
                </p>
              </div>
              <div className="flex flex-col gap-1 grow">
                <span>{t('projectDetails.longitude')}</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectData?.longitude}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.background')}</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.id && projectData?.background ? translateProjectBackground(projectData.id, projectData.background) : ''}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.proponent')}</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.id && projectData?.proponent ? translateProjectProponent(projectData.id, projectData.proponent) : ''}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.projectStatus')}</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.registryStatus}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.projectType')}</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.projectType}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.estimatedAnnualCredits')}</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.estimatedAnnualCredits.formatted}{' '}
                {projectData?.estimatedAnnualCredits.unit}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.methodology')}</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.methodology}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.projectArea')}</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.projectArea.formatted}{' '}
                {projectData?.projectArea.unit}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>{t('projectDetails.sdgs')}</span>
              <div className="text-sm p-2 border rounded bg-muted">
                <SdgSummary sdgs={projectData?.sdgs} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
          <div className="bg-background rounded-lg border">
            <div className="flex items-center justify-between py-2 px-4">
              <span className="font-semibold">
                {t('projectDetails.taskManager')}
              </span>
              <Button size="sm" variant="ghost">
                <ChevronDown />
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col gap-8 p-4">
              <div className="flex flex-row justify-between">
                <div className="w-1/4">
                  <span className="text-neutral-500">
                    {t('projectDetails.creator')}
                  </span>
                </div>
                <div className="w-3/4">{projectData?.owner}</div>
              </div>

              <div className="flex flex-row justify-between">
                <div className="w-1/4">
                  <span className="text-neutral-500">
                    {t('projectDetails.collaborators')}
                  </span>
                </div>
                <div className="w-3/4 flex flex-wrap gap-1">
                  {projectData?.collaborators.map((collaborator) => (
                    <CollaboratorTag
                      key={collaborator}
                      collaborator={collaborator}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold">
                  {t('projectDetails.financialAssessment')}
                </span>
                <div className="flex flex-col gap-4 mt-2 border rounded p-4">
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">
                        {t('projectDetails.assignTo')}
                      </span>
                    </div>
                    <div className="w-3/4">
                      <AssigneeSelector
                        projectId={projectId}
                        assessment="financial"
                        currentUser={user?.fullName}
                        assignedTo={projectData?.financialAssessment.assignedTo}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">
                        {t('projectDetails.finalRating')}
                      </span>
                    </div>
                    <div className="w-3/4">
                      <div
                        className={clsx(
                          'flex items-center border rounded-sm p-2 h-10 text-white',
                          {
                            'bg-neutral-500':
                              projectData?.financialAssessment.status.toLowerCase() ===
                              'not started',
                            'bg-blue-500':
                              projectData?.financialAssessment.status.toLowerCase() ===
                              'in progress',
                            'bg-branding-green-600':
                              projectData?.financialAssessment.status.toLowerCase() ===
                              'eligible',
                            'bg-destructive':
                              projectData?.financialAssessment.status.toLowerCase() ===
                              'not eligible',
                          }
                        )}
                      >
                        <span className="text-white capitalize">
                          {t(
                            `projectDetails.status.${projectData?.financialAssessment.status
                              .toLowerCase()
                              .replace(/\s+/g, '_')}` as string,
                            {
                              defaultValue: t(
                                'projectDetails.status.not_started'
                              ),
                            }
                          )}
                        </span>
                      </div>
                      <div className="mt-2">
                        <GenerateAssessmentButton
                          size="lg"
                          currentUser={user?.fullName}
                          assignee={projectData?.financialAssessment.assignedTo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-semibold">
                  {t('projectDetails.esgAssessment')}
                </span>
                <div className="flex flex-col gap-4 mt-2 border rounded p-4">
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">
                        {t('projectDetails.assignTo')}
                      </span>
                    </div>
                    <div className="w-3/4">
                      <AssigneeSelector
                        projectId={projectId}
                        assessment="esg"
                        currentUser={user?.fullName}
                        assignedTo={projectData?.esgAssessment.assignedTo}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">
                        {t('projectDetails.finalRating')}
                      </span>
                    </div>
                    <div className="w-3/4">
                      <div
                        className={clsx(
                          'flex items-center border rounded-sm p-2 h-10 text-white',
                          {
                            'bg-neutral-500':
                              projectData?.esgAssessment.status.toLowerCase() ===
                              'not started',
                            'bg-blue-500':
                              projectData?.esgAssessment.status.toLowerCase() ===
                              'in progress',
                            'bg-branding-green-600':
                              projectData?.esgAssessment.status.toLowerCase() ===
                              'eligible',
                            'bg-destructive':
                              projectData?.esgAssessment.status.toLowerCase() ===
                              'not eligible',
                          }
                        )}
                      >
                        <span className="text-white capitalize">
                          {t(
                            `projectDetails.status.${projectData?.esgAssessment.status
                              .toLowerCase()
                              .replace(/\s+/g, '_')}` as string,
                            {
                              defaultValue: t(
                                'projectDetails.status.not_started'
                              ),
                            }
                          )}
                        </span>
                      </div>
                      <div className="mt-2">
                        <GenerateAssessmentButton
                          size="lg"
                          currentUser={user?.fullName}
                          assignee={projectData?.esgAssessment.assignedTo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-2 items-center">
                  <span className="font-semibold">
                    {t('projectDetails.kycAssessment')}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-neutral-200 text-neutral-500 text-[10px]"
                  >
                    {t('projectDetails.comingSoon')}
                  </Badge>
                </div>
                <div className="flex flex-col gap-4 mt-2 border rounded p-4">
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">
                        {t('projectDetails.assignTo')}
                      </span>
                    </div>
                    <div className="w-3/4">
                      <AssigneeSelector
                        projectId={projectId}
                        assessment="financial"
                        currentUser={user?.fullName}
                        assignedTo={projectData?.kycAssessment.assignedTo}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">
                        {t('projectDetails.finalRating')}
                      </span>
                    </div>
                    <div className="w-3/4">
                      <div className="flex items-center border rounded-sm p-2 h-10 bg-neutral-500">
                        <span className="text-white capitalize">
                          {t(
                            `projectDetails.status.${projectData?.kycAssessment.status
                              .toLowerCase()
                              .replace(/\s+/g, '_')}` as string,
                            {
                              defaultValue: t(
                                'projectDetails.status.not_started'
                              ),
                            }
                          )}
                        </span>
                      </div>
                      <div className="mt-2">
                        <GenerateAssessmentButton
                          size="lg"
                          currentUser={user?.fullName}
                          assignee={'anonymous'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg border">
            <div className="flex items-center justify-between py-2 px-4">
              <span className="font-semibold">
                {t('projectDetails.activity')}
              </span>
              <Button size="sm" variant="ghost">
                <ChevronDown />
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col p-4 gap-4">
              {projectData?.activities?.map((activity) => (
                <div key={activity.id} className="flex flex-row border-b pb-4">
                  <div className="w-1/12">
                    <div className="w-8 h-8 rounded-full bg-neutral-400 text-xs flex items-center justify-center text-primary-foreground">
                      {activity?.name ? getInitialsFromName(activity.name) : ''}
                    </div>
                  </div>
                  <div className="w-11/12 ml-2 flex flex-col gap-2">
                    <span className="text-sm">{activity.description}</span>
                    <span className="text-xs text-muted-foreground">
                      {activity.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DriverJs />
    </div>
  );
}
