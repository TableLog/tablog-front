'use client';

import FilterRecipes from './filter-recipes';

const HomePage = () => {
  return (
    <div className="min-h-[calc(100dvh-60px)] pb-[72px]">
      <section className="py-4">
        <FilterRecipes />
      </section>
    </div>
  );
};

export default HomePage;
