import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '@entities';
import { Note } from '@shared/models';
import { AuthService, NotesService } from '@shared/services';
import { LayoutComponent } from '@widgets';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { firstValueFrom, map } from 'rxjs';

/**
 * Главная страница
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, LayoutComponent, CardComponent, RouterModule, ProgressSpinnerModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public notes!: Note[];
  public loading: boolean;

  constructor(
    private noteService: NotesService,
    private authService: AuthService
  ) {
    this.loading = false;
  }

  public ngOnInit(): void {
    this.getAll();
  }

  // метод получения всех записей
  private async getAll(): Promise<void> {
    this.loading = true;
    const userEmail = await firstValueFrom(this.authService.user$.pipe(map(e => e?.email)));

    this.noteService
      .getAllNotes(userEmail as string)
      .pipe(map(e => e.sort((a, b) => b.changedDate.valueOf() - a.changedDate.valueOf())))
      .subscribe(data => {
        this.notes = data;
        this.loading = false;
      });
  }
}
