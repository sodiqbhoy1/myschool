import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public array:any[]=[];
errormessage:string='';
emptyfields:string ='';
  formbuild: FormBuilder;
  
  constructor (public fb:FormBuilder, public router:Router){
    this.formbuild=fb;
    this.newform= this.formbuild.group({
firstname: ['', [Validators.required, Validators.minLength(3)]],
lastname: ['', [Validators.required, Validators.minLength(3)]],
username: ['', [Validators.required, Validators.minLength(4)]],
email:['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],

password: ['', [Validators.required,  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$') ]],

    });

     // Load existing users from localStorage when the component is initialized
     const storedUsers = JSON.parse(localStorage.getItem('registration') || '[]');
     this.array = storedUsers;
  }
public newform:any;

  submitBtn (){
    const users = JSON.parse(localStorage.getItem('registration') || '[]');
    const email = this.newform.value.email;
    const username = this.newform.value.username;
    
    // checks if the email exist before registration
    if (users.some((user:any)=>user.email === email || user.username === username )){
      this.errormessage= 'Email or username already exist';

    } else if(this.newform.valid){
        
               this.array.push(this.newform.value)
                localStorage.setItem('registration', JSON.stringify(this.array))
                console.log(localStorage['registration']);
                this.router.navigate(['/login']);
                // Localstorage.setItem('formdetails', JSON.stringify(this.newform.value));
                // console.log("form details:", this.newform.value );

      } else{
        this.emptyfields ='Fill all fields'
        // console.log("invalid form");
    
      }
      }
    }
    
