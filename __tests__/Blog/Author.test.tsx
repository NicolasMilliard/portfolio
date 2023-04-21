import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Author } from '../../components/Blog';

describe('Author', () => {
  const author = {
    name: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet',
    photo: {
      url: 'https://example.com/photo.jpg',
    },
  };
  it('should render an Image with the author photo', () => {
    render(<Author author={author} />);

    const authorPhoto = screen.getByRole('img', { name: author.name });
    expect(authorPhoto).toBeInTheDocument();
    expect(authorPhoto).toHaveAttribute('alt', author.name);
    expect(authorPhoto).toHaveAttribute('width', '100');
    expect(authorPhoto).toHaveAttribute('height', '100');
    expect(authorPhoto.getAttribute('src')).toMatch(/^\/_next\/image\?url=.+$/);
  });

  it('should render a title with the name of the author', () => {
    render(<Author author={author} />);

    const authorName = screen.getByRole('heading', { level: 3, name: author.name });
    expect(authorName).toBeInTheDocument();
    expect(authorName).toHaveTextContent(author.name);
  });

  it('should render a text with the bio of the author', () => {
    render(<Author author={author} />);

    const authorBio = screen.getByText(author.bio);
    expect(authorBio).toBeInTheDocument();
    expect(authorBio).toHaveTextContent(author.bio);
  });
});
