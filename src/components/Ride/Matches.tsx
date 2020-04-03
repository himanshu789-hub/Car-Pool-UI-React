import * as React from "react";
import OfferCard from "../OfferCard/OfferCard";
import { Book } from "../../Service/BookingService";
import { Offer } from "./../../Service/OfferringService";

interface IMatches {
  offers: Array<Offer>;
  book: Book;
}
function Matches(props: IMatches) {
  let { offers, book } = props;
  console.log(
    offers.map((e, index) => {
      return (
        <OfferCard
          bookRequest={book}
          isOnUpdate={false}
          key={index + ""}
          offer={e}
        ></OfferCard>
      );
    })
  );
  const offersRender = offers.map((e, index) => {
    return (
      <OfferCard
        bookRequest={book}
        isOnUpdate={false}
        key={index + ""}
        offer={e}
      ></OfferCard>
    );
  });

  return (
    <div id="matches">
      <div id="matchesLabel">Your Matches</div>
      <div id="allmatches">{offersRender}</div>
    </div>
  );
}

export default Matches;
