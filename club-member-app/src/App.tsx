import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  Box,
  Fab,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { Add as AddIcon, LocalOffer as TagIcon } from '@mui/icons-material';
import { AppProvider } from './context/AppContext';
import { MemberList } from './components/MemberList';
import { MemberDetail } from './components/MemberDetail';
import { AddMemberModal } from './components/AddMemberModal';
import { TagManagement } from './components/TagManagement';
import { useApp } from './context/AppContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function AppContent() {
  const { selectedMember, setSelectedMember, isModalOpen, setIsModalOpen } = useApp();
  const [isTagManagementOpen, setIsTagManagementOpen] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Club Members
          </Typography>
          <Button
            color="inherit"
            startIcon={<TagIcon />}
            onClick={() => setIsTagManagementOpen(true)}
          >
            Manage Tags
          </Button>
        </Toolbar>
      </AppBar>

      <MemberList />

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsModalOpen(true)}
      >
        <AddIcon />
      </Fab>

      <MemberDetail
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <AddMemberModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <TagManagement
        open={isTagManagementOpen}
        onClose={() => setIsTagManagementOpen(false)}
      />
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}
