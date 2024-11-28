import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box,
  Chip,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';
import { Member, MemberFormData } from '../types';
import { useApp } from '../context/AppContext';
import { ImageDropzone } from './ImageDropzone';

interface MemberDetailProps {
  open: boolean;
  onClose: () => void;
}

export function MemberDetail({ open, onClose }: MemberDetailProps) {
  const { selectedMember, tags, updateMember } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    avatar: '',
    introduction: '',
    tags: [],
  });

  if (!selectedMember) return null;

  const handleEdit = () => {
    setFormData({
      name: selectedMember.name,
      avatar: selectedMember.avatar,
      introduction: selectedMember.introduction,
      tags: selectedMember.tags.map((tag) => tag.id),
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMember(selectedMember.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
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
          {isEditing ? 'メンバー編集' : 'メンバー詳細'}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {isEditing ? (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="名前"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
        ) : (
          <Box sx={{ mt: 2 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                src={selectedMember.avatar}
                alt={selectedMember.name}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Typography variant="h5">{selectedMember.name}</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {selectedMember.introduction}
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {selectedMember.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  sx={{
                    backgroundColor: tag.color || 'primary.main',
                    color: 'white',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {selectedMember.isEditable &&
          (isEditing ? (
            <>
              <Button onClick={handleCancel}>キャンセル</Button>
              <Button onClick={handleSave} variant="contained" color="primary">
                保存
              </Button>
            </>
          ) : (
            <Button
              startIcon={<EditIcon />}
              onClick={handleEdit}
              variant="contained"
              color="primary"
            >
              編集
            </Button>
          ))}
      </DialogActions>
    </Dialog>
  );
}
