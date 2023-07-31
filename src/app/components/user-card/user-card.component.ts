import { Component, Input, OnInit } from '@angular/core';
import Person from 'src/app/types/Person';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() name: string = "Nombre completo";
  @Input() image: string = "https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online";
  @Input() person!: Person;
  @Input() id: string = "0";

  ngOnInit(): void {

    this.name = `${this.person.first_name} ${this.person.last_name}`;
    this.image = this.person.image;
    this.id = this.person._id;

    if (this.name.length > 15) {
      this.name = this.name.slice(0, 15) + "...";
    }
  }
}
