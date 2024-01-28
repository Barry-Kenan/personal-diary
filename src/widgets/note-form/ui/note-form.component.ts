import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '@shared/consts';
import { percentage } from '@shared/lib';
import { Note } from '@shared/models';
import { NotesService } from '@shared/services';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
    ProgressBarModule,
  ],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { read: ElementRef })
  public editorElement!: ElementRef;
  public noteForm: FormGroup;
  private editor!: EditorJS;
  public percentage!: number;
  public id!: string;
  public initialData!: Note;

  constructor(
    private fb: FormBuilder,
    public notesService: NotesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.noteForm = this.fb.group({
      text: [''],
      file: [''],
    });

    this.initialData = {
      text: { blocks: [], time: 0, version: '' },
      photoUrl: '#',
      changedDate: new Date(),
      photoName: '',
      id: '',
    };
  }

  public ngOnInit(): void {
    if (!this.id) {
      this.f['file'].addValidators([Validators.required]);
    } else {
      this.notesService.getNote(this.id).subscribe((res: any) => {
        this.initialData = res.data();
        this.initialData.id = this.id;
        this.noteForm.patchValue({ text: this.initialData.text });
        this.initializeEditor();
      });
    }
  }

  public ngAfterViewInit() {
    if (!this.id) {
      this.initializeEditor();
    }
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 440,
      holder: this.editorElement.nativeElement,
      onChange: () => this.saveText(),
      tools: {
        ...EDITOR_JS_TOOLS,
      },
      data: this.initialData.text,
      placeholder: 'Введите текст',
    });
  }

  get f() {
    return this.noteForm.controls;
  }

  public saveFile(event: FileUploadHandlerEvent) {
    const file = event.files[0];
    this.noteForm.patchValue({
      file,
    });
  }

  public saveText() {
    this.editor.save().then(data => {
      this.noteForm.patchValue({
        text: data,
      });
    });
  }

  public submit(): void {
    if (!this.noteForm.valid) {
      return;
    }
    const { file, text } = this.noteForm.value;

    if (!this.f['file'].value) {
      this.notesService.changeText(this.id, text).then(() => {
        this.message('Запись изменена');
      });
    } else {
      this.saveNoteWithFile(file, text);
    }
  }

  private saveNoteWithFile(file: File, text: OutputData) {
    if (this.id) {
      this.notesService.deleteNote(this.initialData);
    }
    this.notesService.uploadNote(file, text).subscribe((res: any) => {
      const { bytesTransferred, totalBytes } = res;
      this.percentage = percentage(bytesTransferred, totalBytes);
      if (this.percentage === 100) {
        setTimeout(() => {
          const messageText = this.id ? 'Запись изменена' : 'Новая запись добавлена';
          this.message(messageText);
        }, 1000);
      }
    });
  }

  private message(detail: string) {
    this.messageService.add({
      key: 'authToast',
      severity: 'info',
      detail,
    });

    this.router.navigate(['']);
  }
}
