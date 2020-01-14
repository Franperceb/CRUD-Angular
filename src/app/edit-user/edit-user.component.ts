import  Swal  from 'sweetalert2';
import { ApiService } from './../api.service';
import { User } from './../model/user.model';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
   
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required], 
      company: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required]
    });
    this.apiService.getUserById(+userId)
      .subscribe( data => {
        console.log(data)
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
            Swal.fire({
              icon: 'success',
              title: 'User updated',
              showConfirmButton: false,
              timer: 1500
            }) 
            this.router.navigate(['']);
          console.log(data);
        },
        error => {
          alert(error);
        });
  }
}
