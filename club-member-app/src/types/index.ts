export interface Tag {
  id: string;
  name: string;
  category: 'position' | 'hobby' | 'other';
  color?: string;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  introduction: string;
  tags: Tag[];
  isEditable: boolean;
  createdAt: string;
}

export interface MemberFormData {
  name: string;
  avatar: string;
  introduction: string;
  tags: string[];
}
