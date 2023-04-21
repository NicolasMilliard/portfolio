import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Comments } from '../../components/Blog';
import { getComments } from '../../services/getComments';

jest.mock('../../services/getComments');

describe('Comments', () => {
  const mockGetComments = getComments as jest.MockedFunction<typeof getComments>;

  const mockedComments = [
    {
      name: 'Alice',
      createdAt: 'on Jan 01, 2023',
      comment: 'Comment 1',
    },
    {
      name: 'Bob',
      createdAt: '2023-01-02',
      comment: 'on Jan 02, 2023',
    },
  ];

  it('should render a list of comments', async () => {
    mockGetComments.mockResolvedValue(mockedComments);

    render(<Comments slug="post-1" />);

    await screen.findByRole('heading', {
      level: 3,
      name: `${mockedComments.length} comments`,
    });

    const comments = screen.getByText(`${mockedComments.length} comments`);

    expect(comments).toBeInTheDocument();
  });

  it('should render a comment with the name, createdAt and comment', async () => {
    mockGetComments.mockResolvedValue(mockedComments);

    render(<Comments slug="post-1" />);

    await screen.findByText(mockedComments[0].name);
    await screen.findByText(mockedComments[0].comment);
    const createdAt = screen.getByText(mockedComments[0].createdAt);

    expect(createdAt).toBeInTheDocument();
  });
});
