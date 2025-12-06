import { useMutation } from '@tanstack/react-query';

import { report } from '@/apis/report.api';
import { IMutationOptions, IReportParams } from '@/types/api';

// 신고
export function useReport(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (params: IReportParams) => report(params),
    ...options,
  });
}
