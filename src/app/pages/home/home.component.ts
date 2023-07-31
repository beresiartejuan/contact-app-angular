import { Component, OnInit, Input } from '@angular/core';
import Person from 'src/app/types/Person';
import { getContacts, setContacts } from "../../helpers/storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @Input() persons!: Person[];

  ngOnInit(): void {

    getContacts().then((contacts: Person[]) => {
      this.persons = contacts;
      setContacts(this.persons);
    });

  }

}
