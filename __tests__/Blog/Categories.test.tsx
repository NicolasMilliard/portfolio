import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Categories } from '../../components/Blog';
import { getCategories } from '../../services/getCategories';

jest.mock('../../services/getCategories');

describe('Categories', () => {
  const mockGetCategories = getCategories as jest.MockedFunction<typeof getCategories>;

  const mockedCategories = [
    { name: 'Category 1', slug: 'category-1' },
    { name: 'Category 2', slug: 'category-2' },
  ];

  it('should render a list of categories', async () => {
    mockGetCategories.mockResolvedValue(mockedCategories);

    render(<Categories />);

    const categories = await screen.findAllByRole('link');

    expect(categories).toHaveLength(2);
    expect(categories[0]).toHaveTextContent('Category 1');
    expect(categories[1]).toHaveTextContent('Category 2');
  });

  it('should render a category link with the correct href attribute', async () => {
    mockGetCategories.mockResolvedValue(mockedCategories);

    render(<Categories />);

    const categories = await screen.findAllByRole('link');

    expect(categories[0]).toHaveAttribute('href', '/category/category-1');
    expect(categories[1]).toHaveAttribute('href', '/category/category-2');
  });
});
