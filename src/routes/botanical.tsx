import { createFileRoute } from '@tanstack/react-router';

import { BotanicalPage } from '../features/botanical/BotanicalPage';
import { botanicalSeo, seoToRouteHead } from '../seo';

export const Route = createFileRoute('/botanical')({
  head: () => seoToRouteHead(botanicalSeo),
  component: BotanicalPage,
});
