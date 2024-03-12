import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private _loginService : RegisterService, private route: Router) {
  }
  LoginForm!: FormGroup;
  ngOnInit(){
  this.LoginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['',Validators.required],
  });
  
}
onSubmit(data: any){  
  console.log("Form Submitted!");
  console.log(this.LoginForm.value);
  this._loginService.login(data).subscribe(
    {
      next: (res)=>{
        console.log(res.token);
        
        sessionStorage.setItem('token',res.token);
        const token = sessionStorage.getItem('token');
        if (token === "undefined") {
          console.log("not valid");
          Swal.fire({
            title: 'Invalid user!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Yep!'
          })
        }else{
          sessionStorage.setItem('id', res.user._id);
          localStorage.setItem('name', res.user.name);
          sessionStorage.setItem('email', res.user.email)
          console.log("Login Successfull!");
          Swal.fire({
            title: 'Login Successfull!',
            text: '',
            icon: 'success',
            timer: 1000, // Close after 1 seconds
            showConfirmButton: false
          }).then(() => {
            this.route.navigate(['home']);
          });

        }
     },
      error: (err)=> console.log(err),
    }
  );
}
}
