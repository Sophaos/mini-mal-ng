import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';

export const MEDIAS: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
  { value: 'ona', label: 'ONA' },
  { value: 'music', label: 'Music' },
];

export const STATUSES: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'airing', label: 'Airing' },
  { value: 'complete', label: 'Complete' },
  { value: 'upcoming', label: 'Upcoming' },
];

export const RATINGS: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'g', label: 'G - All Ages' },
  { value: 'pg', label: 'PG - Children' },
  { value: 'pg13', label: 'PG-13 - Teens 13 or older' },
  { value: 'r17', label: 'R - 17+ (violence & profanity)' },
  { value: 'r', label: 'R+ - Mild Nudity' },
];

export const ORDERS: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'title', label: 'Title' },
  { value: 'start_date', label: 'Start Date' },
  { value: 'end_date', label: 'End Date' },
  { value: 'episodes', label: 'Episodes' },
  { value: 'score', label: 'Score' },
  { value: 'rank', label: 'Rank' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'favorites', label: 'Favorites' },
];

export const SORTS: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];
