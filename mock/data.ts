export function getInitialMockProjects() {
  return [
    {
      id: 1,
      imgUrl:
        'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img1-cR4Tlqih35QOMhPnC8AIH1BYoqRqPC.png',
      title: 'Forest Conservation Project',
      country: 'US',
      countryName: 'United States',
      lastUpdated: 'Jan 4, 2022',
      tags: [
        { value: 'Verra', type: 'VERRA' },
        { value: '1650', type: 'VERRA' },
        { value: '15.3m tCO2e', type: 'MANUAL' },
        { value: 'Nature-based', type: 'MANUAL' },
        { value: 'Verified', type: 'MANUAL' },
      ],
      owner: 'Kopal Agarwal',
      financialStatus: 'In Progress',
      financialProgress: 50,
      esgStatus: 'Not Started',
      esgProgress: 25,
      kycStatus: 'In Progress',
      kycProgress: 75,
    },
    {
      id: 2,
      imgUrl:
        'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img2-Pesg4thDgdnsXKVZ2eMbgqK6e5jckg.png',
      title: 'Renewable Energy Initiative',
      country: 'CA',
      countryName: 'Canada',
      lastUpdated: 'Mar 12, 2023',
      tags: [
        { value: 'Verra', type: 'VERRA' },
        { value: '1200', type: 'VERRA' },
        { value: '8.2m tCO2e', type: 'MANUAL' },
        { value: 'Energy', type: 'MANUAL' },
        { value: 'Verified', type: 'MANUAL' },
      ],
      owner: 'John Smith',
      financialStatus: 'In Progress',
      financialProgress: 50,
      esgStatus: 'Not Started',
      esgProgress: 25,
      kycStatus: 'Eligible',
      kycProgress: 100,
    },
    {
      id: 3,
      imgUrl:
        'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img3-j6vAiE1rqQszvX6r6CIkvt4vYOIYfq.png',
      title: 'Sustainable Agriculture Project',
      country: 'BR',
      countryName: 'Brazil',
      lastUpdated: 'Jun 15, 2023',
      tags: [
        { value: 'Verra', type: 'VERRA' },
        { value: '2100', type: 'VERRA' },
        { value: '5.7m tCO2e', type: 'MANUAL' },
        { value: 'Agriculture', type: 'MANUAL' },
        { value: 'In Progress', type: 'MANUAL' },
      ],
      owner: 'Maria Santos',
      financialStatus: 'In Progress',
      financialProgress: 50,
      esgStatus: 'Not Started',
      esgProgress: 25,
      kycStatus: 'In Progress',
      kycProgress: 50,
    },
  ];
}

export function importProject() {
  return {
    id: 4,
    imgUrl:
      'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img4-UrkZ149VDfMIABrNp31VGcI3xAFNqL.png',
    title: 'Ocean Cleanup Initiative',
    country: 'JP',
    countryName: 'Japan',
    lastUpdated: 'Sep 28, 2023',
    tags: [
      { value: 'Verra', type: 'VERRA' },
      { value: '1800', type: 'VERRA' },
      { value: '3.4m tCO2e', type: 'MANUAL' },
      { value: 'Marine', type: 'MANUAL' },
      { value: 'Verified', type: 'MANUAL' },
    ],
    owner: 'Yuki Tanaka',
    financialStatus: 'In Progress',
    financialProgress: 50,
    esgStatus: 'Not Started',
    esgProgress: 25,
    kycStatus: 'In Progress',
    kycProgress: 85,
  };
}

export function getDocuments() {
  return [
    {
      id: 1,
      type: 'pdf',
      name: 'PROJ_DESC_1650_29DEC2014.pdf',
      status: 'Ready',
      size: '8MB',
      source: 'Verra',
      date: 'October 16, 2024',
      lastActivity: 'Kopal imported file',
    },
  ];
}
