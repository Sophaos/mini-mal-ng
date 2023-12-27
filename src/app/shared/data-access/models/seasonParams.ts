import { SeasonQueryParams } from './seasonQueryParams';

export interface SeasonParams extends SeasonQueryParams {
  year: number | string;
  season: string | string;
}
