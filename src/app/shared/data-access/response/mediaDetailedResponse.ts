import { BasicResponse } from './basicResponse';
import { Images } from './imageResponse';

export interface MediaDetailedDataResponse {
  data: MediaDetailedResponse;
}

export interface MediaDetailedResponse {
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
  genres: BasicResponse[];
  themes: BasicResponse[];
  demographics: BasicResponse[];
  relations: Relation[];
  theme: Theme;
  streaming: Streaming[];
}

export interface Title {
  type: string;
  title: string;
}

export interface Aired {
  from: string;
  to: string;
  prop: Prop;
  string: string;
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

export interface Relation {
  relation: string;
  entry: RelationEntry[];
}

export interface Theme {
  openings: string[];
  endings: string[];
}

export interface Streaming {
  name: string;
  url: string;
}

export interface RelationEntry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
