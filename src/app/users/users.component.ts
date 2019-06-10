import { Component, OnInit } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-root",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public users = [];
  public page = 1;
  public noMore = false;
  constructor() {}

  ngOnInit() {
    axios
      .get(`https://api.github.com/users?page=${this.page}`)
      .then(res => {
        this.users = res.data;
        this.page = 2;
        if (res.data.length < 30) {
          this.noMore = true;
        }
      })
      .catch(err => {});
  }
  fetchMore() {
    axios
      .get(`https://api.github.com/users?page=${this.page}`)
      .then(res => {
        this.users = this.users.concat(res.data);
        this.page = this.page + 1;
        if (res.data.length < 30) {
          this.noMore = true;
        }
      })
      .catch(err => {});
  }
}
