import { render, screen } from '@testing-library/react';

import Button from './Button';

test('renders ProgressBar component', () => {
  render(<Button />);
  const progressBar = screen.getByRole('button-component');
  expect(progressBar).toBeInTheDocument();
});
