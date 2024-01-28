/**
 * Функция вычисления процента загруженного файла
 * @param bytesTransferred Общий размер
 * @param totalBytes Сумма байтов
 * @returns
 */
export const percentage = (bytesTransferred: number, totalBytes: number) =>
  Number(((bytesTransferred * 100) / totalBytes).toFixed(2));
