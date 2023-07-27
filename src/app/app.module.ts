import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { InfoUserComponent } from './pages/info-user/info-user.component';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

const routes: Routes = [
  { path: "/home", component: HomeComponent },
  { path: "", redirectTo: "/home" },
  { path: "/user/*", component: InfoUserComponent },
  { path: "/new-user", component: NewUserComponent },
  { path: "edit/*", component: EditUserComponent }
];

@NgModule({
  declarations: [
    UserCardComponent,
    UserFormComponent,
    InfoUserComponent,
    HomeComponent,
    NewUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
