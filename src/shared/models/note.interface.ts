import { OutputData } from '@editorjs/editorjs';

export interface Note {
  id: string;
  photoName: string;
  photoUrl: string;
  text: OutputData;
  changedDate: Date;
}
