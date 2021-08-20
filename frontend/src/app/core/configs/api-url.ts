import { environment } from "@env";

export const userApiUrl = environment.apiUrl + '/users';
export const projectApiUrl = environment.apiUrl + '/projects';
export const issueApiUrl = environment.apiUrl + '/issues';
export const commentApiUrl = environment.apiUrl + '/comments';
export const loginUrl = environment.host + '/auth/login';