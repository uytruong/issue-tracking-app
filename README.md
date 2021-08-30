# Issue Tracking App

<!-- Add buttons here -->

<!-- Describe your project in brief -->
This is a simple issue tracking app built with MEAN stack. I built this web application for my learning purpose.

<!-- The project title should be self explanotory and try not to make it a mouthful. (Although exceptions exist- **awesome-readme-writing-guide-for-open-source-projects** - would have been a cool name)

Add a cover/banner image for your README. **Why?** Because it easily **grabs people's attention** and it **looks cool**(*duh!obviously!*).

The best dimensions for the banner is **1280x650px**. You could also use this for social preview of your repo.

I personally use [**Canva**](https://www.canva.com/) for creating the banner images. All the basic stuff is **free**(*you won't need the pro version in most cases*).

There are endless badges that you could use in your projects. And they do depend on the project. Some of the ones that I commonly use in every projects are given below. 

I use [**Shields IO**](https://shields.io/) for making badges. It is a simple and easy to use tool that you can use for almost all your badge cravings. -->

<!-- Some badges that you could use -->

<!-- ![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/navendu-pottekkat/awesome-readme?include_prereleases)
: This badge shows the version of the current release.

![GitHub last commit](https://img.shields.io/github/last-commit/navendu-pottekkat/awesome-readme)
: I think it is self-explanatory. This gives people an idea about how the project is being maintained.

![GitHub issues](https://img.shields.io/github/issues-raw/navendu-pottekkat/awesome-readme)
: This is a dynamic badge from [**Shields IO**](https://shields.io/) that tracks issues in your project and gets updated automatically. It gives the user an idea about the issues and they can just click the badge to view the issues.

![GitHub pull requests](https://img.shields.io/github/issues-pr/navendu-pottekkat/awesome-readme)
: This is also a dynamic badge that tracks pull requests. This notifies the maintainers of the project when a new pull request comes.

![GitHub All Releases](https://img.shields.io/github/downloads/navendu-pottekkat/awesome-readme/total): If you are not like me and your project gets a lot of downloads(*I envy you*) then you should have a badge that shows the number of downloads! This lets others know how **Awesome** your project is and is worth contributing to.

![GitHub](https://img.shields.io/github/license/navendu-pottekkat/awesome-readme)
: This shows what kind of open-source license your project uses. This is good idea as it lets people know how they can use your project for themselves.

![Tweet](https://img.shields.io/twitter/url?style=flat-square&logo=twitter&url=https%3A%2F%2Fnavendu.me%2Fnsfw-filter%2Findex.html): This is not essential but it is a cool way to let others know about your project! Clicking this button automatically opens twitter and writes a tweet about your project and link to it. All the user has to do is to click tweet. Isn't that neat? -->

## Demo-Preview
You can find the live demo here: https://ita-uytruong.netlify.app with the demo account:

username: johnmayer - password: 123aA@ (Btw he is one of my favorite guitarists haha)
<!-- Add a demo for your project -->

<!-- After you have written about your project, it is a good idea to have a demo/preview(**video/gif/screenshots** are good options) of your project so that people can know what to expect in your project. You could also add the demo in the previous section with the product description.

Here is a random GIF as a placeholder.

![Random GIF](https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif) -->

## Table of contents

<!-- After you have introduced your project, it is a good idea to add a **Table of contents** or **TOC** as **cool** people say it. This would make it easier for people to navigate through your README and find exactly what they are looking for.

Here is a sample TOC(*wow! such cool!*) that is actually the TOC for this README. -->

- [Issue Tracking App](#issue-tracking-app)
- [Demo-Preview](#demo-preview)
- [Table of contents](#table-of-contents)
- [Tech stack](#tech-stack)
- [Installation for development environment](#installation-for-development-environment)
- [Features](#features)
- [Development](#development)
- [Contribute](#contribute)
- [Support](#support)
- [Credits](#credits)
- [License](#license)

## Tech stack

- Frontend:
    - [Angular][angular]
    - [NgRx][ngrx] Store & Component Store for state management
    - [ng-zorro][ng-zorro] UI library
    - [TailwindCSS][tailwindcss]
- Backend:
    - [NestJS][nestjs]
    - [MongoDB][mongodb]
- Deployment:
    - [Netlify][netlify]
    - [Heroku][heroku]

[angular]: https://angular.io/
[ngrx]: https://ngrx.io/
[ng-zorro]: https://ng.ant.design/docs/introduce/en
[tailwindcss]: https://tailwindcss.com/
[nestjs]: https://nestjs.com/
[mongodb]: https://www.mongodb.com/
[netlify]: https://www.netlify.com/
[heroku]: https://www.heroku.com/

## Installation for development environment

- `git clone https://github.com/uytruong/issue-tracking-app.git`
- `cd issue-tracking-app`
- `npm run start:frontend` for Angular frontend application. The app should run on `http://localhost:4200/`
- `npm run start:backend` for NestJS backend application. The app should run on `http://localhost:8080/`


<!-- *You might have noticed the **Back to top** button(if not, please notice, it's right there!). This is a good idea because it makes your README **easy to navigate.*** 

The first one should be how to install(how to generally use your project or set-up for editing in their machine).

This should give the users a concrete idea with instructions on how they can use your project repo with all the steps.

Following this steps, **they should be able to run this in their device.**

A method I use is after completing the README, I go through the instructions from scratch and check if it is working. -->

<!-- Here is a sample instruction:

To use this project, first clone the repo on your device using the command below:

```git init```

```git clone https://github.com/navendu-pottekkat/nsfw-filter.git``` -->

## Features

:heavy_check_mark: Authentication and authorization
:heavy_check_mark: Create/delete projects
:heavy_check_mark: Drag and drop Kanban board
:heavy_check_mark: Create/update/delete issues
:heavy_check_mark: Comment on issues
:heavy_check_mark: Search and filter issues

Working in progress:
- [ ] Update user information
- [ ] Upload user's avatar and project's avatar
- [ ] Enhance the UI

<!-- This is optional and it is used to give the user info on how to use the project after installation. This could be added in the Installation section also. -->

## Development

#### Frontend structure:
**app**
├── app.component.html
├── app.component.scss
├── app.component.ts
├── app.module.ts
├── app-routing.module.ts
├── **core**
│   ├── configs
│   ├── constant
│   ├── core.module.ts
│   ├── guards
│   ├── interceptors
│   ├── store
│   └── utils
├── **data**
│   ├── model
│   └── ui-model
├── **layouts**
│   ├── auth-layout
│   └── content-layout
├── **modules**
│   ├── auth
│   ├── project
│   └── project-list
└── **shared**
    ├── components
    ├── drag-cursor.directive.ts
    └── shared.module.ts
The `core` contains the main `store` for state management, configs, constant, guards, interceptors,...
The `data` contains the models used in the application
The `layouts` holds two layouts `auth-layout` and `content-layout` which act like a placeholder for rendering corresponding contents.
The `modules` contains all the feature module of the application. All of the modules in `modules` are lazy loaded.
The `shared` contains resources that are used more than once through out the application.

#### Backend structure:
**app**
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── **auth**
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── dto
│   ├── jwt-payload.model.ts
│   └── strategies
├── **comments**
│   ├── dto
│   ├── issue-comments.controller.ts
│   ├── issue-comments.module.ts
│   ├── issue-comments.service.ts
│   └── models
├── **issues**
│   ├── dto
│   ├── issues.controller.ts
│   ├── issues.module.ts
│   ├── issues.service.ts
│   └── models
├── **projects**
│   ├── dto
│   ├── models
│   ├── projects.controller.ts
│   ├── projects.module.ts
│   └── projects.service.ts
├── **shared**
│   ├── base.dto.ts
│   ├── base.model.ts
│   ├── base.service.ts
│   ├── config
│   ├── decorators
│   ├── guards
│   └── shared.module.ts
└── **users**
    ├── dto
    ├── models
    ├── users.controller.ts
    ├── users.module.ts
    └── users.service.ts
The `auth` used for authentication and authorization.
The `projects`, `users`, `issues`, `comments` serve as the features.
The `shared` has the same function as the one in frontend and contains `base service`, `base model`.
<!-- This is the place where you give instructions to developers on how to modify the code.

You could give **instructions in depth** of **how the code works** and how everything is put together.

You could also give specific instructions to how they can setup their development environment.

Ideally, you should keep the README simple. If you need to add more complex explanations, use a wiki. Check out [this wiki](https://github.com/navendu-pottekkat/nsfw-filter/wiki) for inspiration. -->

## Contribute
Feel free to [open an issue][issues] 

You can definitely fork and make changes if you'd like to contribute to this repository. [Pull requests][pulls] are welcomed.

[issues]: https://github.com/uytruong/issue-tracking-app/issues/new
[pulls]: https://github.com/uytruong/issue-tracking-app/pulls

## Support
Thank you for taking a look at my project.
If you like my project, please give this repository a ⭐. I would really appreciate it. 
## License

<!-- Adding the license to README is a good practice so that people can easily refer to it.

Make sure you have added a LICENSE file in your project folder. **Shortcut:** Click add new file in your root of your repo in GitHub > Set file name to LICENSE > GitHub shows LICENSE templates > Choose the one that best suits your project!

I personally add the name of the license and provide a link to it like below. -->

You can use the code on your projects. I would really appreciate it if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)


## About me
My name is Uy Truong. I'm a software engineer. Also I'm a huge fan of rock music and cooking.
Contact: uytruong97@gmail.com
## Credits
[(Back to top)](#table-of-contents)

This project is inspired by [trungk18/jira-clone-angular][angular-jira-clone] and [Jira Software][jira].
I'd like to give my gratitude to series [100 days of Angular][100-days-angular] of Angular Vietnam.
Thank you [Chau Tran][chau], [Tiep Phan][tiep] and [Trung Vo][trung] for their amazing works which helped me a lot.

[chau]: https://github.com/nartc
[tiep]: https://github.com/tieppt
[trung]: https://github.com/trungk18
[angular-jira-clone]: https://github.com/trungk18/jira-clone-angular
[jira]: https://www.atlassian.com/software/jira/
[100-days-angular]: https://github.com/angular-vietnam/100-days-of-angular/

<!-- Add the footer here -->

<!-- ![Footer](https://github.com/navendu-pottekkat/awesome-readme/blob/master/fooooooter.png) -->