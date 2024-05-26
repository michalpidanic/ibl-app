export interface IParams {
  id: string;
  reportTypes: string[];
  stations: string[];
  countries: string[];
}

export interface IRequest {
  id: string;
  method: string;
  params: IParams[];
}
