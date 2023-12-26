import { Entry } from './entryResponse';
import { User } from './userResponse';

export interface GeneralReviewResponse {
  mal_id: number;
  url: string;
  type: string;
  date: string;
  review: string;
  score: number;
  tags: string[];
  is_spoiler: boolean;
  is_preliminary: boolean;
  entry: Entry;
  user: User;
}
