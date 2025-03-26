import React from 'react';
import { render, screen } from '@testing-library/react';

import Navigation from '@/components/organisms/navigation/Navigation';

describe('Navigation', () => {
  test('renders all navigation menu items with correct text', () => {
    render(<Navigation />);

    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('레시피')).toBeInTheDocument();
    expect(screen.getByText('피드')).toBeInTheDocument();
    expect(screen.getByText('MY')).toBeInTheDocument();
  });

  test('renders the active menu with correct icon and color class', () => {
    const { container } = render(<Navigation />);

    const homeIcon = container.querySelector('.bx-home-smile');
    expect(homeIcon).toBeInTheDocument();
    expect(homeIcon?.className).toContain('text-primary01');
  });
});
