import React from 'react';
import { render, screen } from '@testing-library/react';

import { Text } from '@/components/atoms/text/Text';

describe('Text', () => {
  test('renders with children and default styles', () => {
    render(<Text>테스트 텍스트</Text>);
    const element = screen.getByRole('text');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('테스트 텍스트');
    expect(element).toHaveClass('text-sm', 'font-normal', 'leading-[1.5]');
  });

  test('renders with custom props', () => {
    render(
      <Text fontSize={48} fontWeight="bold" color="primary01">
        큰 텍스트
      </Text>,
    );
    const element = screen.getByRole('text');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('큰 텍스트');
    expect(element).toHaveClass('text-5xl', 'font-bold', 'text-primary01', 'leading-[1.5]');
  });
});
