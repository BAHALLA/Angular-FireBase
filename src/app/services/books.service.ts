import { Injectable } from '@angular/core';
import {BookModule} from "../Module/book.module";
import {Subject} from "rxjs";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: BookModule[] = [];
  booksSubject = new Subject<BookModule[]>();
  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }
  getBooks() {
    firebase.database().ref('/books').on(
      'value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
  }
  getSignleBook(id: number) {
    return new Promise(
      (resolve,reject) => {
        firebase.database().ref('/books/'+ id).once('value').then(
          (data) => {
            resolve(data.val());
          },
        (error) => {
            reject(error);
        }
        );
      }
    );
  }
  createNewBook(newBook: BookModule) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  removeBook(bookR: BookModule) {
    if(bookR.bookPhoto) {
      const  storageref = firebase.storage().refFromURL(bookR.bookPhoto);
      storageref.delete().then(
        () => {
          console.log('book supprimée !!');
        }
      ).catch(
        (error) => {
          console.log('error : '+error);
        }
      );
    }
    const bookIndex = this.books.findIndex(
      (book) => {
        if(bookR === book)
          return true;
      }
    );

    this.books.splice(bookIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploatFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref().child('/images' +uniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement ...');
          },
          (error) => {
          console.log('error :'+error);
          reject(error);
        },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
          );

      }
    );
}

}
