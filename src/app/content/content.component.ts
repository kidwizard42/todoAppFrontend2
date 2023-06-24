import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements AfterViewInit {
  url = 'https://vast-tor-44253-f8cdd77f2554.herokuapp.com/users/';
  // url = 'https://localhost:7028/users/';
  @ViewChild('h1') h1!: ElementRef;
  // h1: any;
  name: any;
  id: any;
  notes: any[] = [];

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event);
  }
  ngAfterViewInit() {
    this.h1.nativeElement.innerHTML = 'Welcome: ' + this.name;
  }

  constructor(private http: HttpClient) {
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');

    this.http.get(this.url + this.id).subscribe(
      (response: any) => {
        this.notes = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
