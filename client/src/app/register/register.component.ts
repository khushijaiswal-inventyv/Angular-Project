import { CommonModule } from '@angular/common';
import { Component, OnInit,inject} from '@angular/core';
import User from '../user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { Router } from 'express';
// import { Router } from 'express';
// import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errMsg!: string

  constructor(private _registerService: RegisterService, private route: Router) { }
  signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
  })

  get name(){
    return this.signupForm.get('name');
  }
  get email(){
    return this.signupForm.get('email');
  }
  get password(){
    return this.signupForm.get('password');
  }
  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }

  onSubmit(user:User) {
    this._registerService.register(user).subscribe({
    next: (res)=>{
      Swal.fire({
        title: 'Login Successfull!',
        text: '',
        icon: 'success',
        timer: 1000, // Close after 1 seconds
        showConfirmButton: false
      }).then(() => {
        this.route.navigate(['home']);
      });
    }})
  }
    // error:(err)=>{
    //   this.errMsg=err;
    // }
  // }
  // constructor(private formBuilder: FormBuilder) {
  // }
  // Form!: FormGroup;

  // ngOnInit(){
  // this.Form = this.formBuilder.group({
  //   docTitle: ['', Validators.required],
  //   docVersion:['',Validators.required],
  //   docStatus:['',Validators.required],
  //   docType:['',Validators.required]
  // });

// }
// // FormData = this.Form.value;
//   onSubmit(){
//     console.log("Form Submitted!");
//   }

}
