import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonDisabled from '../../components/Buttons/ButtonDisabled';

describe('Button', () => {
  it('should render a disabled button with the correct text', () => {
    const text: string = 'Disabled';

    render(<ButtonDisabled text={text} />);

    const buttonDisabled = screen.getByRole('button', { name: text }) as HTMLAnchorElement;

    expect(buttonDisabled).toBeInTheDocument();
    expect(buttonDisabled).toHaveClass('cursor-not-allowed');
    expect(buttonDisabled).toHaveTextContent(text);
  });
});
