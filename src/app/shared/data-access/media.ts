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
}
