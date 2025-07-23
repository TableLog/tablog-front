import { REPORT_URL } from '@/constants/endpoint.constants';
import { IReportParams } from '@/types/api';
import instance from '@/utils/axios';

export const report = async (data: IReportParams) => {
  try {
    return await instance.post(REPORT_URL, data);
  } catch (error) {
    throw error;
  }
};
