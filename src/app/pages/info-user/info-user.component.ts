import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Person from 'src/app/types/Person';
import { getContacts, setContacts, getContact, deleteContact } from "../../helpers/storage";

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  @Input() person!: Person;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {

    const self = this;

    this.router.paramMap.subscribe((params: ParamMap) => {
      const id_user = params.get("id");

      if (id_user === null) return;

      getContact(id_user).then((person: Person | undefined) => {

        console.log(person);

        if (typeof person === "undefined") return;

        self.person = person;

      });

    });
  }

  eliminar() {

    deleteContact(this.person._id).then(result => {
      if (result) location.pathname = "/";
    });

  }

}
