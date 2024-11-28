import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { MemberFormData } from '../types';
import { ImageDropzone } from './ImageDropzone';

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddMemberModal({ open, onClose }: AddMemberModalProps) {
  const { addMember, tags } = useApp();
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    avatar: '',
    introduction: '',
    tags: [],
  });

  const handleSubmit = () => {
    addMember(formData);
    setFormData({
      name: '',
      avatar: '',
      introduction: '',
      tags: [],
    });
    onClose();
  };

  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    setFormData({
      ...formData,
      tags: event.target.value as string[],
    });
  };

  const handleImageDrop = (base64Image: string) => {
    setFormData({
      ...formData,
      avatar: base64Image,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          新規メンバー追加
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="名前"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              プロフィール画像
            </Typography>
            <ImageDropzone
              onImageDrop={handleImageDrop}
              currentImage={formData.avatar}
            />
          </Box>
          <TextField
            fullWidth
            label="自己紹介"
            multiline
            rows={4}
            value={formData.introduction}
            onChange={(e) =>
              setFormData({ ...formData, introduction: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>タグ</InputLabel>
            <Select
              multiple
              value={formData.tags}
              onChange={handleTagChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((tagId) => {
                    const tag = tags.find((t) => t.id === tagId);
                    return tag ? (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        sx={{
                          backgroundColor: tag.color || 'primary.main',
                          color: 'white',
                        }}
                      />
                    ) : null;
                  })}
                </Box>
              )}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!formData.name || !formData.avatar}
        >
          追加
        </Button>
      </DialogActions>
    </Dialog>
  );
}
