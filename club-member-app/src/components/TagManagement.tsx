import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Tag } from '../types';
import { useApp } from '../context/AppContext';

interface TagManagementProps {
  open: boolean;
  onClose: () => void;
}

const defaultColors = [
  '#1976d2', // blue
  '#388e3c', // green
  '#d32f2f', // red
  '#f57c00', // orange
  '#7b1fa2', // purple
  '#00796b', // teal
];

export function TagManagement({ open, onClose }: TagManagementProps) {
  const { tags, addTag } = useApp();
  const [newTagName, setNewTagName] = useState('');
  const [newTagCategory, setNewTagCategory] = useState<Tag['category']>('other');
  const [newTagColor, setNewTagColor] = useState(defaultColors[0]);

  const handleAddTag = () => {
    if (newTagName.trim()) {
      addTag({
        name: newTagName.trim(),
        category: newTagCategory,
        color: newTagColor,
      });
      setNewTagName('');
      setNewTagCategory('other');
      setNewTagColor(defaultColors[0]);
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setNewTagCategory(event.target.value as Tag['category']);
  };

  const groupedTags = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<Tag['category'], Tag[]>);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Tag Management
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Tag
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Tag Name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newTagCategory}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="position">Position</MenuItem>
                <MenuItem value="hobby">Hobby</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                value={newTagColor}
                label="Color"
                onChange={(e) => setNewTagColor(e.target.value)}
                renderValue={(color) => (
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: color,
                        mr: 1,
                      }}
                    />
                    {color}
                  </Box>
                )}
              >
                {defaultColors.map((color) => (
                  <MenuItem key={color} value={color}>
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: color,
                          mr: 1,
                        }}
                      />
                      {color}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddTag}
              disabled={!newTagName.trim()}
            >
              Add Tag
            </Button>
          </Stack>
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Existing Tags
        </Typography>
        {(['position', 'hobby', 'other'] as const).map((category) => (
          <Box key={category} sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, textTransform: 'capitalize' }}
            >
              {category}
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {(groupedTags[category] || []).map((tag) => (
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
        ))}
      </DialogContent>
    </Dialog>
  );
}
