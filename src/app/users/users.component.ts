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
  public loading = true;
  public search = "";
  public cancel = false;
  public loadingSearch = false;
  public sort = "followers";
  selected = "asc";
  constructor() {}

  ngOnInit() {
    axios
      .get(`https://api.github.com/users?page=${this.page}`)
      .then(res => {
        this.users = res.data;
        this.loading = false;
        this.page = 2;
        if (res.data.length < 30) {
          this.noMore = true;
        }
      })
      .catch(err => {
        this.loading = false;
      });
  }
  cancelSearch() {
    this.loading = true;
    this.cancel = false;
    this.noMore = false;
    this.search = "";
    this.users = [];
    axios
      .get(`https://api.github.com/users?page=${this.page}`)
      .then(res => {
        this.users = res.data;
        this.loading = false;
        this.page = 2;
        if (res.data.length < 30) {
          this.noMore = true;
        }
      })
      .catch(err => {
        this.loading = false;
      });
  }

  fetchMore() {
    this.loading = true;
    axios
      .get(`https://api.github.com/users?page=${this.page}`)
      .then(res => {
        this.users = this.users.concat(res.data);
        this.users = this.users.concat(res.data);
        this.page = this.page + 1;
        this.loading = false;
        if (res.data.length < 30) {
          this.noMore = true;
        }
      })
      .catch(err => {
        this.loading = false;
      });
  }

  handleSearchQuery(event) {
    this.search = event.currentTarget.value;
  }

  searchUsers() {
    if (this.search.length === 0) {
      alert("Search cannot be empty");
    } else {
      this.users = [];
      this.loading = true;
      this.cancel = true;
      let params = {
        q: this.search,
        order: this.selected,
        sort: this.sort
      };
      axios
        .get(`https://api.github.com/search/users`, { params })
        .then(res => {
          this.users = this.users.concat(res.data.items);
          this.loading = false;
          if (res.data.items.length < 31) {
            this.noMore = true;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
}
