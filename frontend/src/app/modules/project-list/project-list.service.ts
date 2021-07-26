import { Injectable } from '@angular/core';
import { Project, ProjectCategory } from '@app/data/model/project';
import { Observable, of } from 'rxjs';

const dummyProjects: Project[] = [
    {
      id: 'abc-projectId',
      category: ProjectCategory.SOFTWARE,
      description: 'This is a software project',
      avatarUrl: 'https://i.pinimg.com/originals/24/70/08/2470083b72ec71f8a6727a70562bb7cc.jpg',
      key: 'abc',
      name: 'Apple Ball Cat',
      createdAt: '01/01/2021',
      updatedAt: '01/01/2021'
    },
    {
      id: 'xyz-projectId',
      category: ProjectCategory.BUSINESS,
      description: 'This is a business project',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_sIyYS38uLOr8A3s3kPW5PbgPR8JSuQMKQ&usqp=CAU',
      key: 'xyz',
      name: "X'mas Young Zoo",
      createdAt: '01/02/2021',
      updatedAt: '01/02/2021'
    }
  ];

@Injectable({ providedIn: 'root' })
export class ProjectListService {
    getProjectsByIds(ids: string[]): Observable<Project[]> {
        const projects = dummyProjects.filter(project => ids.includes(project.id));
        if (projects) {
          return of(projects);
        } else {
          throw new Error(`Projects not found`);
        }
      }
}
