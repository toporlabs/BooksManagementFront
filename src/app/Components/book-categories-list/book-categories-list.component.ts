import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddBookCategoryDialogComponent} from '../../dialogs/add-book-category-dialog/add-book-category-dialog.component';
import {ErrorDialogComponent} from '../../dialogs/error-dialog/error-dialog.component';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {EditBookDialogComponent} from '../../dialogs/edit-book-dialog/edit-book-dialog.component';
import {BookCategoryModel} from '../../models/bookCategory.model';
import {AddBookCategoryModel, BookCategoryService, EditBookCategoryModel} from '../../services/book-category.service';
import {EditBookCategoryDialogComponent} from '../../dialogs/edit-book-category-dialog/edit-book-category-dialog.component';

@Component({
  selector: 'app-book-categories-list',
  templateUrl: './book-categories-list.component.html',
  styleUrls: ['./book-categories-list.component.css']
})
export class BookCategoriesListComponent implements OnInit {

  public bookCategories: BookCategoryModel[] = [];
  displayedColumns: string[] = ['name', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(
    private router: Router,
    private bookCategoryService: BookCategoryService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getBookCategories();
  }

  getBookCategories(force: boolean = false): void {
    this.bookCategoryService.getBookCategoriesList(force)
      .subscribe(response => {
        this.bookCategories = response;
      });
  }

  reloadBookCategories(): void {
    this.getBookCategories(true);
  }

  showBooks(): void {
    this.router.navigate(['./books-list']);
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: errorMessage
    });
  }

  openAddBookCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddBookCategoryDialogComponent, {width: '350px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addBookCategory(result);
      }
    });
  }

  addBookCategory(bookCategory: AddBookCategoryModel): void {
    this.bookCategoryService.createBookCategory(bookCategory)
      .subscribe(
        (response) => {
          this.reloadBookCategories();
        },
        (error) => {
          this.openErrorDialog(error.error.message);
        }
      );
  }

  openEditBookCategoryDialog(bookCategory: BookCategoryModel): void {
    const dialogRef = this.dialog.open(EditBookCategoryDialogComponent, {data: {bookCategoryId: bookCategory.id}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBookCategory(result);
      }
    });
  }

  updateBookCategory(bookCategory: EditBookCategoryModel): void {
    this.bookCategoryService.updateBookCategory(bookCategory)
      .subscribe(
        (response) => {
          this.reloadBookCategories();
        },
        (error) => {
          this.openErrorDialog(error.error);
        }
      );
  }

  openDeleteBookCategoryDialog(bookCategory: BookCategoryModel): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {action: 'Deleting a book category', name: bookCategory.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBookCategory(bookCategory);
      }
    });
  }

  deleteBookCategory(bookCategory: BookCategoryModel): void {
    this.bookCategoryService.deleteBookCategory(bookCategory)
      .subscribe(
        (response) => {
          this.reloadBookCategories();
        },
        (error) => {
          this.openErrorDialog(error.error.error);
        }
      );
  }
}
