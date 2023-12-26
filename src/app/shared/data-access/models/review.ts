export interface Review {
  id: number;
  score: number;
  content: string;
  imageSrc: string;
  title: string;
  user: string;
  tags: string[];
  hoursDifference: number;
}
