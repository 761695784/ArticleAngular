import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { AddUpdateArticleComponent } from './add-update-article/add-update-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListeArticleComponent,AddUpdateArticleComponent,DetailArticleComponent,RouterOutlet  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularArticle';
}
