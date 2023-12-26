import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';

export interface DropdownData {
  label: string;
  value: string | number;
  param: string;
  type?: string;
  options?: DropdownOption[];
  multi?: boolean;
  change?: (event: string | number, param: string) => void;
}
