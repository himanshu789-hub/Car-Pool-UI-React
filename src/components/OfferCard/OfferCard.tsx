import * as React from "react";
import OfferService, { Offer } from "../../Service/OfferringService";
import UserService from "../../Service/UserService";
import "./css/offerCard.css";
import { withRouter } from "react-router";
import BookService, { Book } from "./../../Service/BookingService";
import { arrayBufferToBase64, convertUrl } from "../../utilities/util";
import axios from "axios";
import pointImg from "../../../public/assests/point.png";
interface OfferCardProps {
  offer: Offer;
  key?: string;
  isOnUpdate: boolean;
  history: any;
  location: any;
  match: any;
  bookRequest?: Book;
}
interface IOfferState {
  msg: string;
  imagePreview: string;
}
class OfferCard extends React.Component<OfferCardProps, IOfferState> {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      imagePreview: ""
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOfferring = this.handleOfferring.bind(this);
  }
  handleDelete(event) {
    const { offer } = this.props;
    const { history } = this.props;
    OfferService.Delete(offer.Id);
    history.push(location.pathname);
  }
  handleEdit(event) {
    const { offer, history } = this.props;
    if (BookService.GetBookingByOfferId(offer.Id).length == 0)
      history.push("ride/offer/update/" + offer.Id);
    else this.setState({ msg: "Under Service,Cannot Update" });
  }
  handleOfferring(event) {
    const { offer, history } = this.props;
    const {
      bookRequest: {
        Destination,
        Source,
        date,
        RequestTimeInterval,
        UserId,
        SeatsRequested
      }
    } = this.props;
    const {
      location: { pathname }
    } = this.props;
    let book: Book = new Book();
    book.Destination = Destination;
    book.Source = Source;
    book.OfferId = offer.Id;
    book.RequestTimeInterval = RequestTimeInterval;
    book.SeatsRequested = SeatsRequested;
    book.date = date;
    book.UserId = UserId;
    book.FarePrice =
      (offer.ViaPoints.indexOf(book.Destination) -
        offer.ViaPoints.indexOf(book.Source) +
        1) *
      book.SeatsRequested *
      offer.price;
    book = BookService.Create(book);
    BookService.AddOffer(book.Id, offer.Id);
    OfferService.AddARide(offer.Id, book.SeatsRequested, book.FarePrice);
    history.push(convertUrl(pathname, "display"));
  }
  render() {
    const { isOnUpdate, offer } = this.props;
    return (
      <div
        className={"offerCard".concat(isOnUpdate ? "" : " hovering")}
        key={offer.Id}
      >
        <div id="offerHead">
          <label>{UserService.GetById(offer.UserId).name}</label>
          <img src={this.state.imagePreview} />
        </div>
        <div id="section1">
          <div id="from">
            <p>From</p>
            <p>{offer.from}</p>
          </div>
          <img src={pointImg} />
          <div id="to">
            <p>To</p>
            <p>{offer.to}</p>
          </div>
        </div>
        <div id="section2">
          <div id="showDate">
            <p>Date</p>
            <p>{offer.date}</p>
          </div>
          <div id="space"></div>
          <div id="interval">
            <p>Time</p>
            <p>{offer.timeInterval}</p>
          </div>
        </div>
        <div id="section3">
          <div id="price">
            <p id="label">Price</p>
            <p id="priceContent">{offer.price}</p>
          </div>
          <div id="seats">
            <p id="label">Seats</p>
            <p id="seatContent">{offer.seats}</p>
          </div>
        </div>
        {isOnUpdate ? (
          <></>
        ) : (
          <label className="selectOffer" onClick={this.handleOfferring}>
            <i className="fa fa-check"></i>
          </label>
        )}
        <div id="section4" style={{ display: isOnUpdate ? "block" : "none" }}>
          <label className="edit" onClick={this.handleEdit}>
            <i className="fa fa-edit"></i>
          </label>
          <span className="canOfferEditmessage">{this.state.msg}</span>
          <label className="delete" onClick={this.handleDelete}>
            <i className="far fa-trash-alt"></i>
          </label>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const { offer } = this.props;
    const imageUploadedPath = UserService.GetById(offer.UserId)
      .imageUploadedPath;
    axios
      .get(
        "http://localhost:5000/getProfileImage" +
          imageUploadedPath.toString().substr(0),
        { responseType: "arraybuffer" }
      )
      .then(response => {
        const image = arrayBufferToBase64(response.data);
        this.setState({ imagePreview: "data:;base64," + image });
      });
  }
}

export default withRouter(OfferCard);
