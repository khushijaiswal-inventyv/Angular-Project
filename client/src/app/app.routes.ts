import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { TableDisplayComponent } from './table-display/table-display.component';

export const routes: Routes = [
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: '', component: LoginComponent
    },
    {
        path: 'home', component: HomeComponent, canActivate:[AuthService]
    },{
      path:'table', component: TableDisplayComponent, canActivate:[AuthService]
    }
];
