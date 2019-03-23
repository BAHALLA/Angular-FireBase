import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {BookModule} from "../../Module/book.module";

@Component({
  selector: 'app-single-form',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.css']
})
export class SingleFormComponent implements OnInit {

  bookForm: FormGroup;

  fileIsUpload = false;
  fileUrl: string;
  fileUploaded= false;

  constructor(private formbuilder: FormBuilder, private bookservice: BooksService, private route: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.bookForm = this.formbuilder.group(
      {
        title: ['', Validators.required],
        auteur: ['', Validators.required]
      }
    );
  }
  onSeaveBook() {
    const title = this.bookForm.get('title').value;
    const auteur = this.bookForm.get('auteur').value;

    const newBook = new BookModule(title,auteur);
    if(this.fileUrl) {
      newBook.bookPhoto = this.fileUrl;
    }
    this.bookservice.createNewBook(newBook);
    this.route.navigate(['/books']);
  }
  onUploadFile(file: File) {
    this.fileIsUpload = true;
    this.bookservice.uploatFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUpload = false;
        this.fileUploaded = true;
      }
    );
  }
  detectFile(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
