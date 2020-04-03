import OfferService, { Offer } from "../../../Service/OfferringService";
import { compareDate } from "../../../utilities/util";

var RouteService = {
	ShowOffersUnderRangeWithRequestedSeats: function(
		Soure: string,
		Destination: string,
		timeInterval: string,
		numberOfSeats: number,
		date: string,
		userId: string
	): Array<Offer> {
		return [
			...OfferService.Offers.filter(
				e =>
					e.Active &&
					e.Id != userId &&
					compareDate(e.date, date) == 0 &&
					e.timeInterval == timeInterval &&
					e.SeatsAvailable >= numberOfSeats &&
					RouteService.IsUnderRange(e.ViaPoints, Soure, Destination, e.from, e.to)
			)
		];
	},
	IsUnderRange: function(
		ViaPoints: Array<string>,
		Soure: String,
		Destination: string,
		from: string,
		to: string
	) {
		let route: Array<string> = [from, ...ViaPoints.map(e => e), to];
		let sourceIndex = route.findIndex(e => e == Soure);
		let destinationIndex = route.findIndex(e => e == Destination);
		if (sourceIndex < destinationIndex) return true;

		return false;
	}
};
export default RouteService;
