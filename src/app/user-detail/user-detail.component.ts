import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId;
  user;
  constructor( 
    private apiService: ApiService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.user = this.apiService.getUserById(this.userId).subscribe((data)=>{
      console.log(data);
      this.user = data;
    });;
  }

}
