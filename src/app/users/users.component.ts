import { Component, OnInit } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-root",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public users = [];
  constructor() {}

  ngOnInit() {
    axios
      .get("https://api.github.com/users?since=135")
      .then(res => {
        this.users = res.data;
      })
      .catch(err => {});
  }
}
