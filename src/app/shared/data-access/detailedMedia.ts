import { Media } from './media';

export interface DetailedMedia extends Media {
  themes: string[];
  demographics: string[];
  rank: number;
  popularity: number;
  favorites: number;
  year: number;
  season: string;
  aired: string;
  duration: string;
  type: string;
  source: string;
  rating: number;
  studios: string[];
  producers: string[];
  streaming: string[];
  licensors: string[];
}
