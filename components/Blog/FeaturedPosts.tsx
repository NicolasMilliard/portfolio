import { FC, useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import FeaturedPostCard from './FeaturedPostCard';
import { getFeaturedPosts } from '../../services/getFeaturedPosts';

interface Post {
  featuredImage: {
    url: string;
  };
  createdAt: string;
  title: string;
  author: {
    name: string;
    photo: {
      url: string;
    };
  };
  slug: string;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts: FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  return (
    <div className="mb-8">
      <Carousel infinite responsive={responsive} itemClass="px-4">
        {dataLoaded &&
          featuredPosts.map((post, index) => <FeaturedPostCard key={index} post={post} />)}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
