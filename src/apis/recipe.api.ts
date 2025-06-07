import { RECIPE_URL } from '@/constants/endpoint.constants';
import instance from '@/utils/axios';

export const addRecipe = async (formdata: FormData) => {
  try {
    return await instance.post(RECIPE_URL, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw error;
  }
};
