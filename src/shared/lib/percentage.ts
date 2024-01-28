export const percentage = (bytesTransferred: number, totalBytes: number) =>
  Number(((bytesTransferred * 100) / totalBytes).toFixed(2));
