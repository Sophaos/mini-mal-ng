import { DropdownOption } from './DropdownOption';

export interface DropdownData {
  label: string;
  value: string | number;
  param: string;
  type?: string;
  options?: DropdownOption[];
  multi?: boolean;
  change?: (event: string | number, param: string) => void;
}
