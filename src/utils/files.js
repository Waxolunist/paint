export const urltoFile = async (url, filename, mimeType) => {
  const res = await fetch(url);
  const arrBuf = await res.arrayBuffer();
  const file = new File([arrBuf], filename, {type: mimeType});
  return file;
};
