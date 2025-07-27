import Image from 'next/image';

import { IRecipeProcessResponse } from '@/types/api';

interface SequenceProps {
  recipe: IRecipeProcessResponse['recipeProcesses'];
}

const Sequence = ({ recipe }: SequenceProps) => {
  return (
    <div className="flex gap-3">
      <div className="relative h-[90px] w-[90px] shrink-0">
        <div className="absolute left-1 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-sm bg-black01/50 text-sm font-semibold text-white01 backdrop-blur-3xl">
          {recipe.sequence + 1}
        </div>
        <Image
          src={recipe.recipeProcessImageUrls[0]}
          alt={`${recipe.rpTitle} 레시피`}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <div className="font-semibold">{recipe.rpTitle}</div>
        <div className="line-clamp-3">{recipe.description}</div>
      </div>
    </div>
  );
};

export default Sequence;
