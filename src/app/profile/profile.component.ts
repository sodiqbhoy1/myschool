import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    const users = JSON.parse(localStorage.getItem('registration') || '[]');
    const user = users.find((user: any) => user.username === username);
    if (user) {
      this.userProfile = {
        username: user.username,
        email: user.email,
        name: user.firstname
      };
    }
  }
}
