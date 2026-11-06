import { Link } from '@tanstack/react-router';
import { useReducer } from 'react';

import { GardenPlot } from './GardenPlot';
import { strawberryGarden, wildflowerGarden } from './garden-data';
import { gardenReducer, initialGardenState, MAX_PLANTED_FLOWERS } from './garden-state';
import './botanical.css';

export function BotanicalPage() {
  const [garden, dispatch] = useReducer(gardenReducer, initialGardenState);
  const isFull = garden.plants.length >= MAX_PLANTED_FLOWERS;
  const latestPlant = garden.plants.at(-1);
  const status = isFull
    ? 'The garden is full. Regrow to make room for more flowers.'
    : latestPlant
      ? `Flower ${garden.plants.length} planted in the ${latestPlant.side === 'wildflowers' ? 'wildflower' : 'strawberry'} garden.`
      : garden.cycle > 0
        ? 'Both gardens are growing again.'
        : 'Select a blossom to plant another nearby.';

  return (
    <div className="botanical-page">
      <div className="botanical-toolbar">
        <div>
          <strong>The Living Page</strong>
          <span className="botanical-hint"> / A botanical experiment</span>
        </div>
        <div className="botanical-toolbar-actions">
          <Link className="botanical-back-link" to="/">
            Back to portfolio <span aria-hidden="true">↗</span>
          </Link>
          <div className="botanical-controls" role="group" aria-label="Garden controls">
            <button type="button" disabled={isFull} onClick={() => dispatch({ type: 'plant' })}>
              <span aria-hidden="true">✳</span> Plant a flower
            </button>
            <button type="button" onClick={() => dispatch({ type: 'regrow' })}>
              <span aria-hidden="true">↻</span> Regrow
            </button>
          </div>
        </div>
      </div>
      <p className="botanical-status" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>

      <main className="botanical-sheet" aria-labelledby="botanical-title">
        <header className="botanical-masthead">
          <div>No. 01</div>
          <div>
            <span aria-hidden="true">✦</span>
            <span>Hortus</span>
            <span aria-hidden="true">✦</span>
          </div>
          <div>2026</div>
        </header>

        <section
          className="botanical-plate"
          aria-label="Botanical illustration and editorial"
        >
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
              You may tend this garden yourself. Plant another blossom with the
              little button above, or touch a flower and watch a new one grow
              nearby.
            </p>
            <p className="botanical-indent">
              When the page grows still, begin again. You will find the same lines
              and curves, yet the unfolding remains a small delight.
            </p>
            <div className="botanical-ornament" aria-hidden="true">❦</div>
            <p className="botanical-colophon">
              An original study in paper, ink,
              <br />
              motion &amp; the poetry of the web.
            </p>
          </article>

          <div className="botanical-gardens">
            <GardenPlot
              key={`wildflowers-${garden.cycle}`}
              garden={wildflowerGarden}
              label="Vintage botanical engraving of wildflowers, with finely veined leaves and five-petalled blossoms"
              caption="I. Wildflowers"
              flowerName="wildflower"
              plants={garden.plants.filter((plant) => plant.side === 'wildflowers')}
              isFull={isFull}
              onPlant={(blossom) => dispatch({ type: 'plant', source: { side: 'wildflowers', blossom } })}
            />
            <GardenPlot
              key={`strawberries-${garden.cycle}`}
              garden={strawberryGarden}
              label="Vintage botanical engraving of strawberry vines, with serrated leaves, small blossoms and seeded fruit"
              caption="II. Strawberries"
              flowerName="strawberry blossom"
              plants={garden.plants.filter((plant) => plant.side === 'strawberries')}
              isFull={isFull}
              onPlant={(blossom) => dispatch({ type: 'plant', source: { side: 'strawberries', blossom } })}
            />
          </div>
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
