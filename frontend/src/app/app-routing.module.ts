import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'project', 
    pathMatch: 'full' 
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'project',
        loadChildren: () =>
          import('@modules/project/project.module').then(
            (m) => m.ProjectModule
          ),
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
