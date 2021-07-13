import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { NavbarComponent } from './layouts/content-layout/navbar/navbar.component';
import { SidebarComponent } from './layouts/content-layout/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  UserOutline,
  SearchOutline,
  PlusOutline,
  InfoCircleFill,
  ProjectOutline,
  SettingOutline
} from '@ant-design/icons-angular/icons';

const NZ_ICONS: IconDefinition[] = [
  UserOutline,
  SearchOutline,
  PlusOutline,
  InfoCircleFill,
  ProjectOutline,
  SettingOutline
];

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    NavbarComponent,
    SidebarComponent
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
