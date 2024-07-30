import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.css'
})
export class DetailArticleComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  article: any;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticle(id).subscribe(data => {
      this.article = data;
    });
  }


}
