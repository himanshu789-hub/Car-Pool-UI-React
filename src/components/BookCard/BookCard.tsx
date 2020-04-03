import * as React from "react";
import BookService, { Book } from "../../Service/BookingService";
import UserService from "../../Service/UserService";
import "./css/styles.css";
import { withRouter } from "react-router";
import OfferService from "../../Service/OfferringService";
import axios from "axios";
import { arrayBufferToBase64 } from "../../utilities/util";
import pointImg from "../../../public/assests/point.png";

interface IBookCardProps {
	book: Book;
	isOnUpdate: boolean;
	history: any;
	location: any;
	match: any;
}

interface IBookCardState {
	src: string;
	name: string;
}
class BookCard extends React.Component<IBookCardProps, IBookCardState> {
	constructor(props) {
		super(props);
		this.state = { src: "", name: "" };
		this.handleDelete = this.handleDelete.bind(this);
	}
	handleDelete(event) {
		const { history, book, location } = this.props;
		BookService.Delete(book.Id);
		history.push(location.pathname);
	}
	componentDidMount() {
		const { isOnUpdate, book } = this.props;
		const imageUploadedPath = isOnUpdate
			? UserService.GetById(OfferService.GetById(book.OfferId).UserId)
					.imageUploadedPath
			: UserService.GetById(book.UserId).imageUploadedPath;
		axios
			.get(
				"http://localhost:5000/getProfileImage" +
					imageUploadedPath.toString().substr(0),
				{ responseType: "arraybuffer" }
			)
			.then(response => {
				const image = arrayBufferToBase64(response.data);
				this.setState({ src: "data:;base64," + image });
			});
		const name = isOnUpdate
			? UserService.GetById(OfferService.GetById(book.OfferId).UserId).name
			: UserService.GetById(book.UserId).name;
		this.setState({ name: name });
	}
	render() {
		const { isOnUpdate, book } = this.props;
		const { src, name } = this.state;
		return (
			<div className="bookCard" key={book.Id}>
				<div id="bookHead">
					<label>{name}</label>
					<img src={src} />
				</div>
				<div id="section1">
					<div id="from">
						<p>From</p>
						<p>{book.Source}</p>
					</div>
					<img src={pointImg} />
					<div id="to">
						<p>To</p>
						<p>{book.Destination}</p>
					</div>
				</div>
				<div id="section2">
					<div id="showDate">
						<p>Date</p>
						<p>{book.date}</p>
					</div>
					<div id="space"></div>
					<div id="interval">
						<p>Time</p>
						<p>{book.RequestTimeInterval}</p>
					</div>
				</div>
				<div id="section3">
					<div id="price">
						<p id="label">Price</p>
						<p id="priceContent">{book.FarePrice}</p>
					</div>
					<div id="seats">
						<p id="label">Seats</p>
						<p id="seatContent">{book.SeatsRequested}</p>
					</div>
					<div id="section4">
						<label className="delete" onClick={this.handleDelete}>
							<i className="far fa-trash-alt"></i>
						</label>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(BookCard);
