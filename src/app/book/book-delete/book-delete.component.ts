import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

  bookForm!: FormGroup;
  id!: number;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
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
        title: new FormControl(book.title),
        author: new FormControl(book.author),
        description: new FormControl(book.description)
      })
    })
  }

  deleteBook(id: number) {
    if (confirm("Are you sure")) {
      this.bookService.deleteBook(id).subscribe(
        () => {
          alert("Done!");
          this.router.navigate(['/books/list']);
        },
        e => {
          alert("Error!");
          console.log(e);
        }

      )
    }
  }

}
