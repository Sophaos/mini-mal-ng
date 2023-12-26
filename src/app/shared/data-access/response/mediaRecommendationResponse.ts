import { Entry } from './entryResponse';

export interface MediaRecommendationResponse {
  entry: Entry;
  url: string;
  votes: number;
}
