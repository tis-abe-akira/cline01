import { Container } from '@mui/material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { MemberCard } from './MemberCard';
import { useApp } from '../context/AppContext';

export function MemberList() {
  const { members, reorderMembers, setSelectedMember } = useApp();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = members.findIndex((member) => member.id === active.id);
      const newIndex = members.findIndex((member) => member.id === over.id);
      reorderMembers(oldIndex, newIndex);
    }
  };

  const handleMemberClick = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    if (member) {
      setSelectedMember(member);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={members.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onClick={() => handleMemberClick(member.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Container>
  );
}
