import ReactCountryFlag from 'react-country-flag';

const ProjectTitle = () => {
  return (
    <div className='m-4 flex flex-row items-center gap-2 rounded-lg border border-neutral-200 bg-white p-6'>
      <ReactCountryFlag countryCode='KH' svg /> Reduced Emissions From Deforestation And Degradation In Keo Seima
      Wildlife Sanctuary
    </div>
  );
};

export default ProjectTitle;
