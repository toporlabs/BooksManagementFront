import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable, Subscribable, throwError} from 'rxjs';
import {BookCategoryModel} from '../models/bookCategory.model';
import {shareReplay} from 'rxjs/operators';

export interface AddBookCategoryModel {
  name: string;
}

export interface EditBookCategoryModel {
  id: number;
  name: string;
}

@Injectable()
export class BookCategoryService {

  private bookCategories: Observable<BookCategoryModel[]>;

  constructor(private http: HttpClient) { }

  getBookCategory(id): Subscribable<BookCategoryModel> {
      return this.http.get(ConfigService.API_ENDPOINT + '/book-categories/' + id);
  }

  getBookCategoriesList(force: boolean = false): Observable<BookCategoryModel[]> {
    if (!this.bookCategories || force) {
      this.bookCategories = this.http.get<BookCategoryModel[]>(ConfigService.API_ENDPOINT + '/book-categories')
        .pipe(shareReplay(1));
    }

    return this.bookCategories;
  }

  createBookCategory(bookCategory: AddBookCategoryModel): Subscribable<BookCategoryModel> {
    return this.http.post(ConfigService.API_ENDPOINT + '/book-categories/', {name: bookCategory.name});
  }

  deleteBookCategory(bookCategory: BookCategoryModel): Subscribable<any> {
    return this.http.delete(ConfigService.API_ENDPOINT + '/book-categories/' + bookCategory.id);
  }

  updateBookCategory(bookCategory: EditBookCategoryModel): Subscribable<BookCategoryModel> {
    return this.http.put(ConfigService.API_ENDPOINT + '/book-categories/' + bookCategory.id, bookCategory);
  }
}
