import { AddUpdateArticleComponent } from './../add-update-article/add-update-article.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface Article {
  id: number;
  title: string;
  body: string;
}
@Component({
  selector: 'app-liste-article',
  standalone: true,
  imports: [FormsModule, CommonModule,AddUpdateArticleComponent, ReactiveFormsModule, RouterModule ],
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.css']
})
export class ListeArticleComponent implements OnInit {
  articles: Article [] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
      console.log(this.articles);
    });

    this.articleService.getArticle(1).subscribe(data => {
      console.log(data);
    });
  }

  deleteArticle(id:number): void {
    Swal.fire({
      title: 'Supprimer l\'article?',
      text: 'Cette action est définitive.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(id).subscribe(() => {
          Swal.fire('Success', 'Article supprimé avec succès!', 'success');
          this.articles = this.articles.filter(article => article.id!== id);
        });
      }
    });
  }
}
