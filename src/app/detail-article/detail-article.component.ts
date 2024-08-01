
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article, Comment } from '../services/article.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  article: Article | undefined;
  comments: Comment[] = [];
  isLocalArticle: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticle(id).subscribe(data => {
      this.article = data;

      // Vérifie si l'article est local ou provenant de JSONPlaceholder
      this.isLocalArticle = !this.article.id || this.article.id > 1000; // Ajuste cette condition selon ton besoin
      if (!this.isLocalArticle) {
        this.loadComments(id);
      }
    });
  }

  loadComments(postId: number): void {
    this.articleService.getCommentsForArticle(postId).subscribe(data => {
      this.comments = data;
    });
  }

  deleteArticle(): void {
    if (this.article) {
      this.articleService.deleteArticle(this.article.id).subscribe(() => {
        // Redirection ou message de succès
      });
    }
  }
}
