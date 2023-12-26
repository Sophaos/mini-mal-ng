import { BasicResponse } from './basicResponse';
import { GenreResponse } from './genreResponse';
import { Images } from './imageResponse';

export interface MediaResponse {
  mal_id: number;
  url: string;
  images: Images;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  producers: BasicResponse[];
  licensors: BasicResponse[];
  studios: BasicResponse[];
  genres: GenreResponse[];
  themes: BasicResponse[];
  demographics: BasicResponse[];
}

export interface Title {
  type: string;
  title: string;
}

export interface Aired {
  from: string;
  to: string;
  prop: Prop;
}

export interface Prop {
  from: From;
  to: To;
  string: string;
}

export interface From {
  day: number;
  month: number;
  year: number;
}

export interface To {
  day: number;
  month: number;
  year: number;
}
