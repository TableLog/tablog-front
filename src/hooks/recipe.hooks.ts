import { useMutation } from '@tanstack/react-query';

import { addRecipe } from '@/apis/recipe.api';
import { IMutationOptions } from '@/types/api';

export function useAddRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => addRecipe(formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
