import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon"

import { AppRoutingModule } from './app-routing.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { InfoUserComponent } from './pages/info-user/info-user.component';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "user/:id", component: InfoUserComponent },
  { path: "new-user", component: EditUserComponent },
  { path: "user/:id/edit", component: EditUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserFormComponent,
    InfoUserComponent,
    HomeComponent,
    NewUserComponent,
    EditUserComponent,
    NavbarComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
