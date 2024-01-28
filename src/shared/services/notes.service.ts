import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { OutputData } from '@editorjs/editorjs';
import { FileMetaData, Note } from '@shared/models';
import { Observable, finalize, firstValueFrom, map } from 'rxjs';

/**
 * Сервис для работы с записями
 */
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public email!: string;
  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}

  /**
   * метод для загрузки изображения и текста
   * @param file Файл(изображение)
   * @param text текст(объект editor.js data)
   * @returns Observable
   */
  public uploadNote(file: File, text: OutputData): Observable<unknown> {
    const currentFileUpload = new FileMetaData(file);
    const path = `${this.email}/${currentFileUpload.file.name}`;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(file);

    return uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadLink => {
          const note: Note = {
            id: '',
            changedDate: new Date(),
            text,
            photoName: currentFileUpload.file.name,
            photoUrl: downloadLink,
          };
          note.id = this.fireStore.createId();
          this.fireStore.collection(`/${this.email}`).add(note);
        });
      })
    );
  }

  /**
   * метод для получения всех записей
   * @param email почта
   * @returns Observable<Note[]>
   */
  public getAllNotes(email: string): Observable<Note[]> {
    this.email = email;
    return this.fireStore
      .collection(`/${email}`)
      .snapshotChanges()
      .pipe(
        map(e =>
          e.map((k: any) => {
            const data = k.payload.doc.data();
            data.id = k.payload.doc.id;
            data.changedDate = data.changedDate.toDate();

            return data;
          })
        )
      );
  }

  /**
   * метод получения записи
   * @param id id записи
   * @returns observable
   */
  public getNote(id: string): Observable<unknown> {
    return this.fireStore.collection(`/${this.email}`).doc(id).get();
  }

  /**
   * Изменения текста записи
   * @param id id записи
   * @param text новый текст
   * @returns Promise<void>
   */
  public changeText(id: string, text: OutputData): Promise<void> {
    const data = {
      changedDate: new Date(),
      text,
    };

    return this.fireStore.collection(`${this.email}`).doc(id).update(data);
  }

  /**
   * метод удаления записи
   * @param note запись которую нужно удалить
   */
  public async deleteNote(note: Note): Promise<void> {
    const imagesByName = await firstValueFrom(this.getAllNotes(this.email).pipe(map(e => e.map(k => k.photoName))));

    const sameImagesCount = imagesByName.filter(e => e === note.photoName).length;
    this.fireStore.collection(`/${this.email}`).doc(note.id).delete();
    if (sameImagesCount === 1) {
      this.fireStorage.ref(`/${this.email}/${note.photoName}`).delete();
    }
  }
}
