import React from 'react';
import { render, screen } from '@testing-library/react';

import NavigationMenu from '@/components/molecules/navigation-menu/NavigationMenu';

describe('NavigationMenu', () => {
  test('renders icon and text with active color when isActive is true', () => {
    render(<NavigationMenu isActive={true} menuName="홈" iconName="home-smile" />);

    const icon = screen.getByRole('icon');
    const text = screen.getByRole('text');

    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();

    // className 확인
    expect(icon.className).toContain('text-primary01');
    expect(text.className).toContain('text-primary01');
  });

  test('renders icon and text with inactive color when isActive is false', () => {
    render(<NavigationMenu isActive={false} menuName="홈" iconName="home-smile" />);

    const icon = screen.getByRole('icon');
    const text = screen.getByRole('text');

    expect(icon.className).toContain('text-grey04');
    expect(text.className).toContain('text-grey04');
  });
});
