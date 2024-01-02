import { BasicDisplayData } from './basicDisplayData';

export interface Media {
  id: number;
  title: string;
  titleEnglish?: string;
  from?: string;
  episodes?: number;
  genres: string[];
  imageSrc: string;
  synopsis: string;
  score: number;
  members: number;
  imageLargeSrc?: string;
  background?: string;
  themes?: string[];
  status?: string;
  demographics?: string[];
  rank?: number;
  popularity?: number;
  favorites?: number;
  year?: number;
  season?: string;
  aired?: string;
  duration?: string;
  type?: string;
  source?: string;
  rating?: string;
  studios?: string[];
  producers?: string[];
  streaming?: string[];
  licensors?: string[];
  openings?: string[];
  endings?: string[];
  relations?: BasicDisplayData[];
}
