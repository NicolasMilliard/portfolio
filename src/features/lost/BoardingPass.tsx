import { CLUE_NUMBERS, OCEANIC_FLIGHT } from './protocol';

export function BoardingPass({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`oceanic-ticket${compact ? ' oceanic-ticket-compact' : ''}`}
    >
      <div className="oceanic-ticket-main">
        <div className="oceanic-ticket-brand">
          <span className="oceanic-emblem" aria-hidden="true">
            ◒
          </span>{' '}
          OCEANIC AIRLINES<span>BOARDING PASS</span>
        </div>
        <div className="oceanic-ticket-route">
          <span>
            SYD<small>SYDNEY</small>
          </span>
          <span className="oceanic-ticket-flight">
            {OCEANIC_FLIGHT}
            <small>FLIGHT</small>
          </span>
          <span>
            LAX<small>LOS ANGELES</small>
          </span>
        </div>
        <div className="oceanic-ticket-fields">
          <div>
            <span>GATE</span>
            <strong>{CLUE_NUMBERS.ticket[0]}</strong>
          </div>
          <div>
            <span>SEAT</span>
            <strong>{CLUE_NUMBERS.ticket[1]}</strong>
          </div>
          <div className="oceanic-ticket-passenger">
            <span>PASSENGER</span>
            <b>JACK SHEPHARD</b>
            <small>ONE WAY / NO RETURN</small>
          </div>
        </div>
        <div className="oceanic-ticket-bottom">
          <span>KEEP THIS PORTION FOR YOUR RECORDS</span>
          <i className="oceanic-barcode" aria-hidden="true" />
        </div>
      </div>
      <div className="oceanic-ticket-stub" aria-hidden="true">
        <span>OCEANIC</span>
        <b>{OCEANIC_FLIGHT}</b>
        <span>SYD → LAX</span>
        <i className="oceanic-barcode" />
      </div>
    </div>
  );
}
