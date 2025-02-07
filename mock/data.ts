// @ts-nocheck

import { QATALYST_RESPONSE } from '@/lib/constants';
import { Project } from '@/types/project';

const PROJECT_ID_1650: Project = {
  id: '1650',
  imgUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img2-Pesg4thDgdnsXKVZ2eMbgqK6e5jckg.png',
  mapUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/map_1650-rBewjDh2xpJzP0V53DzRndrO1fBZwz.png',
  name: 'Reduced Emissions from Deforestation and Degradation in Keo Seima Wildlife Sanctuary',
  country: 'KH',
  countryName: 'Cambodia',
  lastUpdated: 'January 14, 2025',
  tags: [
    { value: 'Verra', type: 'VERRA' },
    { value: '1650', type: 'VERRA' },
    { value: '15.3m tCO₂e', type: 'MANUAL' },
    { value: 'Nature-based', type: 'MANUAL' },
    { value: 'Verified', type: 'MANUAL' },
  ],
  creditingStartDate: '12/31/2009',
  creditingEndDate: '12/30/2069',
  proponent: 'Royal Government of Cambodia (RGC), Ministry of Environment',
  background:
    "Nestled in the lush jungles of eastern Cambodia, the Keo Seima Wildlife Sanctuary (KSWS) is a haven for biodiversity and a vast storehouse of forest carbon. Spanning over 290,000 hectares, the protected area is home to a diverse array of wildlife, including 84 globally threatened species and the world's largest population of black-shanked douc and yellow-cheeked crested gibbon. The KSWS also holds a unique cultural significance for the Indigenous Bunong people, who have called this forest home for centuries and whose culture and livelihoods are deeply entwined with the forest. Despite the importance of this area, it faces a high threat of deforestation due to various factors, including forest conversion for agriculture and illegal logging." +
    'The Keo Seima Wildlife Sanctuary REDD+ Project (KSWS REDD+), launched in 2010 as a collaboration between the Royal Government of Cambodia (RGC) and the Wildlife Conservation Society (WCS), has made impressive strides in reducing deforestation and promoting alternative livelihoods. The project has prevented the release of more than 20 million tons of CO2e emissions and saved 25,000 hectares of forest from destruction. It has also created jobs, supported education and training initiatives, and established an ecotourism venture that supports local communities.' +
    'The project has also distributed nearly $1 million through its Cash for Communities (C4C) program, a mechanism that shares the revenue of carbon credits sales. These funds go directly to local communities, who decide how they should be spent to support sustainable development activities such as healthcare, education, and infrastructure like wells and bridges.' +
    "In Cambodia, the Ministry of Environment is at the forefront of protecting the country's protected areas, with a focus on preserving the nation's forests. The WCS is a leading global conservation organization operating in 60+ countries and brings its extensive knowledge and experience in conservation to the project.",
  latitude: '12.314823',
  longitude: '106.684903',
  createdBy: 'Wesley Oxenham',
  owner: 'Kopal Agarwal',
  collaborators: ['Kopal Agarwal', 'Poyan Rajamand', 'Wesley Oxenham'],
  sourceType: 'Verra',
  registryStatus: 'Registered',
  projectType: 'Nature-based',
  estimatedAnnualCredits: {
    formatted: '1,426,648',
    value: 1426648,
    unit: 'tons',
  },
  methodology: 'VM0015',
  projectArea: {
    formatted: '166,983',
    value: 166983,
    unit: 'hectares',
  },
  sdgs: [1, 2, 6, 8],
  financialAssessment: {
    status: 'in progress',
    progress: 32,
    projectValue: {
      id: 'projectValue',
      formatted: '',
      value: null,
      unit: 'USD',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductions: {
      id: 'estimatedReductions',
      formatted: '21,171,578',
      value: 21171578,
      unit: 'tCO₂e',
      sources: [
        {
          name: 'KSWS REDD+_VCS CCB MR_2020-2021_v1.9_final.pdf - page 3',
          url: '#Source-1',
        },
        {
          name: 'Source 2',
          url: '#Source-2',
        },
      ],
      qatalystGenerated: true,
      ai: {
        title: 'Estimated reductions (over project duration)',
        response: `The estimated reductions over the project duration were determined to be 21,171,578 tCO₂e. This value was extracted from multiple sources: 
        A table in the project documentation explicitly states the "Net estimated emission reductions in the project area, measured against the without-project scenario" as 21,171,578 for "Achievements during the Project Lifetime" 
        [1]. This same figure is corroborated in another text source, which presents it in a slightly different format but with the same value 
        [2]. The determination of this value is likely based on comprehensive calculations and modelling of the project's impact over its entire duration. It represents the total expected reduction in greenhouse gas emissions attributed to the project activities when compared to a baseline scenario without the project. It's important to note that this figure represents the cumulative reductions over the entire project lifetime, not an annual figure. The project is classified as a "large project" due to its significant impact, with annual reductions exceeding 300,000 tonnes of CO₂e [3].`,
      },
    },
    totalEstimatedReductions: {
      id: 'totalEstimatedReductions',
      formatted: '21,171,578',
      value: 21171578,
      unit: 'tCO₂e',
      sources: [
        {
          name: 'KSWS REDD+_VCS CCB MR_2020-2021_v1.9_final.pdf - page 3',
          url: '#Source-1',
        },
      ],
      qatalystGenerated: true,
      ai: {
        title: 'Total estimated reductions',
        response: `The value for Total estimated reductions was determined based on the following analysis:
The most relevant information was found in source [1], which provides a table of achievements during the project lifetime.
The table in [1] lists "Net estimated emission reductions in the project area, measured against the without-project scenario" as 21,171,578.
This value is the most comprehensive and appears to represent the total estimated reductions for the entire project lifetime.
The unit tCO₂e is not explicitly stated in the source, but it is the standard unit for GHG emission reductions and is consistent with other sources provided.
Other sources, such as [2] and [3], provide partial or annual data, but do not give a clear total for the entire project.
[4] shows a total of 1,641,141, but this appears to be for a shorter period (2018-2019) and not the full project lifetime.
Therefore, 21,171,578 tCO₂e is the best match for the total estimated reductions over the project's lifetime.`,
      },
    },
    projectDuration: {
      id: 'projectDuration',
      formatted: '60',
      value: 60,
      unit: 'Years',
      sources: [{ name: 'Source-1', url: '#Source-1' }],
      qatalystGenerated: true,
      ai: {
        title: 'Project duration',
        response: `The project duration was determined to be 10 years based on the following information:
The fixed baseline period is explicitly stated to be 10 years [1]
This duration is confirmed in a review of the Project Description (PD) [1]
The crediting period is described as fixed and 10 years long [2]
It's important to note that while some sources mention longer crediting periods (e.g., 60 years [3]), the specific question asks for the project duration, which appears to be consistently defined as 10 years across the most relevant sources. The 10-year period likely refers to the fixed baseline period, which is a crucial component of the project's duration for emissions reduction calculations.`,
      },
    },
    projectArea: {
      id: 'projectArea',
      formatted: '166,983',
      value: 166983,
      unit: 'Hectares',
      sources: [
        { name: 'Source-1', url: '#Source-1' },
        { name: 'Source-1', url: '#Source-1' },
        { name: 'Source-1', url: '#Source-1' },
        { name: 'Source-1', url: '#Source-1' },
      ],
      qatalystGenerated: true,
      ai: {
        title: 'Project area',
        response: `The Project area value of 166,983 hectares was determined based on the following information and reasoning:
The Project Area is explicitly stated as comprising 166,983 ha of forested land [1].
This area is located within the Core Protection Area of the Seima Protection Forest [1].
The Project Area excludes non-forest land within the boundary [1].
It includes all forest in the Core Area as designated at the time of the 2009 Sub-decree, with some exceptions [1].
Exceptions include areas with complex tenure arrangements, such as:
Areas mapped for issuance of private titles during the national 2012 land amnesty [1].
The Project Area is part of a larger Project Zone, which is 296,769 ha in size [2].
The boundary of the Project Area is defined unambiguously using GIS software formats [3].
The Project Area is named "Seima Protection Forest" [3].
This value is consistent across multiple sources and is the most specific and detailed measurement provided for the Project Area in hectares.`,
      },
    },
    estimatedReductionsPerUnitAreaPerYear: {
      id: 'estimatedReductionsPerUnitAreaPerYear',
      formatted: '12.68',
      value: 12.68,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductionsPerUnitArea: {
      id: 'estimatedReductionsPerUnitArea',
      formatted: '126.79',
      value: 126.79,
      unit: 'tCO₂e/Hectare',
      sources: [],
      qatalystGenerated: false,
    },
    landAcquisitionCost: {
      id: 'landAcquisitionCost',
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    landPerUnitAreaCost: {
      id: 'landPerUnitAreaCost',
      formatted: '',
      value: null,
      unit: 'kUSD/Hectare',
      sources: [],
      qatalystGenerated: false,
    },
    plantationEstablishmentMaintenanceCost: {
      id: 'plantationEstablishmentMaintenanceCost',
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfGoodsSold: {
      id: 'costOfGoodsSold',
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    overheads: {
      id: 'overheads',
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    totalGrossCosts: {
      id: 'totalGrossCosts',
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    alternateRevenueSources: {
      id: 'alternateRevenueSources',
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfFinancing: {
      id: 'costOfFinancing',
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    tax: {
      id: 'tax',
      formatted: '51,253',
      value: 51253,
      unit: 'kUSD',
      sources: [
        { name: 'Source-1', url: '#Source-1' },
        { name: 'Source-1', url: '#Source-1' },
      ],
      qatalystGenerated: true,
      ai: {
        title: 'Tax',
        response: `The value for Tax was determined based on the following analysis:
  The most relevant source for this information appears to be the table in [1], which shows tax values over multiple years.
  The highest tax value in this table is 51,253 kUSD, occurring in year t*+5 [1].
  This value is cumulative, representing the total tax up to that point [1].
  The unit 'kUSD' is specified in the field description, so the raw number 51,253 is used without the unit.
  Other sources were considered but did not provide more relevant or comprehensive tax information:
  [2] shows tax values, but only up to 49,674 kUSD [2].
  [3] and [4] contain similar tabular data but do not exceed the value found in [1].
  The value 51,253 kUSD was chosen as it represents the highest cumulative tax amount found in the most relevant source, aligning with the requirement to provide the best matching value for Tax in kUSD units.`,
      },
    },
  },
  esgAssessment: {
    status: 'in progress',
    progress: 95,
    risks: [
      {
        id: 'human-rights',
        name: 'Risk 1: Human Rights	',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
        ],
        ai: {
          title: 'Human Rights',
          response: `Based on the provided information and the context of the question, the most appropriate answer is 'Investigate'. The document source provided does not contain sufficient information to fully address the human rights considerations outlined in the question. While the source mentions some aspects related to equal rights and access to resources [1], it does not comprehensively cover the range of human rights issues specified in the question context. The lack of detailed information on human rights analysis, respect for human rights, protection against infringements, non-discrimination, and specific safeguards for vulnerable groups necessitates further investigation to make a definitive assessment.`,
        },
      },
      {
        id: 'gender-equality',
        name: 'Risk 2: Gender Equality',
      },
      {
        id: 'community-health',
        name: 'Risk 3: Community health, safety and security',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
          {
            name: 'source 5',
            url: '#source-5',
          },
          {
            name: 'source 6',
            url: '#source-6',
          },
          {
            name: 'source 7',
            url: '#source-7',
          },
        ],
        ai: {
          title: 'Community health, safety and security',
          response: `The answer 'Satisfactory' is based on the following evidence from the document sources:

1. The project provides comprehensive health and safety measures for both staff and local communities:

WCS Health and Safety policies protect all project staff and counterparts [1] [2].
Health and accident insurance is provided to staff, covering all healthcare expenses in case of work-related incidents or illnesses [1] [2].
2. Training and capacity building for community safety:

Community members involved in project activities like patrolling and eco-tourism receive safety and security training, typically on an annual basis [3].
Training on community patrol and SMART reports in Khmer provides information on safety and security for patrol teams [3].
3. Community infrastructure and health initiatives:

The project supports various community infrastructure projects, including road repair, bridge construction, and installation of road drainage [4].
Health-related activities include installation of pump wells, piped water systems, construction of toilets, mobile health clinics, and community funds for health emergencies [4].
4. Monitoring and risk management:

There is a clear plan for monitoring community-related High Conservation Values (HCVs), including demographic and socioeconomic monitoring [5].
The project has developed specific guidance for managing risks with local communities during the COVID-19 pandemic [6].
5. Workplace health and safety:

Staff are required to inform project management of unsafe conditions, illnesses, or injuries for prompt remedial action [7].
WCS is committed to providing a safe working environment for all [2].
These measures demonstrate a comprehensive approach to community health, safety, and security, justifying the 'Satisfactory' rating.`,
        },
      },
      {
        id: 'labour-rights',
        name: 'Risk 4: Labour rights of working conditions',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
        ai: {
          title: 'Labour rights of working conditions',
          response: `The answer 'Satisfactory' is based on the following evidence from the provided sources:

1. The project adheres to relevant labour laws and regulations. Government employees are covered by their ministries' employment conditions, which are assumed to comply with all relevant laws and policies [1].

2. For NGO partner staff, labour rights and working conditions are governed by the Labor Law (1997), employment contracts, and WCS's Internal Policies and Regulations. These policies meet or exceed legal requirements [2].

3. All staff receive copies of their employment contracts, outlining their rights and referencing other relevant documents such as the WCS Human Resources Manual [2].

4. The project complies with Article 12 of the Labor Law, which prohibits discrimination based on various factors including race, religion, sex, age, and disability [3] [4].

5. The monitoring report confirms that the project is in compliance with relevant labour laws and regulations [5].

6. The verification process included monitoring and interviewing activities, which were found to have a very low level of risk for legal non-compliance [6].

7. During site inspections, the audit team agreed that a system is in place to ensure labour laws are respected during project implementation [6].

These points demonstrate that the project has taken appropriate measures to ensure fair and legal labour practices, justifying a 'Satisfactory' rating for labour rights and working conditions.`,
        },
      },
      {
        id: 'cultural-heritage',
        name: 'Risk 5: Cultural Heritage',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
        ai: {
          title: 'Cultural heritage',
          response: `The answer 'Satisfactory' is based on the following evidence from the provided document sources:

1. Cultural heritage sites have been identified and mapped. [1] [2] [3] [4]

2. The project has implemented interventions to protect cultural heritage:

Village level land-use planning to map and protect spiritual sites [5]
Law enforcement to protect spiritual sites from outside threats [5] [6]
Appropriate zoning of the KSWS that recognizes spiritual sites [6]
3. The project recognizes the importance of cultural heritage to local communities:

19 out of 20 villages are predominantly ethnic Bunong with strong cultural links to the forest [1] [2] [3] [4]
Culturally important areas such as 'spirit forests', 'spirit pools', and grave forests have been identified [1] [2] [3] [4]
4. There are ongoing efforts to maintain and protect cultural heritage:

Socio-economic monitoring and involvement of indigenous communities in remote sensing and threats monitoring [7]
Awareness raising about the cultural and historical importance of these areas with relevant authorities [8]
5. The project aims to increase security and productivity of natural resources to support local livelihoods, which aligns with preserving cultural heritage [5]

These actions demonstrate a satisfactory approach to identifying, protecting, and managing cultural heritage in the project area, in line with the requirements outlined in the question context.`,
        },
      },
      {
        id: 'indigenous-people',
        name: 'Risk 6: Indigenous People and Local Communities (IPLCs)',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
        ai: {
          title: 'Indigenous people and local communities (IPLCs)',
          response: `The answer 'Satisfactory' is based on the following evidence from the provided document sources:

1. The project actively supports Indigenous Communal Land Titling (ICT) process, which aligns with respecting the rights of Indigenous Peoples to land and territories [1] [2].

2. Free, Prior and Informed Consent (FPIC) is acknowledged as a right for indigenous peoples, as enshrined in the UN Declaration on the Rights of Indigenous Peoples [3].

3. The project involves full participation of indigenous communities in decision-making and implementation [4].

4. Efforts are made to conserve the culture and tradition of indigenous communities within protected areas [5] [6].

5. The project supports sustainable livelihoods for local communities [3] [5].

6. Specific guidance has been produced to protect the rights of Indigenous Peoples and Local Communities during the COVID-19 pandemic [7].

7. The project addresses potential risks and conflicts in the ICT process, ensuring marginalized groups are accounted for [8].

8. There is evidence of ongoing support and successful outcomes in the ICT process, with multiple communities either obtaining or in the process of obtaining ICTs [1] [9] [2].

These points demonstrate that the project is actively working to respect and protect the rights, lands, and cultures of Indigenous Peoples and Local Communities, while ensuring their participation and consent in project activities.`,
        },
      },
      {
        id: 'land-acquisition',
        name: 'Risk 7: Land acquisition, displacement and resettlement',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
        ai: {
          title: 'Land acquisition, displacement and resettlement',
          response: `Based on the provided document sources, there is insufficient information to conclusively determine whether the land acquisition, displacement, and resettlement practices are satisfactory or unsatisfactory. The sources present a mixed picture:

The project claims no involuntary relocations of legitimate occupants are anticipated [1] [2] [3].
However, there are concerns about potential land alienation, especially for vulnerable indigenous families [4] [5].
The project acknowledges that illegal settlers may be removed without compensation [1] [2] [3].
There are mentions of land insecurity, potential dispossession, and conflicts due to land concessions [4].
Some land allocation policies are mentioned, but their impact on the project area is unclear [6].
Given these conflicting points and the lack of comprehensive information on how the project addresses all aspects of land acquisition, displacement, and resettlement (especially regarding informed consent, compensation schemes, and livelihood restoration), further investigation is necessary to make a definitive assessment.`,
        },
      },
      {
        id: '7',
        name: 'Risk 8: Corruption',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '8',
        name: 'Risk 9: Economic impact and community welfare',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '9',
        name: 'Risk 10: Climate change and disaster risks',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '10',
        name: 'Risk 11: Resource efficiency and pollution prevention ; Energy',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '11',
        name: 'Risk 12: Water',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '12',
        name: 'Risk 13: Biodiversity conservation and sustainable natural resource management',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '13',
        name: 'Risk 14: Additionality',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '14',
        name: 'Risk 15: Permanence',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '15',
        name: 'Risk 16: Robust quantification of emission reductions and removals',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: '16',
        name: 'Risk 17: Sustainable development benefits and safeguards',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
    ],
  },
  kycAssessment: {
    status: 'not started',
    progress: 0,
  },
  activities: [
    {
      id: 0,
      name: 'Wesley Oxenham',
      date: 'Yesterday at 2:20PM',
      description: 'Wesley commented on project-development-document.pdf',
    },
    {
      id: 1,
      name: 'Kopal Agarwal',
      date: 'Yesterday at 10:10AM',
      description: 'Kopal Agarwal added 1 new collaborator',
    },
    {
      id: 2,
      name: 'Kopal Agarwal',
      date: 'January 24 2025 at 9:00AM',
      description: 'Kopal Agarwal assigned ESG workflow to Kopal',
    },
    {
      id: 3,
      name: 'Poyan Rajamand',
      date: 'January 20 2025 at 2:00PM',
      description:
        'Poyan Rajamand updated projectcreditingEndDate, creditingStartDate, Sustainable Development Goals',
    },
  ],
};

const PROJECT_ID_2749: Project = {
  id: '2749',
  imgUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img4-UrkZ149VDfMIABrNp31VGcI3xAFNqL.png',
  mapUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/rwanda-b5FqCRhKz4ZNo5c1bP9uVG0bIj8fU6.png',
  name: 'DelAgua Clean Cooking Grouped Project',
  country: 'RW',
  countryName: 'Rwanda',
  lastUpdated: 'January 6, 2025',
  tags: [
    { value: 'Verra', type: 'VERRA' },
    { value: '2749', type: 'VERRA' },
    { value: '3.9m tCO₂e', type: 'MANUAL' },
    { value: 'Nature-based', type: 'MANUAL' },
    { value: 'Verified', type: 'MANUAL' },
  ],
  creditingStartDate: '12/31/2018',
  creditingEndDate: '12/30/2025',
  proponent:
    'DelAgua Health Rwanda (Voluntary) Limited, Freeport, Bahamas, +352 661 939 304, vcsprojects@delagua.org www.delagua.org',
  background:
    'DelAgua clean cooking project is a voluntary Grouped Project (“GP”) aimed at distributing fuel efficient improved cookstoves (ICS) to local communities in Rwanda. The Improved Cooking Stove will reduce the firewood usage and the time & efforts required for cooking. The improved stoves are expected to generate an annual average of 4,485,674 VCUs in its first crediting period.',
  latitude: '-1.935114',
  longitude: '30.082111',
  createdBy: 'Wesley Oxenham',
  owner: 'Wesley Oxenham',
  collaborators: ['Wesley Oxenham', 'Kopal Agarwal', 'Poyan Rajamand'],
  registryStatus: 'Registered',
  sourceType: 'Verra',
  projectType: 'Nature-Based',
  estimatedAnnualCredits: {
    formatted: '545,712',
    value: 545712,
    unit: 'tons',
  },
  methodology: 'VMR0006',
  projectArea: {
    formatted: '',
    value: null,
    unit: 'hectares',
  },
  sdgs: [1, 3, 4, 5, 7, 8, 13, 15],
  financialAssessment: {
    status: 'in progress',
    progress: 10,
    projectValue: {
      formatted: '',
      value: null,
      unit: 'USD',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductions: {
      formatted: '',
      value: null,
      unit: 'tCO₂e',
      sources: [],
      qatalystGenerated: false,
    },
    totalEstimatedReductions: {
      formatted: '3,941,567',
      value: 3941567,
      unit: 'tCO₂e',
      sources: [
        {
          name: 'test source 1',
          url: '#Source-1',
        },
        {
          name: 'test source 1',
          url: '#Source-1',
        },
        {
          name: 'test source 1',
          url: '#Source-1',
        },
        {
          name: 'test source 1',
          url: '#Source-1',
        },
        {
          name: 'test source 1',
          url: '#Source-1',
        },
        {
          name: 'test source 1',
          url: '#Source-1',
        },
      ],
      qatalystGenerated: true,
    },
    projectDuration: {
      formatted: '21',
      value: 621,
      unit: 'Years',
      sources: [{ name: 'Source-1', url: '#Source-1' }],
      qatalystGenerated: true,
    },
    projectArea: {
      formatted: '',
      value: null,
      unit: 'Hectares',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductionsPerUnitAreaPerYear: {
      formatted: '2.11',
      value: 2.11,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductionsPerUnitArea: {
      formatted: '126.79',
      value: 126.79,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    landAcquisitionCost: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    landPerUnitAreaCost: {
      formatted: '',
      value: null,
      unit: 'kUSD/Hectare',
      sources: [],
      qatalystGenerated: false,
    },
    plantationEstablishmentMaintenanceCost: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfGoodsSold: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    overheads: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    totalGrossCosts: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    alternateRevenueSources: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfFinancing: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    tax: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
  },
  esgAssessment: {
    status: 'in progress',
    progress: 35,
    risks: [
      {
        id: 0,
        name: 'Risk 1: Human Rights	',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
        ],
      },
      {
        id: 1,
        name: 'Risk 2: Gender Equality',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 1',
            url: '#source-1',
          },
        ],
      },
      {
        id: 2,
        name: 'Risk 3: Community health, safety and security',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
          {
            name: 'source 5',
            url: '#source-5',
          },
          {
            name: 'source 6',
            url: '#source-6',
          },
          {
            name: 'source 7',
            url: '#source-7',
          },
        ],
      },
      {
        id: 3,
        name: 'Risk 4: Labour rights of working conditions',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 4,
        name: 'Risk 5: Cultural Heritage',
      },
      {
        id: 5,
        name: 'Risk 6: Indigenous People and Local Communities (IPLCs)',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 6,
        name: 'Risk 7: Land acquisition, displacement and resettlement',
      },
      {
        id: 7,
        name: 'Risk 8: Corruption',
      },
      {
        id: 8,
        name: 'Risk 9: Economic impact and community welfare',
      },
      {
        id: 9,
        name: 'Risk 10: Climate change and disaster risks',
      },
      {
        id: 10,
        name: 'Risk 11: Resource efficiency and pollution prevention ; Energy',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 11,
        name: 'Risk 12: Water',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 12,
        name: 'Risk 13: Biodiversity conservation and sustainable natural resource management',
        qatalystResponse: QATALYST_RESPONSE.UNSATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 13,
        name: 'Risk 14: Additionality',
      },
      {
        id: 14,
        name: 'Risk 15: Permanence',
      },
      {
        id: 15,
        name: 'Risk 16: Robust quantification of emission reductions and removals',
      },
      {
        id: 16,
        name: 'Risk 17: Sustainable development benefits and safeguards',
      },
    ],
  },
  kycAssessment: {
    status: 'not started',
    progress: 0,
  },
  activities: [
    {
      id: 0,
      date: 'Yesterday at 2:20PM',
      description: 'Wesley commented on project-development-document.pdf',
    },
    {
      id: 1,
      date: 'Yesterday at 10:10AM',
      description: 'Kopal commented on project-development-document.pdf',
    },
  ],
};

const PROJECT_ID_4811: Project = {
  id: '4811',
  imgUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img1-cR4Tlqih35QOMhPnC8AIH1BYoqRqPC.png',
  mapUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/madagascar-PVcyan3NOgfou1ps9QiKAOXax5VUns.png',
  name: 'Madagascar Improved Cook Stove Project by KCM-Wood#CPA-W-030',
  country: 'MD',
  countryName: 'Madagascar',
  lastUpdated: 'January 6, 2025',
  tags: [
    { value: 'Verra', type: 'VERRA' },
    { value: '4811', type: 'VERRA' },
    { value: '8.2m tCO₂e', type: 'MANUAL' },
    { value: 'Cookstove', type: 'MANUAL' },
    { value: 'Verified', type: 'MANUAL' },
  ],
  creditingStartDate: '04/20/2022',
  creditingEndDate: '04/19/2032',
  proponent:
    'Korea Carbon Management Ltd, Seoul, South Korea +82234876050 info@korea-carbon.com',
  background:
    'The main purpose of this CPA is dissemination of the efficient improved cooking stove woody biomass-based ICS to the rural household of Madagascar. The ICS will burn wood more efficiently thereby improving thermal transfer to pots, which will result in reduced firewood consumption, hence saving fuel. This will not only halt the rapidly progressing deforestation in Madagascar but will also reduce health hazards from indoor smoke pollution and women and children will have to spend less time collecting firewood. Therefore, this will lead to climate change mitigation in a sustainable manner. Overall objectives are reduction of greenhouse gases, conservation of forests and woodlands as well as improved health conditions of ICS users due to improved indoor air quality.',
  latitude: '-22.41666',
  longitude: '47.866663',
  createdBy: 'Wesley Oxenham',
  owner: 'Wesley Oxenham',
  collaborators: ['Wesley Oxenham', 'Kopal Agarwal', 'Poyan Rajamand'],
  registryStatus: 'Registration and verification approval requested',
  sourceType: 'Verra',
  projectType: 'Cookstove',
  estimatedAnnualCredits: {
    formatted: '37,950',
    value: 37950,
    unit: 'tons',
  },
  methodology: 'AMS-II.G.',
  projectArea: {
    formatted: '166,983',
    value: 166983,
    unit: 'hectares',
  },
  sdgs: [],
  financialAssessment: {
    status: 'in progress',
    progress: 20,
    projectValue: {
      formatted: '12,155',
      value: 12155,
      unit: 'USD',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductions: {
      formatted: '21,171,578',
      value: 21171578,
      unit: 'tCO₂e',
      sources: [
        {
          name: 'test source 1',
          url: '#Source-1',
        },
        {
          name: 'test source 2',
          url: '#Source-2',
        },
      ],
      qatalystGenerated: true,
    },
    totalEstimatedReductions: {
      formatted: '21,171,578',
      value: 21171578,
      unit: 'tCO₂e',
      sources: [
        {
          name: 'test source 1',
          url: '#Source-1',
        },
      ],
      qatalystGenerated: true,
    },
    projectDuration: {
      formatted: '60',
      value: 60,
      unit: 'Years',
      sources: [{ name: 'Source-1', url: '#Source-1' }],
      qatalystGenerated: true,
    },
    projectArea: {
      formatted: '166,983',
      value: 166983,
      unit: 'Hectares',
      sources: [
        { name: 'Source-1', url: '#Source-1' },
        { name: 'Source-1', url: '#Source-1' },
        { name: 'Source-1', url: '#Source-1' },
        { name: 'Source-1', url: '#Source-1' },
      ],
      qatalystGenerated: true,
    },
    estimatedReductionsPerUnitAreaPerYear: {
      formatted: '2.11',
      value: 2.11,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductionsPerUnitArea: {
      formatted: '126.79',
      value: 126.79,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    landAcquisitionCost: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    landPerUnitAreaCost: {
      formatted: '',
      value: null,
      unit: 'kUSD/Hectare',
      sources: [],
      qatalystGenerated: false,
    },
    plantationEstablishmentMaintenanceCost: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfGoodsSold: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    overheads: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    totalGrossCosts: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    alternateRevenueSources: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfFinancing: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    tax: {
      formatted: '51,253',
      value: 51253,
      unit: 'kUSD',
      sources: [
        { name: 'Source-1', url: '#Source-1' },
        { name: 'Source-1', url: '#Source-1' },
      ],
      qatalystGenerated: true,
    },
  },
  esgAssessment: {
    status: 'not started',
    progress: 0,
    risks: [
      {
        id: 0,
        name: 'Risk 1: Human Rights	',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
        ],
      },
      {
        id: 1,
        name: 'Risk 2: Gender Equality',
      },
      {
        id: 2,
        name: 'Risk 3: Community health, safety and security',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
          {
            name: 'source 5',
            url: '#source-5',
          },
          {
            name: 'source 6',
            url: '#source-6',
          },
          {
            name: 'source 7',
            url: '#source-7',
          },
        ],
      },
      {
        id: 3,
        name: 'Risk 4: Labour rights of working conditions',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 4,
        name: 'Risk 5: Cultural Heritage',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 5,
        name: 'Risk 6: Indigenous People and Local Communities (IPLCs)',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 6,
        name: 'Risk 7: Land acquisition, displacement and resettlement',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 7,
        name: 'Risk 8: Corruption',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 8,
        name: 'Risk 9: Economic impact and community welfare',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 9,
        name: 'Risk 10: Climate change and disaster risks',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 10,
        name: 'Risk 11: Resource efficiency and pollution prevention ; Energy',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 11,
        name: 'Risk 12: Water',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 12,
        name: 'Risk 13: Biodiversity conservation and sustainable natural resource management',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 13,
        name: 'Risk 14: Additionality',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 14,
        name: 'Risk 15: Permanence',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 15,
        name: 'Risk 16: Robust quantification of emission reductions and removals',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 16,
        name: 'Risk 17: Sustainable development benefits and safeguards',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
    ],
  },
  kycAssessment: {
    status: 'not started',
    progress: 0,
  },
  activities: [
    {
      id: 0,
      date: 'Yesterday at 2:20PM',
      description: 'Wesley commented on project-development-document.pdf',
    },
    {
      id: 1,
      date: 'Yesterday at 10:10AM',
      description: 'Kopal commented on project-development-document.pdf',
    },
  ],
};

const PROJECT_ID_3: Project = {
  id: '3',
  imgUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img3-j6vAiE1rqQszvX6r6CIkvt4vYOIYfq.png',
  name: 'Sustainable Agriculture Project',
  country: 'BR',
  countryName: 'Brazil',
  lastUpdated: 'Jun 15, 2023',
  tags: [
    { value: 'Verra', type: 'VERRA' },
    { value: '2100', type: 'VERRA' },
    { value: '5.7m tCO₂e', type: 'MANUAL' },
    { value: 'Agriculture', type: 'MANUAL' },
    { value: 'In Progress', type: 'MANUAL' },
  ],
  owner: 'Maria Santos',
  // financialStatus: 'In Progress',
  // financialProgress: 50,
  // esgStatus: 'Not Started',
  // esgProgress: 25,
  // kycStatus: 'In Progress',
  // kycProgress: 50,

  // id: '1650',
  // imgUrl:
  //   'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img2-Pesg4thDgdnsXKVZ2eMbgqK6e5jckg.png',
  // name: 'Reduced Emissions from Deforestation and Degradation in Keo Seima Wildlife Sanctuary',
  // country: 'KH',
  // countryName: 'Cambodia',
  // lastUpdated: 'January 14, 2025',
  // tags: [
  //   { value: 'Verra', type: 'VERRA' },
  //   { value: '1650', type: 'VERRA' },
  //   { value: '15.3m tCO₂e', type: 'MANUAL' },
  //   { value: 'Nature-based', type: 'MANUAL' },
  //   { value: 'Verified', type: 'MANUAL' },
  // ],
  creditingStartDate: '12/31/2009',
  creditingEndDate: '12/30/2069',
  proponent: 'Royal Government of Cambodia (RGC), Ministry of Environment',
  background:
    "Nestled in the lush jungles of eastern Cambodia, the Keo Seima Wildlife Sanctuary (KSWS) is a haven for biodiversity and a vast storehouse of forest carbon. Spanning over 290,000 hectares, the protected area is home to a diverse array of wildlife, including 84 globally threatened species and the world's largest population of black-shanked douc and yellow-cheeked crested gibbon. The KSWS also holds a unique cultural significance for the Indigenous Bunong people, who have called this forest home for centuries and whose culture and livelihoods are deeply entwined with the forest. Despite the importance of this area, it faces a high threat of deforestation due to various factors, including forest conversion for agriculture and illegal logging." +
    'The Keo Seima Wildlife Sanctuary REDD+ Project (KSWS REDD+), launched in 2010 as a collaboration between the Royal Government of Cambodia (RGC) and the Wildlife Conservation Society (WCS), has made impressive strides in reducing deforestation and promoting alternative livelihoods. The project has prevented the release of more than 20 million tons of CO2e emissions and saved 25,000 hectares of forest from destruction. It has also created jobs, supported education and training initiatives, and established an ecotourism venture that supports local communities.' +
    'The project has also distributed nearly $1 million through its Cash for Communities (C4C) program, a mechanism that shares the revenue of carbon credits sales. These funds go directly to local communities, who decide how they should be spent to support sustainable development activities such as healthcare, education, and infrastructure like wells and bridges.' +
    "In Cambodia, the Ministry of Environment is at the forefront of protecting the country's protected areas, with a focus on preserving the nation's forests. The WCS is a leading global conservation organization operating in 60+ countries and brings its extensive knowledge and experience in conservation to the project.",
  latitude: '12.314823',
  longitude: '106.684903',
  createdBy: 'Wesley Oxenham',
  // owner: 'Kopal Agarwal',
  collaborators: ['Kopal Agarwal', 'Poyan Rajamand', 'Wesley Oxenham'],
  registryStatus: 'Registered',
  projectType: 'Nature-based',
  sourceType: 'Verra',
  estimatedAnnualCredits: {
    formatted: '1,426,648',
    value: 1426648,
    unit: 'tons',
  },
  methodology: 'VM0015',
  projectArea: {
    formatted: '166,983',
    value: 166983,
    unit: 'hectares',
  },
  sdgs: [],
  financialAssessment: {
    status: 'not started',
    progress: 0,
    projectValue: {
      formatted: '',
      value: null,
      unit: 'USD',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductions: {
      formatted: '',
      value: null,
      unit: 'tCO₂e',
      sources: [],
      qatalystGenerated: false,
    },
    totalEstimatedReductions: {
      formatted: '',
      value: null,
      unit: 'tCO₂e',
      sources: [],
      qatalystGenerated: false,
    },
    projectDuration: {
      formatted: '',
      value: null,
      unit: 'Years',
      sources: [],
      qatalystGenerated: false,
    },
    projectArea: {
      formatted: '',
      value: null,
      unit: 'Hectares',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductionsPerUnitAreaPerYear: {
      formatted: '',
      value: null,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductionsPerUnitArea: {
      formatted: '',
      value: null,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    landAcquisitionCost: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    landPerUnitAreaCost: {
      formatted: '',
      value: null,
      unit: 'kUSD/Hectare',
      sources: [],
      qatalystGenerated: false,
    },
    plantationEstablishmentMaintenanceCost: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfGoodsSold: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    overheads: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    totalGrossCosts: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    alternateRevenueSources: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfFinancing: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    tax: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: true,
    },
  },
  esgAssessment: {
    status: 'not started',
    progress: 0,
  },
  kycAssessment: {
    status: 'not started',
    progress: 0,
  },
};

const PROJECT_ID_4: Project = {
  id: '4',
  imgUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/ocean-cleanup-FhzOYjUWrAeSk6Dp0TldJMPU0Mo1xW.jpeg',
  mapUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/japan-DmvMxQoxpVeevVq7WskUa1QnQueygN.png',
  name: 'Ocean Cleanup Initiative',
  country: 'JP',
  countryName: 'Japan',
  lastUpdated: 'Sep 28, 2023',
  tags: [
    { value: 'Verra', type: 'VERRA' },
    { value: '1800', type: 'VERRA' },
    { value: '3.4m tCO₂e', type: 'MANUAL' },
    { value: 'Marine', type: 'MANUAL' },
    { value: 'Verified', type: 'MANUAL' },
  ],
  owner: 'Jane Smith',
  creditingStartDate: '01/01/2020',
  creditingEndDate: '12/31/2030',
  proponent: 'Department of Energy, Japan',
  background:
    'The Renewable Energy Project aims to reduce greenhouse gas emissions by promoting the use of clean energy sources. Located in Japan, this project focuses on the development and implementation of solar and wind power technologies. By investing in renewable energy, we can decrease our reliance on fossil fuels and mitigate the impact of climate change.' +
    "This project has already made significant strides in reducing carbon emissions, with a total of 1 million tons of CO2e saved to date. The project's success is attributed to the collaborative efforts of the Department of Energy, Japan, and Green Energy Corporation, ensuring a sustainable future for generations to come.",
  latitude: '37.7749',
  longitude: '-122.4194',
  createdBy: 'John Doe',
  collaborators: ['Jane Smith', 'Bob Johnson', 'John Doe'],
  registryStatus: 'Registered',
  projectType: 'Nature-based',
  sourceType: 'Verra',
  estimatedAnnualCredits: {
    formatted: '1,000,000',
    value: 1000000,
    unit: 'tons',
  },
  methodology: 'VM0001',
  projectArea: {
    formatted: '100,000',
    value: 100000,
    unit: 'hectares',
  },
  sdgs: [7, 13],
  financialAssessment: {
    status: 'not started',
    progress: 0,
    projectValue: {
      formatted: '',
      value: null,
      unit: 'USD',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductions: {
      formatted: '',
      value: null,
      unit: 'tCO₂e',
      sources: [],
      qatalystGenerated: false,
    },
    totalEstimatedReductions: {
      formatted: '',
      value: null,
      unit: 'tCO₂e',
      sources: [],
      qatalystGenerated: false,
    },
    projectDuration: {
      formatted: '',
      value: null,
      unit: 'Years',
      sources: [],
      qatalystGenerated: false,
    },
    projectArea: {
      formatted: '',
      value: null,
      unit: 'Hectares',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductionsPerUnitAreaPerYear: {
      formatted: '',
      value: null,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    estimatedReductionsPerUnitArea: {
      formatted: '',
      value: null,
      unit: 'tCO₂e/Hectare/Year',
      sources: [],
      qatalystGenerated: false,
    },
    landAcquisitionCost: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    landPerUnitAreaCost: {
      formatted: '',
      value: null,
      unit: 'kUSD/Hectare',
      sources: [],
      qatalystGenerated: false,
    },
    plantationEstablishmentMaintenanceCost: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfGoodsSold: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    overheads: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    totalGrossCosts: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    alternateRevenueSources: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    costOfFinancing: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: false,
    },
    tax: {
      formatted: '',
      value: null,
      unit: 'kUSD',
      sources: [],
      qatalystGenerated: true,
    },
  },
  esgAssessment: {
    status: 'not started',
    progress: 0,
    risks: [
      {
        id: 0,
        name: 'Risk 1: Human Rights	',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
        ],
      },
      {
        id: 1,
        name: 'Risk 2: Gender Equality',
      },
      {
        id: 2,
        name: 'Risk 3: Community health, safety and security',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
          {
            name: 'source 5',
            url: '#source-5',
          },
          {
            name: 'source 6',
            url: '#source-6',
          },
          {
            name: 'source 7',
            url: '#source-7',
          },
        ],
      },
      {
        id: 3,
        name: 'Risk 4: Labour rights of working conditions',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 4,
        name: 'Risk 5: Cultural Heritage',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 5,
        name: 'Risk 6: Indigenous People and Local Communities (IPLCs)',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 6,
        name: 'Risk 7: Land acquisition, displacement and resettlement',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 7,
        name: 'Risk 8: Corruption',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 8,
        name: 'Risk 9: Economic impact and community welfare',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 9,
        name: 'Risk 10: Climate change and disaster risks',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 10,
        name: 'Risk 11: Resource efficiency and pollution prevention ; Energy',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 11,
        name: 'Risk 12: Water',
        qatalystResponse: QATALYST_RESPONSE.INVESTIGATE,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 12,
        name: 'Risk 13: Biodiversity conservation and sustainable natural resource management',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 13,
        name: 'Risk 14: Additionality',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 14,
        name: 'Risk 15: Permanence',
        qatalystResponse: QATALYST_RESPONSE.SATISFACTORY,
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 15,
        name: 'Risk 16: Robust quantification of emission reductions and removals',
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
      {
        id: 16,
        name: 'Risk 17: Sustainable development benefits and safeguards',
        sources: [
          {
            name: 'source 1',
            url: '#source-1',
          },
          {
            name: 'source 2',
            url: '#source-2',
          },
          {
            name: 'source 3',
            url: '#source-3',
          },
          {
            name: 'source 4',
            url: '#source-4',
          },
        ],
      },
    ],
  },
  kycAssessment: {
    status: 'not started',
    progress: 0,
  },
};

export const getProjectId = (id: string): Project | null => {
  switch (id) {
    case '1650':
      return PROJECT_ID_1650;
    case '4811':
      return PROJECT_ID_4811;
    case '2749':
      return PROJECT_ID_2749;
    case '4':
      return PROJECT_ID_4;
    default:
      return null;
  }
};

export const getInitialMockProjects = () => [
  PROJECT_ID_2749,
  PROJECT_ID_4811,
  PROJECT_ID_4,
];

export const importProject = () => PROJECT_ID_1650;

export const getDocuments = () => [
  {
    id: 0,
    type: 'pdf',
    name: 'KSWS REDD+_VCS CCB MR_2020-2021_v1.9_final.pdf',
    status: 'Ready',
    size: '4MB',
    source: 'Verra',
    date: 'November 24, 2024',
    lastActivity: 'Wesley uploaded this file.',
  },
  {
    id: 1,
    type: 'pdf',
    name: 'PROJ_DESC_1650_29DEC2014.pdf',
    status: 'Ready',
    size: '8MB',
    source: 'Verra',
    date: 'October 16, 2024',
    lastActivity: 'Kopal imported this file.',
  },
  {
    id: 2,
    type: 'pdf',
    name: '1650 Keo Seima REDD Project Exemption Letter_02 Aug 2021.pdf',
    status: 'Ready',
    size: '2MB',
    source: 'Verra',
    date: 'September 21, 2024',
    lastActivity: 'Poyan uploaded this file.',
  },
  {
    id: 3,
    type: 'pdf',
    size: '5MB',
    name: 'Verra_response_request_for_exemption_from_template_requirement_19APR2018.pdf',
    status: 'Ready',
    source: 'Verra',
    date: 'September 21, 2024',
    lastActivity: 'Poyan uploaded this file.',
  },
  {
    id: 4,
    type: 'pdf',
    size: '2MB',
    name: 'CCB_MON_REP_SUM_KHM_DRAFT_1650_01JAN2016_01JAN2018.pdf',
    status: 'Ready',
    source: 'Verra',
    date: 'September 21, 2024',
    lastActivity: 'Poyan uploaded this file.',
  },
];
