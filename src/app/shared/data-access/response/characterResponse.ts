import { Images } from './imageResponse';
import { Person } from './personResponse';

export interface CharacterDataResponse {
  character: CharacterResponse;
  role: string;
  voice_actors: VoiceActor[];
}

export interface CharacterResponse {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
}

export interface VoiceActor {
  person: Person;
  language: string;
}
