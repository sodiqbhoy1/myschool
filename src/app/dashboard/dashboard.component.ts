import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstname: string = '';
  currentTime: string = '';
  greeting: string = '';
  userInfo: { label: string, value: string }[] = [];
  sidebarCollapsed: boolean = false; // Changed to match the HTML

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve user information
    const username = this.route.snapshot.paramMap.get('username');
    const users = JSON.parse(localStorage.getItem('registration') || '[]');
    const user = users.find((user: any) => user.username === username);
    if (user) {
      this.firstname = user.firstname;
      // Add other user info here if necessary
      this.userInfo = [
        { label: 'Username', value: user.username },
        { label: 'Email', value: user.email },
        { label: 'Name', value: `${user.firstname} ${user.lastname}` }
      ];
    }

    // Set greeting and time
    this.updateGreetingAndTime();
    setInterval(() => {
      this.updateGreetingAndTime();
    }, 1000);
  }

  updateGreetingAndTime(): void {
    const hours = new Date().getHours();
    if (hours < 12) {
      this.greeting = 'Good Morning';
    } else if (hours < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
    this.currentTime = new Date().toLocaleTimeString();
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }


  logout() {
    // Prompt the user for confirmation
    const confirmation = window.confirm('Are you sure you want to log out?');
  
    if (confirmation) {
      // If the user confirms, proceed with logout
      localStorage.removeItem('newuser');
      this.router.navigate(['/login']);
    } else {
      // If the user cancels, do nothing
      console.log('Logout cancelled');
    }
  }

}
