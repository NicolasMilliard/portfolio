import { FC, useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import { getComments } from '../../services/getComments';

interface Props {
  slug: string;
}

interface Comments {
  name: string;
  createdAt: string;
  comment: string;
}

const Comments: FC<Props> = ({ slug }) => {
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    getComments(slug).then((result: Comments[]) => setComments(result));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white-100 shadow-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8">
            {comments.length} {comments.length <= 1 ? 'comment' : 'comments'}
          </h3>
          {comments.map((comment: { createdAt: string; name: string; comment: string }) => (
            <div key={comment.createdAt} className="border-b border-black mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-black w-full">{parse(comment.comment)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
