import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookCategoryService} from '../../services/book-category.service';

@Component({
  selector: 'app-add-book-category-dialog',
  templateUrl: './add-book-category-dialog.component.html',
  styleUrls: ['./add-book-category-dialog.component.css']
})
export class AddBookCategoryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddBookCategoryDialogComponent>,
    public bookCategoryService: BookCategoryService
  ) {
  }

  formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }

    this.dialogRef.close(this.formGroup.value);
  }
}
