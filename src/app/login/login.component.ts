import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  url = 'https://vast-tor-44253-f8cdd77f2554.herokuapp.com/users/';
  // url = 'https://localhost:7028/users/';
  accountDoesNotExist = false;
  majorError = false;
  goToLogin = false;
  accountExists = false;

  @ViewChild('loginInput') loginValue!: ElementRef;
  @ViewChild('signInInput') signInValue!: ElementRef;

  constructor(private http: HttpClient) {}

  login() {
    const login = this.loginValue.nativeElement.value.trim();

    this.http.get(this.url + 'login/' + login).subscribe(
      (response: any) => {
        // Handle the response data
        this.majorError = false;
        console.log(response);

        const data = response;
        console.log(localStorage.getItem('lastname'));

        if (data.name == null) {
          this.accountDoesNotExist = true;
        } else {
          this.accountDoesNotExist = false;
          localStorage.setItem('name', response.name);
          localStorage.setItem('id', response.id);
          // window.location.href = 'http://localhost:4200/content';
          window.location.href =
            'https://vast-tor-44253-f8cdd77f2554.herokuapp.com/content/';
        }
      },
      (error) => {
        // Handle the error
        console.error(error);
        this.majorError = true;
      }
    );
  }

  signUp() {
    const signUp = this.signInValue.nativeElement.value.trim();

    this.http.post(this.url + 'createUser/', { name: signUp }).subscribe(
      (response: any) => {
        // Handle the response data
        this.majorError = false;
        console.log(response);

        const data = response;

        if (data) {
          this.goToLogin = true;
          this.accountExists = false;
        } else {
          this.accountExists = true;
          this.goToLogin = false;
        }
      },
      (error) => {
        // Handle the error
        console.error(error);
        this.majorError = true;
        this.goToLogin = false;
      }
    );
  }
}

class OwnerSchema {
  id!: number;
  name!: string;
}
