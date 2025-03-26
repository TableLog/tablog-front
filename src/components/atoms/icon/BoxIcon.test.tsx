import React from 'react';
import { render, screen } from '@testing-library/react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';

test('renders box icon - 50px blue home smile icon', () => {
  render(<BoxIcon name="home-smile" color="blue" size="50px" data-testid="boxicon" />);
  const icon = screen.getByTestId('boxicon');

  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute('name', 'home-smile');
  expect(icon).toHaveAttribute('color', 'blue');
  expect(icon).toHaveAttribute('size', '50px');
});
