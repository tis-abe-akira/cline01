import { Member } from '../types';
import { Card, CardContent, Typography, Avatar, Chip, Box, IconButton } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragIndicator as DragHandle } from '@mui/icons-material';

interface MemberCardProps {
  member: Member;
  onClick: () => void;
}

export function MemberCard({ member, onClick }: MemberCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 2,
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        onClick={onClick}
        sx={{ cursor: 'pointer', position: 'relative', pr: 6 }}
      >
        <IconButton
          {...attributes}
          {...listeners}
          sx={{
            position: 'absolute',
            right: -12,
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing',
            },
          }}
        >
          <DragHandle />
        </IconButton>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={member.avatar}
            alt={member.name}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" component="div">
              {member.name}
            </Typography>
            <Box display="flex" gap={0.5} flexWrap="wrap">
              {member.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  sx={{
                    backgroundColor: tag.color || 'primary.main',
                    color: 'white',
                  }}
                />
              ))}
              {member.tags.length > 3 && (
                <Chip
                  label={`+${member.tags.length - 3}`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {member.introduction}
        </Typography>
      </CardContent>
    </Card>
  );
}
