import type { FC } from 'react';

import { testimonialsList } from '../../pages/api/testimonialsList';

const Testimonials: FC = () => {
  return (
    <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <h2 className="text-3xl text-black font-bold leading-relaxed">Testimonials</h2>
      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        {testimonialsList.map((review) => (
          <div key={review.id} className="bg-white-100 rounded-2xl py-4 px-6 shadow max-w-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl text-green-500 font-semibold">{review.name}</h3>
              <p className="text-black opacity-60 text-sm">{review.date}</p>
            </div>
            <p className="text-black italic mt-2">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
