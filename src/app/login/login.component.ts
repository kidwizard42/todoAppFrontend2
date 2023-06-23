import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // url = 'https://vast-tor-44253-f8cdd77f2554.herokuapp.com/users/';
  url = 'https://localhost:7028/users/';
  accountDoesNotExist = false;
  majorError = false;

  @ViewChild('loginInput') loginValue!: ElementRef;
  @ViewChild('signInInput') signInValue!: ElementRef;

  constructor(private http: HttpClient) {}

  login() {
    const login = this.loginValue.nativeElement.value;
    // this.loginValue.nativeElement.v
    // return;

    this.http.get(this.url + 'login/' + login).subscribe(
      (response: any) => {
        // Handle the response data
        this.majorError = false;
        console.log(response);

        const data = response;

        if (data.name == null) {
          this.accountDoesNotExist = true;
        } else {
          this.accountDoesNotExist = false;
        }
      },
      (error) => {
        // Handle the error
        console.log('fail');
        console.error(error);
        this.majorError = true;
      }
    );
  }
}

class OwnerSchema {
  id!: number;
  name!: string;
}
