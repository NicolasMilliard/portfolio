import { createFileRoute } from '@tanstack/react-router';

import { InformationPage } from '../components/InformationPage';
import { getInformationPage } from '../content/information';
import { getInformationSeo, seoToRouteHead } from '../seo';

const page = getInformationPage('/privacy');

export const Route = createFileRoute('/privacy')({
  head: () => seoToRouteHead(getInformationSeo(page)),
  component: () => <InformationPage page={page} />,
});
