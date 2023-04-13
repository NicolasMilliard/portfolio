import { FC, useState, useEffect, useRef } from 'react';
import { submitComment } from '../../services/submitComment';

interface Props {
  slug: string;
}

const CommentsForm: FC<Props> = ({ slug }) => {
  const [error, setError] = useState<boolean>(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement>();
  const nameEl = useRef<HTMLInputElement>();
  const emailEl = useRef<HTMLInputElement>();
  const storeDataEl = useRef<HTMLInputElement>();

  useEffect(() => {
    nameEl.current!.value = window.localStorage.getItem('name')!;
    emailEl.current!.value = window.localStorage.getItem('email')!;
  }, []);

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObj).then(() => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white-100 p-8 mb-8">
      <h3 className="text-xl">Leave a reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-green-500 bg-white-500 text-black"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-green-500 bg-white-500 text-black"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-green-500 bg-white-500 text-black"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            defaultChecked={true}
          />
          <label htmlFor="storeData" className="select-none cursor-pointer ml-2">
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && <p className="text-xs">All fields are required.</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="bg-green-500 text-white-500 py-4 px-6 font-semibold rounded-2xl shadow hover:bg-green-900 ease-in-out duration-300"
        >
          Post comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl font-semibold text-green-500">
            Comment submitted for review!
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
