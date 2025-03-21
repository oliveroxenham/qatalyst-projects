import { Project } from '@/types/project';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

const ProjectSummary = ({
  benchmarkLayoutVisible,
  projectData,
}: {
  readonly benchmarkLayoutVisible: boolean;
  projectData: Project;
}) => {
  const { t } = useTranslation();
  
  return (
    <div
      className={clsx(
        'm-2 grid grid-cols-3 gap-x-8 gap-y-4 rounded-lg border bg-background p-6',
        {
          'lg:grid-cols-6': !benchmarkLayoutVisible,
        }
      )}
    >
      <div className="border-r text-sm">
        <span className="text-muted-foreground">{t('scorecard.projectValue')}</span>
        <p className="pt-2 text-xl font-medium truncate text-ellipsis">
          {projectData.financialAssessment.projectValue.value
            ? projectData.financialAssessment.projectValue.formatted
            : '-'}{' '}
          {projectData.financialAssessment.projectValue.value ? (
            <span className="text-lg">
              {projectData.financialAssessment.projectValue.unit}
            </span>
          ) : null}
        </p>
      </div>
      <div className="border-r text-sm">
        <span className="text-muted-foreground">{t('scorecard.carbonCredits')}</span>
        <p className="pt-2 text-xl font-medium truncate text-ellipsis">
          {projectData.estimatedAnnualCredits.formatted}{' '}
          <span className="text-lg">
            {projectData.estimatedAnnualCredits.unit}
          </span>
        </p>
      </div>
      <div
        className={clsx('text-sm', {
          'border-r-0': benchmarkLayoutVisible,
          'lg:border-r': !benchmarkLayoutVisible,
        })}
      >
        <span className="text-muted-foreground">{t('scorecard.projectLifetime')}</span>
        <p className="pt-2 text-xl font-medium truncate text-ellipsis">
          {projectData.financialAssessment.projectDuration.formatted}{' '}
          <span className="text-lg">
            {projectData.financialAssessment.projectDuration.unit}
          </span>
        </p>
      </div>
      <div className="border-r text-sm">
        <span className="text-muted-foreground">{t('scorecard.projectArea')}</span>
        <p className="pt-2 text-xl font-medium truncate text-ellipsis">
          {projectData.projectArea.value
            ? projectData.projectArea.formatted
            : '-'}{' '}
          {projectData.projectArea.value && <span className="text-lg">{projectData.projectArea.unit}</span>}
        </p>
      </div>
      <div className="border-r text-sm">
        <span className="text-muted-foreground">{t('scorecard.registryStatus')}</span>
        <p className="pt-2 text-xl font-medium truncate text-ellipsis">
          {projectData.registryStatus}
        </p>
      </div>
      <div className="text-sm ">
        <span className="text-muted-foreground">{t('scorecard.projectType')}</span>
        <p className="pt-2 text-xl font-medium truncate text-ellipsis">
          {projectData.projectType}
        </p>
      </div>
    </div>
  );
};

export default ProjectSummary;
