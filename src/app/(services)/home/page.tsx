'use client';

import HomeTabs from './home-tabs';

const HomePage = () => {
  return (
    <div className="min-h-[calc(100dvh-60px)] pb-[72px]">
      <section className="py-4">
        <HomeTabs />
      </section>
    </div>
  );
};

export default HomePage;
