import UserService from "./UserService";
import { TimeInterval, Cities } from "../ServiceData/data";

export class Offer {
	Id?: string;
	UserId: string;
	seats: number;
	from: string;
	to: string;
	TotalEarn?: number;
	price: number;
	timeInterval: string;
	ViaPoints: Array<string>;
	Active: boolean;
	SeatsAvailable: number;
	date?: string;
}

var OfferService = {
	Offers: new Array<Offer>(),
	Create: function(Offer: Offer): Offer {
		Offer.Id = OfferService.Offers.length + 1 + "";
		OfferService.Offers.push(Offer);
		return { ...OfferService.Offers.find(e => e.Id == Offer.Id) };
	},
	Update: function(offer: Offer): Offer {
		var tempOffer = OfferService.Offers.filter(e => e.Id == offer.Id)[0];
		tempOffer = { ...offer };
		tempOffer.Active = true;
		OfferService.Offers[
			OfferService.Offers.findIndex(e => e.Id == offer.Id)
		] = tempOffer;
		return tempOffer;
	},
	Delete: function(Id: string): boolean {
		OfferService.Offers.filter(e => e.Id == Id)[0].Active = false;
		return true;
	},
	GetAll: function(): Array<Offer> {
		return [...OfferService.Offers];
	},
	GetById: function(Id: string): Offer {
		return { ...OfferService.Offers.find(e => e.Id == Id) };
	},
	GetByUserId: function(userId: string) {
		return [...OfferService.Offers.filter(e => e.UserId == userId)];
	},
	AddARide: function(
		Id: string,
		seatsRequired: number,
		farePrice: number
	): boolean {
		var offers = OfferService.Offers;
		var offer = offers[offers.findIndex(e => e.Id == Id)];
		offer.SeatsAvailable -= seatsRequired;
		offer.TotalEarn += farePrice;
		return true;
	},
	RemoveARide: function(offerId: string, seats: number, farePrice) {
		var offers = OfferService.Offers;
		var offer = offers[offers.findIndex(e => e.Id == offerId)];
		offer.SeatsAvailable += seats;
		offer.TotalEarn -= farePrice;
		return true;
	}
};
OfferService.Create({
	Active: true,
	timeInterval: TimeInterval[0],
	to: Cities[1],
	price: 108,
	seats: 5,
	from: Cities[5],
	UserId: UserService.Users[0].id,
	ViaPoints: [Cities[3], Cities[4]],
	SeatsAvailable: 3,
	date: "31/03/2020"
});

OfferService.Create({
	Active: true,
	timeInterval: TimeInterval[2],
	to: Cities[4],
	price: 198,
	seats: 4,
	from: Cities[3],
	UserId: UserService.Users[1].id,
	ViaPoints: [Cities[1], Cities[0]],
	SeatsAvailable: 4,
	date: "31/03/2020"
});

OfferService.Create({
	Active: true,
	timeInterval: TimeInterval[0],
	to: Cities[1],
	price: 90,
	seats: 3,
	from: Cities[3],
	UserId: UserService.Users[3].id,
	ViaPoints: [Cities[1], Cities[0]],
	SeatsAvailable: 3,
	date: "31/03/2020"
});
OfferService.Create({
	Active: true,
	timeInterval: TimeInterval[0],
	to: Cities[1],
	price: 90,
	seats: 3,
	from: Cities[3],
	UserId: UserService.Users[4].id,
	ViaPoints: [Cities[1], Cities[0]],
	SeatsAvailable: 3,
	date: "31/03/2020"
});

OfferService.Create({
	Active: true,
	timeInterval: TimeInterval[0],
	to: Cities[1],
	price: 90,
	seats: 3,
	from: Cities[3],
	UserId: UserService.Users[5].id,
	ViaPoints: [Cities[1], Cities[0]],
	SeatsAvailable: 3,
	date: "31/03/2020"
});

OfferService.Create({
	Active: true,
	timeInterval: TimeInterval[0],
	to: Cities[1],
	price: 90,
	seats: 3,
	from: Cities[3],
	UserId: UserService.Users[5].id,
	ViaPoints: [Cities[1], Cities[0]],
	SeatsAvailable: 3,
	date: "31/03/2020"
});
   
export default OfferService;
