import { Component, OnInit } from '@angular/core';
import {BookModule} from "../../Module/book.module";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  book: BookModule;
  constructor(private acivateRoute: ActivatedRoute, private bookservice: BooksService, private route: Router) { }

  ngOnInit() {
    this.book = new BookModule('','');

    const id = this.acivateRoute.snapshot.params['id'];
    this.bookservice.getSignleBook(+id).then(
      (book: BookModule) => {
        this.book = book;
      }
    );
  }
  onBack() {
    this.route.navigate(['/books']);
  }


}
