import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  bookForm!: FormGroup;
  id!: number;
  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      this.findBookById(this.id);
    })
  }

  ngOnInit(): void {

  }

  findBookById(id: number) {
    return this.bookService.findBookById(id).subscribe(book => {
        this.bookForm = new FormGroup({
          id: new FormControl(book.id),
          title: new FormControl(book.title, [Validators.required]),
          author: new FormControl(book.author, [Validators.required]),
          description: new FormControl(book.description, [Validators.required])
        })
      }
    )
  }

  updateBook(id: number) {
    const book = this.bookForm.value;
    this.bookService.updateBook(book, id).subscribe(
      () => alert("Update"),
      e => {
        alert("Eror");
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
