import {Component, OnInit, Inject} from '@angular/core';
import {BookCategoryModel} from '../../models/bookCategory.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookCategoryService} from '../../services/book-category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../services/book.service';
import {BookModel} from '../../models/book.model';

export interface EditBookDialogData {
  bookId: number;
}

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.css']
})
export class EditBookDialogComponent implements OnInit {

  bookCategories: BookCategoryModel[];
  book: BookModel;

  constructor(
    public dialogRef: MatDialogRef<EditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editBookData: EditBookDialogData,
    public bookCategoryService: BookCategoryService,
    public bookService: BookService
  ) {
  }

  formGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.bookCategoryService.getBookCategoriesList()
      .subscribe(response => {
        this.bookCategories = response;
      });

    this.bookService.getBook(this.editBookData.bookId)
      .subscribe(response => {
        this.book = response;
        this.formGroup.patchValue({
          id: this.book.id,
          name: this.book.name,
          category_id: this.book.category.id,
        });
      });
  }

  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }

    const formVal = this.formGroup.value;

    if (this.book.name === formVal.name && this.book.category.id === formVal.category_id) {
      this.dialogRef.close();
      return;
    }

    this.dialogRef.close(this.formGroup.value);
  }
}
