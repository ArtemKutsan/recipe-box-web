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

// Получаем ссылку для рецепта и загружаем выбранный файл напрямую в S3.
export async function uploadRecipeImage(file, createPresignedUpload) {
  if (!file) {
    return null;
  }

  const { uploadUrl, fileKey } = await createPresignedUpload({
    purpose: 'recipe',
    contentType: file.type,
    sizeBytes: file.size,
  }).unwrap();

  await uploadFileToS3({ uploadUrl, file });

  return fileKey;
}
