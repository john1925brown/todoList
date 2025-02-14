import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { getTheme } from '@/common/theme/theme';
import { selectThemeMode } from '@/app/features/todolists/model/app-selector';
import { Main } from '@/app/features/todolists/model/MainApp';
import { Header } from '@/common/components/Header/Header';

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = 'all' | 'active' | 'completed';

export type TasksState = Record<string, Task[]>;

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className={'app'}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
};
