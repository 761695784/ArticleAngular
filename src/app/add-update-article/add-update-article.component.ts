import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

// Déclaration de l'interface
interface Article {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-add-update-article',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './add-update-article.component.html',
  styleUrls: ['./add-update-article.component.css']
})
export class AddUpdateArticleComponent implements OnInit {
  articles: Article[] = [];
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
        this.articleService.getArticle(this.articleId).subscribe({
          next: data => {
            this.articleForm.setValue({ title: data.title, body: data.body });
          },
          error: err => {
            Swal.fire('Error', 'Error updating article.', 'error');
            console.error('Erreur lors de la récupération de l\'article :', err);
          }
        });
      } else {
        this.isEditMode = false;
        this.articleId = null;
      }
    });
  }

  onSubmit(): void {
    console.log('Formulaire soumis :', this.articleForm.valid);
    console.log('Valeurs du formulaire :', this.articleForm.value);

    if (this.isEditMode && this.articleId) {
      this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe({
        next: (updatedArticle) => {
          // Mise à jour de la liste locale des articles
          const index = this.articles.findIndex(a => a.id === this.articleId);
          if (index !== -1) {
            this.articles[index] = updatedArticle;
          }
          Swal.fire('Success', 'Article modifié avec succes !', 'success');
          // Redirection après mise à jour
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'article :', err);
        }
      });
    } else {
      this.articleService.createArticle(this.articleForm.value).subscribe({
        next: newArticle => {
          console.log('Article ajouté :', newArticle);
          this.articles.unshift(newArticle); // Ajoute l'article au début de la liste
          Swal.fire('Success', 'Article ajouté avec succès !', 'success');
          this.router.navigate(['/']);
          this.articleForm.reset(); // Vide le formulaire après mise à jour

        },
        error: (err) => {
          Swal.fire('Error', 'Error adding article.', 'error');
          console.error('Erreur lors de l\'ajout de l\'article :', err);
        }
      });
    }
  }

  loadArticles() {
    this.articleService.getArticles().subscribe({
      next: data => {
        this.articles = data;
      },
      error: err => {
        console.error('Erreur lors du chargement des articles :', err);
      }
    });
  }

  viewArticleDetails(id: number) {
    this.router.navigate(['/article-details', id]);
  }
  // Suppression de article
  deleteArticle(id: number): void {
    Swal.fire({
      title: 'Supprimer l\'article?',
      text: 'Cette action est définitive.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(id).subscribe({
          next: () => {
            // Suppression de l'article de la liste locale
            this.articles = this.articles.filter(a => a.id!== id);
            Swal.fire('Success', 'Article supprimé avec succès!', 'success');
          },
          error: (err) => {
            console.error('Erreur lors de la suppression de l\'article :', err);
          }
        });
      }
    });
  }

  // modifier article
  editArticle(id: number): void {
    this.router.navigate(['/add-update-article', id]);
  }
}
