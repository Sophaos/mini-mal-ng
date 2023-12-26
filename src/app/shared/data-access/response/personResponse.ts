import { Images } from './imageResponse';

export interface Person {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
}
