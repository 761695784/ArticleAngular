// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ArticleService,Article } from '../services/article.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-detail-article',
//   standalone: true,
//   imports: [CommonModule,FormsModule ],
//   templateUrl: './detail-article.component.html',
//   styleUrl: './detail-article.component.css'
// })
// export class DetailArticleComponent implements OnInit {

//   articles: Article [] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private articleService: ArticleService
//   ) { }

//   article: Article | undefined;
//   ngOnInit(): void {
//     const id = +this.route.snapshot.paramMap.get('id')!;
//     console.log('ID récupéré pour les détails :', id); // Vérifie l'ID récupéré
//     this.articleService.getArticle(id).subscribe(data => {
//       console.log('Données de l\'article :', data); // Vérifie les données reçues
//       this.article = data;
//     });


//   }



// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article, Comment } from '../services/article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  article: Article | undefined;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticle(id).subscribe(data => {
      this.article = data;
      this.loadComments(id);
    });
  }

  loadComments(postId: number): void {
    this.articleService.getCommentsForArticle(postId).subscribe(data => {
      this.comments = data;
    });
  }

  

}
