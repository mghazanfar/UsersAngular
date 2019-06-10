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
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    axios
      .get(`https://api.github.com/users/${id}`)
      .then(res => {
        this.detail = [res.data];
      })
      .catch(err => {});
  }

  onClick() {
    this.edit = true;
  }

  onCancelEdit() {
    this.edit = false;
  }
}
