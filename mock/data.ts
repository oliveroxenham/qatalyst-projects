import { QATALYST_RESPONSE } from '@/lib/constants';
import { Project } from '@/types/project';

const PROJECT_ID_1650: Project = {
  id: '1650',
  imgUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img2-Pesg4thDgdnsXKVZ2eMbgqK6e5jckg.png',
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
  collaborators: ['Kopal Agarwal', 'Poyan Ramajand', 'Wesley Oxenham'],
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
  sdgs: [],
  financialAssessment: {
    status: 'not started',
    progress: 0,
    projectValue: {
      formatted: '123,456',
      value: 123456,
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
          url: '#test-source-1',
        },
        {
          name: 'test source 2',
          url: '#test-source-2',
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
          url: '#test-source-1',
        },
      ],
      qatalystGenerated: true,
    },
    projectDuration: {
      formatted: '60',
      value: 60,
      unit: 'Years',
      sources: [{ name: 'test-source-1', url: '#test-source-1' }],
      qatalystGenerated: true,
    },
    projectArea: {
      formatted: '166,983',
      value: 166983,
      unit: 'Hectares',
      sources: [
        { name: 'test-source-1', url: '#test-source-1' },
        { name: 'test-source-1', url: '#test-source-1' },
        { name: 'test-source-1', url: '#test-source-1' },
        { name: 'test-source-1', url: '#test-source-1' },
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
        { name: 'test-source-1', url: '#test-source-1' },
        { name: 'test-source-1', url: '#test-source-1' },
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

const PROJECT_ID_2749: Project = {
  id: '2749',
  imgUrl:
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img1-cR4Tlqih35QOMhPnC8AIH1BYoqRqPC.png',
  name: 'Madagascar Improved Cook Stove Project by KCM-Wood#CPA-W-030',
  country: 'MD',
  countryName: 'Madagascar',
  lastUpdated: 'January 6, 2025',
  tags: [
    { value: 'Verra', type: 'VERRA' },
    { value: '1200', type: 'VERRA' },
    { value: '8.2m tCO₂e', type: 'MANUAL' },
    { value: 'Energy', type: 'MANUAL' },
    { value: 'Verified', type: 'MANUAL' },
  ],
  creditingStartDate: '04/20/2022',
  creditingEndDate: '04/19/2032',
  proponent: 'Korea Carbon Management Ltd, Seoul, South Korea +82234876050 info@korea-carbon.com',
  background:
  "The main purpose of this CPA is dissemination of the efficient improved cooking stove woody biomass-based ICS to the rural household of Madagascar. The ICS will burn wood more efficiently thereby improving thermal transfer to pots, which will result in reduced firewood consumption, hence saving fuel. This will not only halt the rapidly progressing deforestation in Madagascar but will also reduce health hazards from indoor smoke pollution and women and children will have to spend less time collecting firewood. Therefore, this will lead to climate change mitigation in a sustainable manner. Overall objectives are reduction of greenhouse gases, conservation of forests and woodlands as well as improved health conditions of ICS users due to improved indoor air quality.",
  latitude: '-22.41666',
  longitude: '47.866663',
  createdBy: 'Wesley Oxenham',
  owner: 'Wesley Oxenham',
  collaborators: ['Wesley Oxenham', 'Kopal Agarwal', 'Poyan Ramajand'],
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
    status: 'not started',
    progress: 0,
    projectValue: {
      formatted: '123,456',
      value: 123456,
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
          url: '#test-source-1',
        },
        {
          name: 'test source 2',
          url: '#test-source-2',
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
          url: '#test-source-1',
        },
      ],
      qatalystGenerated: true,
    },
    projectDuration: {
      formatted: '60',
      value: 60,
      unit: 'Years',
      sources: [{ name: 'test-source-1', url: '#test-source-1' }],
      qatalystGenerated: true,
    },
    projectArea: {
      formatted: '166,983',
      value: 166983,
      unit: 'Hectares',
      sources: [
        { name: 'test-source-1', url: '#test-source-1' },
        { name: 'test-source-1', url: '#test-source-1' },
        { name: 'test-source-1', url: '#test-source-1' },
        { name: 'test-source-1', url: '#test-source-1' },
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
        { name: 'test-source-1', url: '#test-source-1' },
        { name: 'test-source-1', url: '#test-source-1' },
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
  collaborators: ['Kopal Agarwal', 'Poyan Ramajand', 'Wesley Oxenham'],
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
    'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img4-UrkZ149VDfMIABrNp31VGcI3xAFNqL.png',
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
  owner: 'Yuki Tanaka',
  // financialStatus: 'In Progress',
  // financialProgress: 50,
  // esgStatus: 'Not Started',
  // esgProgress: 25,
  // kycStatus: 'In Progress',
  // kycProgress: 85,

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
  collaborators: ['Kopal Agarwal', 'Poyan Ramajand', 'Wesley Oxenham'],
  registryStatus: 'Registered',
  projectType: 'Cookstove',
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
    case '2749':
      return PROJECT_ID_2749;
    case '3':
      return PROJECT_ID_3;
    case '4':
      return PROJECT_ID_4;
    default:
      return null;
  }
};

export const getInitialMockProjects = () => [
  PROJECT_ID_1650,
  PROJECT_ID_2749,
  PROJECT_ID_3,
];

export const importProject = () => PROJECT_ID_4;

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
];
