import { User } from './../model/user.model';
import {Router} from "@angular/router";
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList:any = [];
  searchUsername:string ="";
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe((data)=>{
      console.log(data);
      this.userList = data;
    });
  }

  getUser(id: number): void{
    this.router.navigate(['user/' +id]);
  }

  addUser(): void {
    this.router.navigate(['add']);
  };
  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit/' + user.id]);
  };
  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe( data => {
        this.userList = this.userList.filter(u => u !== user);
      })
      Swal.fire({
        icon: 'info',
        title: 'User deleted',
        showConfirmButton: false,
        timer: 1500
      })
  };
}
