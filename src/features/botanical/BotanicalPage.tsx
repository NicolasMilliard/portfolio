import { Link } from '@tanstack/react-router';

import { GardenPlot } from './GardenPlot';
import { strawberryGarden, wildflowerGarden } from './garden-data';
import './botanical.css';

export function BotanicalPage() {
  return (
    <div className="botanical-page">
      <div className="botanical-toolbar">
        <div>
          <strong>The Living Page</strong>
          <span className="botanical-hint"> / A botanical experiment</span>
        </div>
        <Link className="botanical-back-link" to="/">
          Back to portfolio <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <main className="botanical-sheet" aria-labelledby="botanical-title">
        <header className="botanical-masthead">
          <div>No. 01</div>
          <div>✦ &nbsp; H O R T U S &nbsp; ✦</div>
          <div>2026</div>
        </header>

        <section
          className="botanical-plate"
          aria-label="Botanical illustration and editorial"
        >
          <GardenPlot
            garden={wildflowerGarden}
            label="Vintage botanical engraving of wildflowers, with finely veined leaves and five-petalled blossoms"
          />

          <article className="botanical-essay">
            <p className="botanical-eyebrow">An exercise in patience</p>
            <h1 id="botanical-title">The Living Garden</h1>
            <p className="botanical-byline">On the art of making things grow</p>

            <p className="botanical-drop">
              There is a quiet beauty in the things that grow slowly. A stem
              uncurls, a leaf finds its shape, and, given enough light, a flower
              will bloom.
            </p>
            <p className="botanical-indent">
              This little garden has been cultivated in the browser, from nothing
              but lines, shapes and a bit of patience. There are no photographs
              here; only a handful of curves that have learned to behave like
              nature.
            </p>
            <p className="botanical-indent">
              In an age of magnificent machines, we sometimes forget the pleasure
              of making a small thing with care.
            </p>

            <h2>I. The First Seed</h2>
            <p className="botanical-indent">
              Every garden begins with an almost invisible gesture. A line drawn
              across a page, a thought written in a notebook, a single decision to
              begin.
            </p>
            <p className="botanical-indent">
              The stems rise from the bottom of the frame. Branches reach outward,
              tracing their familiar curves before a leaf appears. Soon the white
              blossoms open, one after another, in the pale afternoon.
            </p>

            <div className="botanical-ornament" aria-hidden="true">✳</div>
            <p className="botanical-indent">
              What looks like a drawing is also a living sequence. Each piece has
              its own rhythm, and no flower needs to bloom at precisely the same
              time as its neighbour.
            </p>
            <blockquote className="botanical-pull">
              “Make room for the little details; they are where the wonder lives.”
            </blockquote>

            <h2>II. The Wild Things</h2>
            <p className="botanical-indent">
              The loveliest gardens are rarely the most orderly. Their vines wander
              and their blossoms turn towards unexpected corners.
            </p>
            <p className="botanical-indent">
              On one side, the wildflowers spread their open faces; on the other,
              the strawberry leaves gather around their fruit. Their forms belong
              to an older language of botanical drawings, all fine ink and soft
              paper.
            </p>
            <p className="botanical-indent">
              Move close. Look at the small veins within the leaves, the narrow
              lines on the petals, the tiny seeds in the fruit. All of it has been
              assembled from simple instructions.
            </p>

            <h2>III. A Gentle Experiment</h2>
            <p className="botanical-indent">
              A garden rewards a second look. Follow a stem through the leaves,
              trace the edge of a blossom, and notice how much can grow from a
              single line.
            </p>
            <p className="botanical-indent">
              Return to the smallest details. You will find the same lines and
              curves, yet the drawing remains a small delight.
            </p>
            <div className="botanical-ornament" aria-hidden="true">❦</div>
            <p className="botanical-colophon">
              An original study in paper, ink,
              <br />
              &amp; the poetry of the web.
            </p>
          </article>

          <GardenPlot
            garden={strawberryGarden}
            label="Vintage botanical engraving of strawberry vines, with serrated leaves, small blossoms and seeded fruit"
          />
        </section>

        <footer className="botanical-bottomline">
          <span>Drawn with code</span>
          <span>— &nbsp; 01 &nbsp; —</span>
          <span>Est. MMXXVI</span>
        </footer>
      </main>
    </div>
  );
}
