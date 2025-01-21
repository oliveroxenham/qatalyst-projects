import ReactCountryFlag from 'react-country-flag';

const ProjectTitle = ({
  title,
  countryCode,
  projectId,
}: {
  title: string;
  countryCode: string;
  projectId: string;
}) => {
  return (
    <div className="m-2 flex flex-row items-center gap-2 rounded-lg border border-neutral-200 bg-white p-6">
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: 24,
          height: 24,
        }}
      />
      <span className="text-lg text-ellipsis truncate">
        {projectId} - {title}
      </span>
    </div>
  );
};

export default ProjectTitle;
