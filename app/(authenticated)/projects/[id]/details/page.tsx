import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, Edit } from 'lucide-react';
import { SdgSummary } from '@/components/sdg-summary';
import { getProjectByIdServer } from '@/server/db';
import { CollaboratorTag } from '@/components/collaborator-tag';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { AssigneeSelector } from '@/components/assignee-selector';
import { currentUser } from '@clerk/nextjs/server';
import { Badge } from '@/components/ui/badge';
import { getInitialsFromName } from '@/lib/utils';

export default async function ProjectInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = await getProjectByIdServer({ id: projectId });
  const user = await currentUser();
  console.log({ user, projectData });
  return (
    <div>
      <TopBar title="Project Details">
        <div className="flex justify-between items-center w-full gap-2">
          {projectData && (
            <ProjectInfoTooltip
              name={projectData.name}
              sourceType={projectData.sourceType}
              originalId={projectData.id}
              projectType={projectData.projectType}
            />
          )}
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 grid lg:grid-cols-5 gap-2">
        <div className="col-span-1 lg:col-span-3 bg-background rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between py-2 px-4">
            <span className="font-semibold">Details</span>
            <Button variant="outline" size="small">
              <Edit />
              Edit
            </Button>
          </div>
          <Separator />
          <div>
            <div className="flex p-4 gap-3">
              <div className="flex flex-col gap-1 grow">
                <span>Registry Project ID</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectId}
                </p>
              </div>
              <div className="flex flex-col gap-1 grow">
                <span>Qatalyst Project Type</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectData?.projectType}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Project Name</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.name}
              </p>
            </div>

            <div className="flex p-4 gap-3">
              <div className="flex flex-col gap-1 grow">
                <span>Country</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectData?.countryName}
                </p>
              </div>
              {projectData?.state ? (
                <div className="flex flex-col gap-1 grow">
                  <span>State / Province</span>
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
                <span>Latitude</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectData?.latitude}
                </p>
              </div>
              <div className="flex flex-col gap-1 grow">
                <span>Longitude</span>
                <p className="text-sm p-2 border rounded bg-muted">
                  {projectData?.longitude}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Background</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.background}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Proponent</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.proponent}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Project Status</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.registryStatus}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Project Type</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.projectType}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Estimated Annual Credits</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.estimatedAnnualCredits.formatted}{' '}
                {projectData?.estimatedAnnualCredits.unit}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Methodology</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.methodology}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Project Area</span>
              <p className="text-sm p-2 border rounded bg-muted">
                {projectData?.projectArea.formatted}{' '}
                {projectData?.projectArea.unit}
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Sustainable Development Goals</span>
              <div className="text-sm p-2 border rounded bg-muted">
                <SdgSummary sdgs={projectData?.sdgs} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
          <div className="bg-background rounded-lg border border-neutral-200">
            <div className="flex items-center justify-between py-2 px-4">
              <span className="font-semibold">Task Manager</span>
              <Button size="sm" variant="ghost">
                <ChevronDown />
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col gap-8 p-4">
              <div className="flex flex-row justify-between">
                <div className="w-1/4">
                  <span className="text-neutral-500">Creator</span>
                </div>
                <div className="w-3/4">{projectData?.owner}</div>
              </div>

              <div className="flex flex-row justify-between">
                <div className="w-1/4">
                  <span className="text-neutral-500">Collaborators</span>
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
                <span className="font-semibold">Financial Assessment</span>
                <div className="flex flex-col gap-4 mt-2 border rounded p-4">
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">Assign to</span>
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
                      <span className="text-neutral-500">Final Rating</span>
                    </div>
                    <div className="w-3/4">
                      <div className="flex items-center border rounded-sm p-2 h-10 bg-neutral-500">
                        <span className="text-white capitalize">
                          {projectData?.financialAssessment.status ??
                            'Not Started'}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Button disabled className="w-full">
                          Generate Assessment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-semibold">ESG Assessment</span>
                <div className="flex flex-col gap-4 mt-2 border rounded p-4">
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">Assign to</span>
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
                      <span className="text-neutral-500">Final Rating</span>
                    </div>
                    <div className="w-3/4">
                      <div className="flex items-center border rounded-sm p-2 h-10 bg-neutral-500">
                        <span className="text-white capitalize">
                          {projectData?.esgAssessment.status ?? 'Not Started'}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Button disabled className="w-full">
                          Generate Assessment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-2 items-center">
                  <span className="font-semibold">KYC Assessment</span>
                  <Badge
                    variant="outline"
                    className="bg-neutral-200 text-neutral-500"
                  >
                    Coming Soon
                  </Badge>
                </div>
                <div className="flex flex-col gap-4 mt-2 border rounded p-4">
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row w-1/4">
                      <span className="text-neutral-500">Assign to</span>
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
                      <span className="text-neutral-500">Final Rating</span>
                    </div>
                    <div className="w-3/4">
                      <div className="flex items-center border rounded-sm p-2 h-10 bg-neutral-500">
                        <span className="text-white capitalize">
                          {projectData?.kycAssessment.status ?? 'Not Started'}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Button disabled className="w-full">
                          Generate Assessment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg border border-neutral-200">
            <div className="flex items-center justify-between py-2 px-4">
              <span className="font-semibold">Activity</span>
              <Button size="sm" variant="ghost">
                <ChevronDown />
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col p-4 gap-4">
              {projectData?.activities?.map((activity) => (
                <div key={activity.id} className="flex flex-row border-b pb-4">
                  <div className="w-1/12">
                    <div className="w-8 h-8 rounded-full bg-neutral-400 text-xs flex items-center justify-center text-primary-foreground">{activity?.name ? getInitialsFromName(activity.name) : ''}</div>
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
    </div>
  );
}
