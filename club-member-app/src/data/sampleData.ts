import { Member, Tag } from '../types';

export const initialTags: Tag[] = [
  {
    id: '1',
    name: '部長',
    category: 'position',
    color: '#1976d2',
  },
  {
    id: '2',
    name: '副部長',
    category: 'position',
    color: '#388e3c',
  },
  {
    id: '3',
    name: '会計',
    category: 'position',
    color: '#d32f2f',
  },
  {
    id: '4',
    name: 'ゲーム',
    category: 'hobby',
    color: '#f57c00',
  },
  {
    id: '5',
    name: 'アニメ',
    category: 'hobby',
    color: '#7b1fa2',
  },
  {
    id: '6',
    name: '音楽',
    category: 'hobby',
    color: '#00796b',
  },
];

export const initialMembers: Member[] = [
  {
    id: '1',
    name: '山田太郎',
    avatar: 'https://i.pravatar.cc/150?img=1',
    introduction: '部長を務めています。趣味はゲームと音楽です。みんなで楽しいサークルにしていきましょう！',
    tags: [initialTags[0], initialTags[3], initialTags[5]],
    isEditable: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: '佐藤花子',
    avatar: 'https://i.pravatar.cc/150?img=5',
    introduction: '副部長の佐藤です。アニメと音楽が大好きです。イベントの企画なども担当しています。',
    tags: [initialTags[1], initialTags[4], initialTags[5]],
    isEditable: true,
    createdAt: '2023-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    name: '鈴木一郎',
    avatar: 'https://i.pravatar.cc/150?img=3',
    introduction: '会計担当の鈴木です。部費の管理をしています。趣味はゲームです。',
    tags: [initialTags[2], initialTags[3]],
    isEditable: true,
    createdAt: '2023-01-03T00:00:00.000Z',
  },
];
