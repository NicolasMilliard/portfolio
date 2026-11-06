import { createFileRoute } from '@tanstack/react-router';

import { BotanicalPage } from '../features/botanical/BotanicalPage';
import { seoToRouteHead } from '../seo';

export const Route = createFileRoute('/botanical')({
  head: () => seoToRouteHead({
    title: 'The Living Garden — Nicolas Milliard',
    description: 'A botanical study in paper, ink, and the poetry of the web. Drawn with code.',
    robots: 'noindex, follow',
  }),
  component: BotanicalPage,
});
