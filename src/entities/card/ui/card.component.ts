import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Note } from '@shared/models';
import { NotesService } from '@shared/services';
import edjsHTML from 'editorjs-html';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

/**
 * Компонент карточка записей
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  public text!: SafeHtml;
  @Input() public note!: Note;

  constructor(
    private sanitizer: DomSanitizer,
    private notesService: NotesService,
    private messageService: MessageService
  ) {}

  public ngOnInit() {
    if (typeof this.note.text === 'string') {
      this.text = this.sanitizer.bypassSecurityTrustHtml(this.note?.text);
    } else {
      const edjsParser = edjsHTML();
      this.text = edjsParser.parse(this.note?.text).join('');
    }
  }

  // метод удаления записи
  public delete(): void {
    this.notesService.deleteNote(this.note);
    this.messageService.add({
      key: 'authToast',
      severity: 'info',
      detail: 'Запись удалена',
    });
  }
}
