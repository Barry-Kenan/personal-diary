import { OutputData } from '@editorjs/editorjs';

/**
 * interface записи
 */
export interface Note {
  id: string;
  photoName: string;
  photoUrl: string;
  text: OutputData;
  changedDate: Date;
}
