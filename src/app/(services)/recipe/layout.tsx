import React from 'react';

const RecipeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="relative px-5 py-4">{children}</div>;
};

export default RecipeLayout;
