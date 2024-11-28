import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

interface ImageDropzoneProps {
  onImageDrop: (base64Image: string) => void;
  currentImage?: string;
}

export function ImageDropzone({ onImageDrop, currentImage }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          onImageDrop(base64String);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageDrop]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          onImageDrop(base64String);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [onImageDrop]);

  return (
    <Box
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      sx={{
        width: '100%',
        height: 200,
        border: '2px dashed',
        borderColor: isDragging ? 'primary.main' : 'grey.300',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: isDragging ? 'action.hover' : 'background.paper',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {currentImage ? (
        <Box
          component="img"
          src={currentImage}
          alt="Preview"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      ) : (
        <>
          <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body1" color="text.secondary">
            ドラッグ＆ドロップで画像をアップロード
          </Typography>
          <Typography variant="body2" color="text.secondary">
            または クリックして画像を選択
          </Typography>
        </>
      )}
    </Box>
  );
}
