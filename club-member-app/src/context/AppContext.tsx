import { createContext, useContext, useState, ReactNode } from 'react';
import { Member, Tag, MemberFormData } from '../types';
import { initialMembers, initialTags } from '../data/sampleData';

interface AppContextType {
  members: Member[];
  tags: Tag[];
  selectedMember: Member | null;
  isModalOpen: boolean;
  setMembers: (members: Member[]) => void;
  setTags: (tags: Tag[]) => void;
  setSelectedMember: (member: Member | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  addMember: (data: MemberFormData) => void;
  updateMember: (id: string, data: MemberFormData) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  reorderMembers: (startIndex: number, endIndex: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addMember = (data: MemberFormData) => {
    const newMember: Member = {
      id: crypto.randomUUID(),
      ...data,
      isEditable: true,
      createdAt: new Date().toISOString(),
      tags: data.tags.map(tagId => tags.find(t => t.id === tagId)!).filter(Boolean)
    };
    setMembers([...members, newMember]);
  };

  const updateMember = (id: string, data: MemberFormData) => {
    setMembers(members.map(member => 
      member.id === id
        ? {
            ...member,
            name: data.name,
            avatar: data.avatar,
            introduction: data.introduction,
            tags: data.tags.map(tagId => tags.find(t => t.id === tagId)!).filter(Boolean)
          }
        : member
    ));
    
    // Update selected member if it's the one being edited
    if (selectedMember?.id === id) {
      setSelectedMember({
        ...selectedMember,
        name: data.name,
        avatar: data.avatar,
        introduction: data.introduction,
        tags: data.tags.map(tagId => tags.find(t => t.id === tagId)!).filter(Boolean)
      });
    }
  };

  const addTag = (tagData: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      id: crypto.randomUUID(),
      ...tagData
    };
    setTags([...tags, newTag]);
  };

  const reorderMembers = (startIndex: number, endIndex: number) => {
    const result = Array.from(members);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setMembers(result);
  };

  return (
    <AppContext.Provider
      value={{
        members,
        tags,
        selectedMember,
        isModalOpen,
        setMembers,
        setTags,
        setSelectedMember,
        setIsModalOpen,
        addMember,
        updateMember,
        addTag,
        reorderMembers
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
