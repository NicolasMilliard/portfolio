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
      <div className="flex flex-col">
        {categories.map((category) => (
          <h5 key={category.slug}>
            <Link
              href={`/category/${category.slug}`}
              className="text-lg text-semibold text-black hover:text-green-500 duration-100"
            >
              {category.name}
            </Link>
          </h5>
        ))}
      </div>
    </div>
  );
};

export default Categories;
