import {Component, OnInit} from '@angular/core';
import {BookModel} from '../../models/book.model';
import {Router} from '@angular/router';
import {AddBookModel, BookService, EditBookModel} from '../../services/book.service';
import {MatDialog} from '@angular/material/dialog';
import {AddBookDialogComponent} from '../../dialogs/add-book-dialog/add-book-dialog.component';
import {ErrorDialogComponent} from '../../dialogs/error-dialog/error-dialog.component';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {EditBookDialogComponent} from '../../dialogs/edit-book-dialog/edit-book-dialog.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  public books: BookModel[] = [];
  displayedColumns: string[] = ['name', 'category', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(
    private router: Router,
    private bookService: BookService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(force: boolean = false): void {
    this.bookService.getBooksList(force)
      .subscribe(response => {
        this.books = response;
      });
  }

  reloadBooks(): void {
    this.getBooks(true);
  }

  showCategories(): void {
    this.router.navigate(['./book-categories-list']);
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: errorMessage
    });
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {width: '350px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addBook(result);
      }
    });
  }

  addBook(book: AddBookModel): void {
    this.bookService.createBook(book)
      .subscribe(
        (response) => {
          this.reloadBooks();
        },
        (error) => {
          this.openErrorDialog(error.error.message);
        }
      );
  }

  openEditBookDialog(book: BookModel): void {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {data: {bookId: book.id}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBook(result);
      }
    });
  }

  updateBook(book: EditBookModel): void {
    this.bookService.updateBook(book)
      .subscribe(
        (response) => {
          this.reloadBooks();
        },
        (error) => {
          this.openErrorDialog(error.error.message);
        }
      );
  }

  openDeleteBookDialog(book: BookModel): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {action: 'Deleting a book', name: book.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook(book);
      }
    });
  }

  deleteBook(book: BookModel): void {
    this.bookService.deleteBook(book)
      .subscribe(
        (response) => {
          this.reloadBooks();
        },
        (error) => {
          this.openErrorDialog(error.error.error);
        }
      );
  }
}
