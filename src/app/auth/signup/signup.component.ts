import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMassage: String;
  constructor(private formBilder:FormBuilder, private authservice: AuthService, private route: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signupForm = this.formBilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
  }
  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    this.authservice.createNeWUser(email,password).then(
      () => {
        this.route.navigate(['/books']);
      },
      (error) => {
        this.errorMassage = error;
      }
      );
  }

}
