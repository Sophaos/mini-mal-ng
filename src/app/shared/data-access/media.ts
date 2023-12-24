export interface Media {
  id: number;
  title: string;
  titleEnglish?: string;
  from?: string;
  episodes: number;
  genres: string[];
  imageSrc: string;
  synopsis: string;
  score: number;
  members: number;

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
  rating?: number;
  studios?: string[];
  producers?: string[];
  streaming?: string[];
  licensors?: string[];
}
