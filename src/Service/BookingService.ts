import OfferService from "./OfferringService";
import { Cities } from "../ServiceData/data";
import UserService from "./UserService";

export class Book {
	Id?: string; //X
	Source: string;
	Destination: string;
	FarePrice?: number;
	UserId: string;
	OfferId?: string;
	SeatsRequested: number;
	RequestTimeInterval: string;
	Active?: boolean;
	date?: string;
}

var BookService = {
	Books: new Array<Book>(),
	Create: function(book: Book): Book {
		book.Id = BookService.Books.length + 1 + "";
		book.Active = true;
		BookService.Books.push(book);
		return { ...BookService.Books.filter(e => e.Id == book.Id)[0] };
	},
	// Update: function (book: Book): Book {
	//     return [BookService.Books.filter(e => e.Id == book.Id)[0] = book));
	// },
	Delete: function(Id: string): boolean {
		BookService.Books[
			BookService.Books.indexOf(BookService.Books.filter(e => e.Id == Id)[0])
		].Active = false;
		const booking = BookService.Books.find(e => e.Id == Id);
		OfferService.RemoveARide(
			BookService.Books.find(e => e.Id == Id).OfferId,
			booking.SeatsRequested,
			booking.FarePrice
		);
		return true;
	},
	GetAll: function(): Array<Book> {
		return [...BookService.Books];
	},
	GetById: function(Id: string): Book {
		return { ...BookService.Books.filter(e => e.Id == Id)[0] };
	},
	GetByUserId(userId: string) {
		return [...BookService.Books.filter(e => e.UserId == userId)];
	},
	AddOffer(bookId: string, offerId: string) {
		BookService.Books.find(e => e.Id == bookId).OfferId = offerId;
		return true;
	},
	GetBookingByOfferId: function(offerId: string) {
		return [...BookService.Books.filter(e => e.OfferId == offerId)];
	}
};
BookService.Create({
	Active: true,
	Destination: Cities[4],
	FarePrice: OfferService.Offers[0].price,
	OfferId: OfferService.Offers[0].Id,
	SeatsRequested: 2,
	RequestTimeInterval: OfferService.Offers[0].timeInterval,
	Source: Cities[3],
	UserId: UserService.Users[2].id,
	date: "31/03/2020"
});

BookService.Create({
	Active: true,
	Destination: Cities[4],
	FarePrice: OfferService.Offers[0].price,
	OfferId: OfferService.Offers[0].Id,
	SeatsRequested: 2,
	RequestTimeInterval: OfferService.Offers[0].timeInterval,
	Source: Cities[3],
	UserId: UserService.Users[2].id,
	date: "31/03/2020"
});

BookService.Create({
	Active: true,
	Destination: Cities[4],
	FarePrice: OfferService.Offers[0].price,
	OfferId: OfferService.Offers[0].Id,
	SeatsRequested: 2,
	RequestTimeInterval: OfferService.Offers[0].timeInterval,
	Source: Cities[3],
	UserId: UserService.Users[9].id,
	date: "31/03/2020"
});

BookService.Create({
	Active: true,
	Destination: Cities[4],
	FarePrice: OfferService.Offers[0].price,
	OfferId: OfferService.Offers[0].Id,
	SeatsRequested: 2,
	RequestTimeInterval: OfferService.Offers[0].timeInterval,
	Source: Cities[3],
	UserId: UserService.Users[8].id,
	date: "31/03/2020"
});

BookService.Create({
	Active: true,
	Destination: Cities[4],
	FarePrice: OfferService.Offers[0].price,
	OfferId: OfferService.Offers[0].Id,
	SeatsRequested: 2,
	RequestTimeInterval: OfferService.Offers[0].timeInterval,
	Source: Cities[3],
	UserId: UserService.Users[7].id,
	date: "31/03/2020"
});

BookService.Create({
	Active: true,
	Destination: Cities[4],
	FarePrice: OfferService.Offers[0].price,
	OfferId: OfferService.Offers[0].Id,
	SeatsRequested: 2,
	RequestTimeInterval: OfferService.Offers[0].timeInterval,
	Source: Cities[3],
	UserId: UserService.Users[6].id,
	date: "31/03/2020"
});

export default BookService;
