import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  dummyUsers = [
    {
      id: '611a19e3fbf0ab3761e8760e',
      username: 'uytruong',
      password: '123456',
      fullname: 'Uy Truong',
      email: 'uytruong97@gmail.com',
      avatarUrl: 'https://vcdn-vnexpress.vnecdn.net/2020/09/23/01-4451-1600828895.jpg',
      projectIds: ['abc-projectId', 'xyz-projectId'],
      createdAt: '01/01/2021',
      updatedAt: '01/01/2021'
    }
  ];

  login(username: string, password: string) {
    const authenticatedUser = this.dummyUsers.find(
      (user) => user.username === username && user.password === password
    );
    delete authenticatedUser['password'];
    if (authenticatedUser) {
      return of(authenticatedUser).pipe(delay(2000));
    } else {
      throw new Error('Authenticate Failed');
    }
  }
}
