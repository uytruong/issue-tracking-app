import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectConst } from '@app/core/constant/project-const';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: `:${ProjectConst.ProjectKey}`,
    component: ProjectComponent,
    children: [
      {
        path: 'board',
        component: BoardComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
