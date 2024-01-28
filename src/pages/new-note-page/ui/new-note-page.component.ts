import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent, NoteFormComponent } from '@widgets';

@Component({
  selector: 'app-new-note-page',
  standalone: true,
  imports: [CommonModule, NoteFormComponent, LayoutComponent],
  templateUrl: './new-note-page.component.html',
  styleUrls: ['./new-note-page.component.scss'],
})
export class NewNotePageComponent {}
