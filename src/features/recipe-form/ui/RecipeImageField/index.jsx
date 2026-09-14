import { useRef, useState } from 'react';
import { MEDIA_UPLOADS_ENABLED } from '@/entities/media/config';

const RecipeImageField = ({ register }) => {
  const imageInputRef = useRef(null);
  const [selectedImageName, setSelectedImageName] = useState('No image selected');
  const imageFileField = register('imageFile');

  return (
    <div className="flex min-h-10 items-center overflow-hidden rounded-xl border bg-card">
      <span className="shrink-0 px-3 text-sm text-muted-foreground">Recipe image</span>
      <span className="min-w-0 flex-1 truncate px-3 text-sm text-foreground">{selectedImageName}</span>
      <div className="shrink-0 bg-border p-1">
        <button
          type="button"
          disabled={!MEDIA_UPLOADS_ENABLED}
          className="h-8 rounded-lg bg-secondary px-4 py-1 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => imageInputRef.current?.click()}
        >
          Browse
        </button>
      </div>
      <input
        ref={(node) => {
          imageFileField.ref(node);
          imageInputRef.current = node;
        }}
        name={imageFileField.name}
        type="file"
        disabled={!MEDIA_UPLOADS_ENABLED}
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onBlur={imageFileField.onBlur}
        onChange={(event) => {
          imageFileField.onChange(event);
          setSelectedImageName(event.target.files?.[0]?.name ?? 'No image selected');
        }}
      />
    </div>
  );
};

export default RecipeImageField;
