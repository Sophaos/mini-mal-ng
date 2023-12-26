import { User } from './userResponse';

export interface MediaReviewResponse {
  user: User;
  mal_id: number;
  url: string;
  type: string;
  date: string;
  review: string;
  score: number;
  tags: string[];
  is_spoiler: boolean;
  is_preliminary: boolean;
  episodes_watched: number;
}
