import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formbuild: FormBuilder;
  loginform: FormGroup;
  
  constructor (public fb:FormBuilder, public route:Router){
    this.formbuild=fb;
    this.loginform = this.formbuild.group({

email:['', [Validators.required]],

password: ['', [Validators.required]],

    });
  }



  signinBtn ():void {
    const users = JSON.parse(localStorage.getItem('registration') ?? '[]');
    const email = this.loginform.value.email;
    const password = this.loginform.value.password;
    // checks if user exist
const user = users.find((user:any)=>user.email === email && user.password === password)

if(user){

  // const firstName = user.firstname;
  // const username = user.username;
  // console.log(`Welcome, ${user.firstname}`);
  // user = JSON.parse(localstorage.getitems)

  localStorage.setItem('newuser', JSON.stringify(user))
   // Navigate to the dashboard and pass the firstname as a query parameter
   this.route.navigate(['/dashboard', user.username]);
  
  // this.route.navigate(['/dashboard',] ,{ queryParams: { firstName } });
} else{
  alert("Invalid email or password")
}

    console.log("Welcome");
    
  }

}
