import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { AddUpdateArticleComponent } from './add-update-article/add-update-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';

export const appRoutes: Routes = [
  { path: '', component: ListeArticleComponent },
  { path: 'article/:id', component: DetailArticleComponent },
  { path: 'add', component: AddUpdateArticleComponent },
  { path: 'edit/:id', component: AddUpdateArticleComponent },
  { path: 'article-details/:id', component: DetailArticleComponent },
  { path: 'add-update-article/: id', component: AddUpdateArticleComponent  }
  // this.router.navigate(['/add-update-article', id]);
];
