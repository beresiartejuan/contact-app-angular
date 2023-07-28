import { Component, OnInit, Input } from '@angular/core';

interface Person {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
  password: string;
}

interface ResponseApi {
  page: number
  per_page: number
  total: number
  total_pages: number
  results: Person[]
}

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() persons: Person[] = [];

  ngOnInit(): void {
    const result = fetch("https://peticiones.online/api/users")
      .then(response => response.json())
      .then(data => {
        let persons = data.results as Person[];
        this.persons = persons;
        console.log(this.persons);
      });
  }

}
