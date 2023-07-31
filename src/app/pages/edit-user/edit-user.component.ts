import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { getContact, addContact, setContacts, getContacts } from 'src/app/helpers/storage';
import Person from 'src/app/types/Person';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user_form;
  @Input() is_edit: boolean = false;
  @Input() is_success: boolean | null = null;
  ref_contact: Person | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute
  ) {

    this.user_form = formBuilder.group({
      first_name: [""],
      last_name: [""],
      username: [""],
      email: [""],
      image: [""],
      password: [""]
    });

  }

  editContact() {



  }

  createContact() {

    const self = this;

    const {
      first_name, last_name, email, password, username
    } = this.user_form.value;

    if (!first_name || !last_name || !email || !password || !username) {
      alert("Rellena el formulario!");
      return;
    }

    addContact({
      first_name, last_name, email, password, username
    }).then(new_contact => {

      getContacts().then(all_contacts => {

        all_contacts.push(new_contact);

        setContacts(all_contacts);

        console.log("YA SE GUARDO");

        self.is_success = true;

      });

    });

  }

  onSubmitForm(): void {

    console.log(this.user_form.value);

    console.log("Estas " + (!this.is_edit ? "creando" : "editando") + " un contacto");

    this.is_edit ? this.editContact() : this.createContact();

  }

  ngOnInit(): void {

    const self = this;

    this.router.paramMap.subscribe((params: ParamMap) => {

      const id_user = params.get("id");

      console.log("Hasta ahora estas creando un contacto...");

      if (id_user === null) return;

      console.log("El formulario paso a modo edición");

      getContact(id_user).then((person: Person | undefined) => {

        console.log(person);

        if (typeof person === "undefined") {
          return;
        };

        self.ref_contact = person;

        self.is_edit = true;

        const {
          first_name, last_name, username, email, image, password
        } = self.ref_contact;

        self.user_form.setValue({
          first_name, last_name, username, email, image, password
        });

      });

    });

  }

}
