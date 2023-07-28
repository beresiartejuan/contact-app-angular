import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() name: string = "Nombre completo";
  @Input() image: string = "https://i.pravatar.cc/500?u=clemente.alonzomayorga@peticiones.online";

  ngOnInit(): void {
    if (this.name.length > 15) {
      this.name = this.name.slice(0, 15) + "...";
    }
  }
}
