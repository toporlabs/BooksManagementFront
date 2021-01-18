import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routes';
import {AppComponent} from './app.component';
import {BooksListComponent} from './Components/books-list/books-list.component';
import {BookCategoriesListComponent} from './Components/book-categories-list/book-categories-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookService} from './services/book.service';
import {BookCategoryService} from './services/book-category.service';
import {AddBookDialogComponent} from './dialogs/add-book-dialog/add-book-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddBookCategoryDialogComponent} from './dialogs/add-book-category-dialog/add-book-category-dialog.component';
import {ErrorDialogComponent} from './dialogs/error-dialog/error-dialog.component';
import {EditBookDialogComponent} from './dialogs/edit-book-dialog/edit-book-dialog.component';
import {ConfirmDialogComponent} from './dialogs/confirm-dialog/confirm-dialog.component';
import {EditBookCategoryDialogComponent} from './dialogs/edit-book-category-dialog/edit-book-category-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookCategoriesListComponent,
    AddBookDialogComponent,
    AddBookCategoryDialogComponent,
    ErrorDialogComponent,
    EditBookDialogComponent,
    ConfirmDialogComponent,
    EditBookCategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [
    BookService,
    BookCategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
