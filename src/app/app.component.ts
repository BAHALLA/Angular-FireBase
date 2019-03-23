import {Component, OnInit} from '@angular/core';
import * as firebase from "firebase";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
    var config = {
      apiKey: "AIzaSyABrZePjAeQDsDRW892uw7z3chkKOF27jk",
      authDomain: "booksmanager-cb13a.firebaseapp.com",
      databaseURL: "https://booksmanager-cb13a.firebaseio.com",
      projectId: "booksmanager-cb13a",
      storageBucket: "booksmanager-cb13a.appspot.com",
      messagingSenderId: "982024710243"
    };
    firebase.initializeApp(config);
  }

  ngOnInit(): void {
  }

}
