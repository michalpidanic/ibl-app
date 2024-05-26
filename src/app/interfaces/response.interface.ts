export interface IReport {
  placeId: string;
  queryType: string;
  receptionTime: string;
  refs: string[];
  reportTime: string;
  reportType: string;
  revision: string;
  stationId: string;
  text: string;
  textHTML: string;
}

export interface IBriefingResponse {
  error: unknown;
  id: string;
  result: IReport[];
}
