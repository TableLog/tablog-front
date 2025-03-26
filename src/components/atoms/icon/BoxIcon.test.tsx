import React from 'react';
import { render, screen } from '@testing-library/react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';

describe('BoxIcon', () => {
  test('renders box icon with correct name, color, and size', () => {
    render(<BoxIcon name="home-smile" color="primary01" size={50} data-testid="boxicon" />);

    const icon = screen.getByRole('icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('bx', 'bx-home-smile');
    expect(icon).toHaveStyle({
      color: 'primary01',
      fontSize: 50,
    });
  });

  test('renders icon with animation and rotation', () => {
    render(
      <BoxIcon name="happy" animation="spin" rotate="90" flip="horizontal" data-testid="boxicon" />,
    );

    const icon = screen.getByRole('icon');

    expect(icon).toHaveClass(
      'bx',
      'bx-happy',
      'bx-rotate-90',
      'bx-flip-horizontal',
      'bx-spin',
      'bx-spin-hover',
    );
  });
});
