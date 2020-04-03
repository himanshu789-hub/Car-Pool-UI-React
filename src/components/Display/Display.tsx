import * as React from "react";
import UserService, { User } from "../../Service/UserService";
import "./css/display.css";
import OfferService from "../../Service/OfferringService";
import BookService from "../../Service/BookingService";
import BookCard from "../BookCard/BookCard";
type DisplayProps = {
	history?: any;
	id?: string;
};

export default class Display extends React.Component<DisplayProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		const id = this.props.id;
		let allOfferByUserId = OfferService.GetByUserId(id);
		let getAllBookingOfAOffer = allOfferByUserId
			.map(e => BookService.Books.filter(b => b.OfferId == e.Id))
			.reduce(function(previous, current) {
				return previous.concat(current);
			});

		return (
			<div id="display">
				<div id="bookRide" key={1}>
					<p>Booked rides</p>
					{BookService.GetByUserId(this.props.id).map(e => {
						if (e.Active) return <BookCard isOnUpdate={true} book={e}></BookCard>;
					})}
				</div>
				<div id="offerRide" key={2}>
					<p>Offered rides</p>
					{getAllBookingOfAOffer.map(e => {
						if (e.Active) return <BookCard isOnUpdate={false} book={e}></BookCard>;
					})}
				</div>
			</div>
		);
	}
}
