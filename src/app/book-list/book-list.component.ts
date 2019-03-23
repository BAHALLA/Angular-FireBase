import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookModule} from "../Module/book.module";
import {Subscription} from "rxjs";
import {BooksService} from "../services/books.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit ,OnDestroy {

  books: BookModule [];
  booksSubscription: Subscription;

  constructor(private  booksservice: BooksService, private route: Router) { }

  ngOnInit() {
    this.booksSubscription = this.booksservice.booksSubject.subscribe(
      (bookss: BookModule[] ) => {
        this.books = bookss;
      }
    );
    this.booksservice.getBooks();
    this.booksservice.emitBooks();
  }
  onNewBook(){
    this.route.navigate(['/books','new']);
  }
  onDeleteBook(book: BookModule) {
    this.booksservice.removeBook(book);
  }
  onViewBook(id: number) {
    console.log('I am here :'+ id);
    this.route.navigate(['/books','view',id]);
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
