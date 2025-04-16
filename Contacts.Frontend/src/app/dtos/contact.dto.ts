import {UserDto} from "./user.dto";

export interface ContactDto {
  id: number;
  name: string;
  user: UserDto;
  contactCategory: string;
  businessContactSubCategory?: string;
  subCategoryName?: string;
}
