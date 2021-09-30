import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  createBook() {
    const book = this.bookForm.value;
    this.bookService.saveBook(book).subscribe(() => {
      alert("Thêm cuốn sách thành công!");
      this.bookForm.reset();
    },
      e => {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.log(e);
      })
  }

  get title() {
    return this.bookForm.get('title');
  }
  get author() {
    return this.bookForm.get('author');
  }
  get description() {
    return this.bookForm.get('description');
  }

}
