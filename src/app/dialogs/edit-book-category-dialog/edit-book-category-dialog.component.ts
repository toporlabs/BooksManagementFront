import {Component, Inject, OnInit} from '@angular/core';
import {BookCategoryModel} from '../../models/bookCategory.model';
import {BookModel} from '../../models/book.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookCategoryService} from '../../services/book-category.service';
import {BookService} from '../../services/book.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EditBookDialogData} from '../edit-book-dialog/edit-book-dialog.component';

export interface EditBookCategoryDialogData {
  bookCategoryId: number;
}

@Component({
  selector: 'app-edit-book-category-dialog',
  templateUrl: './edit-book-category-dialog.component.html',
  styleUrls: ['./edit-book-category-dialog.component.css']
})
export class EditBookCategoryDialogComponent implements OnInit {

  bookCategory: BookCategoryModel;

  constructor(
    public dialogRef: MatDialogRef<EditBookCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editBookCategoryData: EditBookCategoryDialogData,
    public bookCategoryService: BookCategoryService,
  ) {
  }

  formGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.bookCategoryService.getBookCategory(this.editBookCategoryData.bookCategoryId)
      .subscribe(response => {
        this.bookCategory = response
        this.formGroup.patchValue({
          id: this.bookCategory.id,
          name: this.bookCategory.name,
        });
      });
  }

  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }

    const formVal = this.formGroup.value;

    if (this.bookCategory.name === formVal.name) {
      this.dialogRef.close();
      return;
    }

    this.dialogRef.close(this.formGroup.value);
  }
}
