export function PhotoUpload({ photo, onPhotoChange }: { photo: File | null; onPhotoChange: (file: File) => void }) {
  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && onPhotoChange(e.target.files[0])}
        className="hidden"
        id="photo-upload"
      />
      <label
        htmlFor="photo-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-gray-400 transition-colors"
      >
        {photo ? (
          <span className="text-gray-300">{photo.name}</span>
        ) : (
          <>
            <span className="text-3xl mb-2">📷</span>
            <span className="text-gray-400 text-sm">Загрузите фото комнаты</span>
          </>
        )}
      </label>
    </div>
  );
}
