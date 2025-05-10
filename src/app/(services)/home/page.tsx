'use client';

import React from 'react';

import { useLogout } from '@/hooks/auth.hooks';

const Logout = () => {
  const { mutate: logout } = useLogout();

  return <button onClick={() => logout()}>로그아웃</button>;
};

const Home = () => {
  return (
    <div>
      <p>Home Page</p>

      <Logout />
    </div>
  );
};

export default Home;
