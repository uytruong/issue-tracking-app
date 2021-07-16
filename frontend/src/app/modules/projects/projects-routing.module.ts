import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectConst } from '@app/core/constant/project-const';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
