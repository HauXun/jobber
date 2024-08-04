export const getFileSizeString = (fileSizeB: number): string => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return `${fileSizeKB.toPrecision(3)} KB`;
  } else {
    return `${fileSizeMB.toPrecision(3)} MB`;
  }
};
