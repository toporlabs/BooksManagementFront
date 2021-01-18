import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookCategoryService} from '../../services/book-category.service';
import {BookCategoryModel} from '../../models/bookCategory.model';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})
export class AddBookDialogComponent implements OnInit {

  bookCategories: BookCategoryModel[];

  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    public bookCategoryService: BookCategoryService
  ) {
  }

  formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.bookCategoryService.getBookCategoriesList()
      .subscribe(response => {
        this.bookCategories = response;
      });
  }

  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }

    this.dialogRef.close(this.formGroup.value);
  }
}
