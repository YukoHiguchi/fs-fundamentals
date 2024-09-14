import { NewDiaryEntry, DiaryEntry } from '../types/diary';

import axios from 'axios';
const baseUrl = '/api/diaries';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, object);
  return data;
};

export default {
  getAll,
  create,
};
