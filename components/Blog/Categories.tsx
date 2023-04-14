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
    <div>
      <h3>Categories</h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
