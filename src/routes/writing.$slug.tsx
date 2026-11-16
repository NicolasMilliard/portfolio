import { createFileRoute, notFound } from "@tanstack/react-router";

import { loadWriting } from "../content/writings";
import type { WritingWithContent } from "../content/writings";
import { WritingPage } from "../features/writing/WritingPage";
import { getWritingSeo, notFoundSeo, seoToRouteHead } from "../seo";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }): Promise<WritingWithContent> => {
    const writing = await loadWriting(params.slug);

    if (!writing) {
      // oxlint-disable-next-line typescript/only-throw-error -- TanStack Router catches this routing sentinel.
      throw notFound();
    }

    return writing;
  },
  head: ({ loaderData }) =>
    seoToRouteHead(loaderData ? getWritingSeo(loaderData) : notFoundSeo),
  component: WritingRoute,
});

function WritingRoute() {
  const writing = Route.useLoaderData();

  return <WritingPage writing={writing} />;
}
