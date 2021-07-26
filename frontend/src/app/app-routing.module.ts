import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
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
      {
        path: 'projects',
        loadChildren: () =>
          import('@modules/project-list/project-list.module').then(
            (m) => m.ProjectListModule
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
