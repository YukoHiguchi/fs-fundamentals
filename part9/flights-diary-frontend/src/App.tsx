import './App.css';
import AddDiaryForm from './components/AddDiaryForm';

import DiaryList from './components/DiaryList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddDiaryForm />
      <DiaryList />
    </QueryClientProvider>
  );
}

export default App;
