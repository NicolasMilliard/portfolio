import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../../services/getCategories';

interface Categories {
  name: string;
  slug: string;
}

const Categories: FC = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="bg-white-100 p-8 mb-8 rounded-2xl">
      <h3 className="text-xl text-black font-semibold mb-6">Categories</h3>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="text-black underline hover:text-green-500 duration-100"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
