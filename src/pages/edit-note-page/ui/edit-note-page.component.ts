import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent, NoteFormComponent } from '@widgets';

/**
 * Страница изменения записи
 */
@Component({
  selector: 'app-edit-note-page',
  standalone: true,
  imports: [CommonModule, NoteFormComponent, LayoutComponent],
  templateUrl: './edit-note-page.component.html',
  styleUrls: ['./edit-note-page.component.scss'],
})
export class EditNotePageComponent {}
