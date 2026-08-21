// Отправляем файл напрямую в S3, не передавая его через backend.
export async function uploadFileToS3({ uploadUrl, file, contentType = file.type }) {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('S3 file upload failed.');
  }

  return response;
}
