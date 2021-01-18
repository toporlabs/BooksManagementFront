import {BookCategoryModel} from './bookCategory.model';

export interface BookModel {
    id: number;
    name: string;
    category: BookCategoryModel;
}
