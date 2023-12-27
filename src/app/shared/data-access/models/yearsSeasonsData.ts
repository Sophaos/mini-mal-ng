import { DropdownOption } from './dropdownOption';
import { SeasonData } from './seasonData';

export interface YearsSeasonsData {
  seasonData: SeasonData[];
  yearOptions: DropdownOption[];
}

export const initialYearsSeasonsData: YearsSeasonsData = {
  seasonData: [],
  yearOptions: [],
};
