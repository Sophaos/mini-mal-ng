import { Entry } from './entryResponse';
import { User } from './userResponse';

export interface GeneralRecommendationResponse {
  mal_id: string;
  entry: Entry[];
  content: string;
  date: string;
  user: User;
}
