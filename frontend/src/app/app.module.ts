import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { NavbarComponent } from './layouts/content-layout/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from '@core/configs/icons';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    NzIconModule.forRoot(NZ_ICONS),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
