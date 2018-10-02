import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutScreenComponent } from './about-screen/about-screen.component';
import { AdvantagesScreenComponent } from './advantages-screen/advantages-screen.component';
import { ServicesScreenComponent } from './services-screen/services-screen.component';
import { DreamteamScreenComponent } from './dreamteam-screen/dreamteam-screen.component';
import { ContactusScreenComponent } from './contactus-screen/contactus-screen.component';

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainScreenComponent,
    FooterComponent,
    AboutScreenComponent,
    AdvantagesScreenComponent,
    ServicesScreenComponent,
    DreamteamScreenComponent,
    ContactusScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
