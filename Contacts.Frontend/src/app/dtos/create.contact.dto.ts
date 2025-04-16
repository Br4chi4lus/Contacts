export interface CreateContactDto {
  userId: number;
  name: string;
  categoryId: number;
  subCategoryId?: number;
  subCategoryName?: string;
}
