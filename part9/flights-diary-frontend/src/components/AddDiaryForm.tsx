import React, { ChangeEventHandler } from 'react';
import { FormEvent } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types/diary';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import diaryService from '../services/diaries';
export interface DiaryFormProps {
  onSubmit: (entry: NewDiaryEntry) => void;
}

function AddDiaryForm() {
  const queryClient = useQueryClient();
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));

  const [visibility, setVisibility] = React.useState<Visibility>(
    Visibility.Great
  );
  const [weather, setWeather] = React.useState<Weather>(Weather.Sunny);
  const [comment, setComment] = React.useState<string>('');

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const onWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(e.target.value as Weather);
  };
  const onVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value as Visibility);
  };
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log('submit');
    addDiary({ date, visibility, weather, comment });
  }
  const {
    mutateAsync: addDiary,
    // isPending,
    // isError,
  } = useMutation({
    mutationFn: diaryService.create,
    onSuccess: (newDiary) => {
      queryClient.setQueryData(['diaries'], (oldQueryData: DiaryEntry[]) => [
        ...oldQueryData,
        newDiary,
      ]);
    },
  });

  const RadioInputField = ({
    category,
    handleFunction,
    option,
  }: {
    category: string;
    handleFunction: ChangeEventHandler<HTMLInputElement>;
    option: Weather | Visibility;
  }) => {
    return (
      <div className='flex gap-1'>
        <label htmlFor={option}>{option}</label>
        <input
          type='radio'
          value={option}
          id={option}
          onChange={handleFunction}
          checked={category === option}
        />
      </div>
    );
  };

  return (
    <>
      <h2>Add new Entry</h2>

      <form onSubmit={handleSubmit} className='mb-4'>
        <div className='mb-4'>
          <label
            htmlFor='date'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            date
          </label>
          <input
            type='date'
            value={date}
            id='date'
            onChange={handleDate}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='text-gray-700 text-sm font-bold mb-2'>visibility</div>
        <div className='flex gap-2 mb-4'>
          <RadioInputField
            category={visibility}
            handleFunction={onVisibilityChange}
            option={Visibility.Great}
          />
          <RadioInputField
            category={visibility}
            handleFunction={onVisibilityChange}
            option={Visibility.Good}
          />
          <RadioInputField
            category={visibility}
            handleFunction={onVisibilityChange}
            option={Visibility.Ok}
          />
          <RadioInputField
            category={visibility}
            handleFunction={onVisibilityChange}
            option={Visibility.Poor}
          />
        </div>
        <div className='text-gray-700 text-sm font-bold mb-2'>weather</div>
        <div className='flex gap-2 mb-4'>
          <RadioInputField
            category={weather}
            handleFunction={onWeatherChange}
            option={Weather.Sunny}
          />
          <RadioInputField
            category={weather}
            handleFunction={onWeatherChange}
            option={Weather.Rainy}
          />
          <RadioInputField
            category={weather}
            handleFunction={onWeatherChange}
            option={Weather.Cloudy}
          />
          <RadioInputField
            category={weather}
            handleFunction={onWeatherChange}
            option={Weather.Stormy}
          />
          <RadioInputField
            category={weather}
            handleFunction={onWeatherChange}
            option={Weather.Windy}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='comment'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            comment
          </label>
          <input
            type='text'
            value={comment}
            id='comment'
            onChange={(e) => setComment(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          add
        </button>
      </form>
    </>
  );
}

export default AddDiaryForm;
