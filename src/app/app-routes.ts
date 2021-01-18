import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './Components/books-list/books-list.component';
import { BookCategoriesListComponent } from './Components/book-categories-list/book-categories-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/books-list', pathMatch: 'full' },
    { path: 'book-categories-list', component: BookCategoriesListComponent },
    { path: 'books-list', component: BooksListComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
