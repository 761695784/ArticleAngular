import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Déclaration de l'interface
interface Article {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-add-update-article',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-update-article.component.html',
  styleUrls: ['./add-update-article.component.css']
})
export class AddUpdateArticleComponent implements OnInit {
  articleForm: FormGroup;
  isEditMode = false;
  articleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.articleId = +id;
        this.articleService.getArticle(this.articleId).subscribe(data => {
          this.articleForm.setValue({ title: data.title, body: data.body });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.articleId) {
      this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.articleService.createArticle(this.articleForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
