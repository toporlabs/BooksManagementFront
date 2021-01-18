import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {BookModel} from '../Models/book.model';
import {Observable, Subscribable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

export interface AddBookModel {
  name: string;
  category_id: number;
}

export interface EditBookModel {
  id: number;
  name: string;
  category_id: number;
}

@Injectable()
export class BookService {

  private books: Observable<BookModel[]>;

  constructor(private http: HttpClient) { }

  getBook(id): Subscribable<BookModel> {
    return this.http.get(ConfigService.API_ENDPOINT + '/books/' + id);
  }

  getBooksList(force: boolean = false): Observable<BookModel[]> {
    if (!this.books || force) {
      this.books = this.http.get<BookModel[]>(ConfigService.API_ENDPOINT + '/books').pipe(shareReplay(1));
    }

    return this.books;
  }

  createBook(book: AddBookModel): Subscribable<BookModel> {
    return this.http.post(ConfigService.API_ENDPOINT + '/books', book);
  }

  deleteBook(book: BookModel): Subscribable<any> {
    return this.http.delete(ConfigService.API_ENDPOINT + '/books/' + book.id);
  }

  updateBook(book: EditBookModel): Subscribable<BookModel> {
    return this.http.put(ConfigService.API_ENDPOINT + '/books/' + book.id, book);
  }
}
