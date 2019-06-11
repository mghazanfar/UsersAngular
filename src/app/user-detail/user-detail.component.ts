import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import axios from "axios";
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  matcher = new MyErrorStateMatcher();
  public detail: { login: string; id: string }[] = [{ login: "", id: "" }];
  public edit: Boolean = false;
  public editedDetail: {
    email: string;
    name: string;
    location: string;
    userType: string;
    avatar_url: string;
    updated_at: string;
    url: string;
  }[] = [
    {
      email: "",
      name: "",
      location: "",
      userType: "",
      avatar_url: "",
      updated_at: "",
      url: ""
    }
  ];
  public emailError: Boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    axios
      .get(`https://api.github.com/users/${id}`)
      .then(res => {
        this.detail = [res.data];
        this.editedDetail = [
          {
            name: res.data.name,
            email: res.data.email,
            location: res.data.location,
            userType: res.data.type,
            avatar_url: res.data.avatar_url,
            updated_at: res.data.updated_at,
            url: res.data.url
          }
        ];
      })
      .catch(err => {});
  }

  onClick() {
    this.edit = true;
  }

  onCancelEdit() {
    this.edit = false;
  }

  onSave() {
    const id = this.route.snapshot.paramMap.get("id");
    window.localStorage.setItem(
      `userDetail${id}`,
      JSON.stringify(this.editedDetail)
    );
    if (!this.emailError) {
      alert(
        `User edited successfully with the following details: ${JSON.stringify(
          this.editedDetail
        )}`
      );
      this.edit = false;
    } else {
      alert("Email is invalid");
    }
  }

  handleChange(e) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let value: string = e.currentTarget.value;
    let name: string = e.srcElement.name;
    if (name === "name") {
      this.editedDetail[0].name = value;
    }
    if (name === "location") {
      this.editedDetail[0].location = value;
    }
    if (name === "userType") {
      this.editedDetail[0].userType = value;
    }
    if (name === "email" && !regex.test(value)) {
      this.emailError = true;
    } else if (name === "email" && regex.test(value)) {
      this.emailError = false;
      this.editedDetail[0].email = value;
    }
  }
}