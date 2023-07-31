import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user_form;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute
  ) {

    this.user_form = formBuilder.group({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      image: ""
    });

  }

  ngOnInit(): void {

    this.router.paramMap.subscribe((params: ParamMap) => {



    });

  }

}
