import { Images } from './imageResponse';

export interface Entry {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}
