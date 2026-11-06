import { CLUE_NUMBERS } from './protocol';

export function LotteryTicket() {
  return (
    <img
      className="lottery-ticket"
      data-inspection-content=""
      src="/images/lost/lottery-ticket-damaged-v3.webp"
      width={800}
      height={1000}
      alt={`A weathered Mega Lotto Jackpot ticket with torn edges and water damage. Only ${CLUE_NUMBERS.lottery[0]} and the Mega Number ${CLUE_NUMBERS.lottery[1]} are legible.`}
      decoding="async"
    />
  );
}
