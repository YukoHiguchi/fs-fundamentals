import { DiaryEntry } from '../types/diary';
import diaryService from '../services/diaries';
import { useQuery } from '@tanstack/react-query';

function DiaryList() {
  const {
    data: diaries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['diaries'],
    queryFn: diaryService.getAll,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(diaries);

  return (
    <>
      <h2>Diary entries</h2>
      {diaries?.map((diary: DiaryEntry) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>
            visibility:{diary.visibility}
            <br />
            weather: {diary.weather}
          </p>
        </div>
      ))}
    </>
  );
}

export default DiaryList;
