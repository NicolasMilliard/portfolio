import { createFileRoute } from '@tanstack/react-router';

import { HomePage } from '../features/home/HomePage';
import { homeSeo, seoToRouteHead } from '../seo';

export const Route = createFileRoute('/')({
  head: () => seoToRouteHead(homeSeo),
  component: HomePage,
});
