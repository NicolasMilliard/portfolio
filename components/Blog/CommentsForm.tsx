import { FC, useState, useEffect } from 'react';
import { submitComment } from '../../services/submitComment';

interface Props {
  slug: string;
}

interface FormData {
  name: string;
  email: string;
  comment?: string;
  storeData: boolean | string;
}

const CommentsForm: FC<Props> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState<{}>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    comment: '',
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData: FormData = {
      name: window.localStorage.getItem('name')!,
      email: window.localStorage.getItem('email')!,
      storeData: window.localStorage.getItem('name')! || window.localStorage.getItem('email')!,
    };
    setFormData(initialFormData);
  }, []);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setError(false);
    setShowSuccessMessage(false);

    const { target } = e;
    if (e.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: (target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleCommentSubmission = () => {
    setError(false);
    setShowSuccessMessage(false);

    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
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

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
        }
        formData.comment = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
      }
    });
  };

  return (
    <div className="bg-white-100 rounded-2xl p-8 mb-8">
      <h3 className="text-xl text-black font-semibold mb-6">Leave a reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 mb-4 outline-none w-full rounded-2xl focus:ring-2 focus:ring-green-500 bg-white-500 text-black"
          placeholder="Comment"
          name="comment"
          value={formData.comment}
          onChange={onInputChange}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          className="p-4 mb-4 outline-none w-full rounded-2xl focus:ring-2 focus:ring-green-500 bg-white-500 text-black"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
        />
        <input
          type="email"
          className="p-4 mb-4 outline-none w-full rounded-2xl focus:ring-2 focus:ring-green-500 bg-white-500 text-black"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            id="storeData"
            name="storeData"
            defaultChecked={true}
            onChange={onInputChange}
          />
          <label htmlFor="storeData" className="select-none cursor-pointer text-black ml-2">
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && <p className="text-red font-semibold">All fields are required.</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="bg-green-500 text-white-500 py-4 px-6 font-semibold rounded-2xl shadow hover:bg-green-900 ease-in-out duration-300"
        >
          Post comment
        </button>
        {showSuccessMessage && (
          <p className="text-green-500 font-semibold mt-4">Comment submitted for review!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
