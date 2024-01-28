export class FileMetaData {
  public id: string = '';

  public photoName: string = '';

  public file: File;

  public photoUrl: string = '';

  constructor(file: File) {
    this.file = file;
  }
}
