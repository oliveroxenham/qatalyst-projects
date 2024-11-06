import ReactCountryFlag from 'react-country-flag';

const ProjectTitle = ({
  title,
  countryCode,
}: {
  title: string;
  countryCode: string;
}) => {
  return (
    <div className="m-4 flex flex-row items-center gap-2 rounded-lg border border-neutral-200 bg-white p-6">
      <ReactCountryFlag countryCode={countryCode} svg /> {title}
    </div>
  );
};

export default ProjectTitle;
