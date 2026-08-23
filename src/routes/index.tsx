import { createFileRoute } from '@tanstack/react-router';

import App from '../App';
import { homeSeo, seoToRouteHead } from '../seo';

export const Route = createFileRoute('/')({
  head: () => seoToRouteHead(homeSeo),
  component: App,
});
