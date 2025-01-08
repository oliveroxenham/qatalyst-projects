export type Tag = {
  value: string,
  type: string
};

export type Project = {
  id: number,
  imgUrl: string,
  title: string,
  country: string,
  countryName: string,
  tags: Tag[],
  owner: string
  lastUpdated: string
};