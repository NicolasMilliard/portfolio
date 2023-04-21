import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../components/Buttons/Button';

describe('Button', () => {
  it('should render a button with the correct text and link', () => {
    const text: string = 'Contact me';
    const link: string = 'mailto:contact@nicolasmilliard.fr';
    const target: string = '_self';

    render(<Button text={text} link={link} target={target} />);

    const button = screen.getByRole('link', { name: text }) as HTMLAnchorElement;

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', link);
    expect(button).toHaveAttribute('target', target);
  });
});
