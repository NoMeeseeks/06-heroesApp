import { Component, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import path from 'path';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
const routes: Route[] =
  [
    {
      path: '',
      component: LayoutPagesComponent,
      children:
        [
          {
            path: 'login',
            component: LoginPageComponent
          },
          {
            path: 'new-account',
            component: RegisterPageComponent
          },
          {
            path: '**',
            redirectTo: 'login'
          }
        ]
    }
  ];
@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule,
    ],
})
export class AuthRoutingModule { }
