import * as React from "react";
import "./css/ride.css";
import { TimeInterval } from "../../ServiceData/data";
import RouteService from "./service/RouteService";
import OfferService, { Offer } from "../../Service/OfferringService";
import { withRouter } from "react-router-dom";
import UserService, { User } from "../../Service/UserService";
import { convertUrl } from "../../utilities/util";
import Matches from "./Matches";
import { CityPattern, DatePattern } from "../../RegularExpression/regexp";
type RideProps = {
  isOnBooking: boolean;
  history: any;
  match: any;
  location: any;
  isOnUpdate: boolean;
};
type RideState = {
  Toogle: boolean;
  from: string;
  to: string;
  date: string;
  ViaPoints: Array<string>;
  showRides: boolean;
  timeInterval: string;
  isSlideRight: boolean;
  price: string;
  seats: number;
  user: User;
  FormMsg: string;
  ToMsg: string;
  TimeMsg: string;
  ViaPointMsg: string;
  SeatsMsg: string;
  PriceMsg: string;
  shouldValidate: boolean;
  showOfferForm: boolean;
  dateMsg: string;
  isOnUpdate: boolean;
  offer: Offer;
};

class Ride extends React.Component<RideProps, RideState> {
  constructor(props) {
    super(props);
    const { isOnBooking, isOnUpdate } = this.props;

    var ViaPoints: Array<string> = new Array<string>();
    const offer = new Offer();
    const {
      match: {
        params: { offerId, id }
      }
    } = this.props;
    if (offerId != undefined) {
      ViaPoints = [...offer.ViaPoints];
    } else ViaPoints.push("");
    this.state = {
      Toogle: isOnBooking,
      showOfferForm: !isOnBooking,
      date: "",
      from: "",
      to: "",
      ViaPoints: [...ViaPoints],
      showRides: false,
      timeInterval: TimeInterval[0],
      isSlideRight: isOnBooking,
      price: "",
      seats: 0,
      user: {
        active: true,
        emailId: "",
        name: "",
        password: "",
        imageUploadedPath: ""
      },
      FormMsg: "",
      PriceMsg: "",
      SeatsMsg: "",
      TimeMsg: "",
      ToMsg: "",
      ViaPointMsg: "Please Enter A Intermidate Point",
      shouldValidate: false,
      dateMsg: "",
      isOnUpdate: isOnUpdate,
      offer: offer
    };
    this.AddMoreStops = this.AddMoreStops.bind(this);
    this.SelectTime = this.SelectTime.bind(this);
    this.displayOfferRightPanel = this.displayOfferRightPanel.bind(this);
    this.offerSubmitValidate = this.offerSubmitValidate.bind(this);
    this.onBookingSubmit = this.onBookingSubmit.bind(this);
    this.onOfferSubmit = this.onOfferSubmit.bind(this);
    this.onViaPointInput = this.onViaPointInput.bind(this);
    this.SelectTime = this.SelectTime.bind(this);
    this.removeStop = this.removeStop.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.validateBookingSubmit = this.validateBookingSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { offerId, id }
      }
    } = this.props;
    if (!offerId)
      this.setState({ offer: { ...OfferService.GetById(offerId) } });
    this.setState({ user: UserService.GetById(id) });
  }

  handleSlider(event) {
    const { Toogle } = this.state;
    const {
      match: { url }
    } = this.props;
    let { history } = this.props;
    console.log(convertUrl(url, "book"));
    if (Toogle) {
      this.setState({
        Toogle: false,
        isSlideRight: false,
        showOfferForm: true,
        showRides: false
      });
      history.push(convertUrl(url, "offer"));
    } else {
      this.setState({
        Toogle: true,
        isSlideRight: true,
        showOfferForm: false,
        showRides: false
      });
      history.push(convertUrl(url, "book"));
    }
  }
  SelectTime(event) {
    const { value } = event.target;
    const { isOnUpdate } = this.state;
    if (isOnUpdate)
      this.setState(state => {
        return { offer: { ...state.offer, timeInterval: value } };
      });
    else this.setState({ timeInterval: value });
  }

  onViaPointInput(event) {
    let { name, value } = event.target;
    debugger;
    name = name.substring(1);
    const indexValue: number = Number(name);
    this.setState(state => {
      return {
        ViaPoints: [
          ...state.ViaPoints.filter((e, index) => {
            if (index < indexValue) return e;
          }),
          value,
          ...state.ViaPoints.filter((currValue, index) => {
            if (index > indexValue) return currValue;
          })
        ]
      };
    });
  }
  AddMoreStops() {
    this.setState(state => {
      return { ViaPoints: [...state.ViaPoints, ""] };
    });
  }
  removeStop(event) {
    let index: number = Number(event.target.dataset.key);
    // this.ViaPoints = this.ViaPoints.map(e => e).filter((item, itemIndex) => { return itemIndex != index })
    this.setState(state => {
      return {
        ViaPoints: [...state.ViaPoints].filter((item, itemIndex) => {
          return itemIndex != index;
        })
      };
    });
  }

  offerSubmitValidate(): boolean {
    let validateResult: boolean = false;
    const { isOnUpdate, offer, ViaPoints } = this.state;

    if (isOnUpdate) {
      if (offer.from.length == 0 || !CityPattern.test(offer.from)) {
        validateResult = true;
        this.setState({ FormMsg: "Please Enter Source" });
      } else this.setState({ FormMsg: "" });

      if (offer.to.length == 0 || !CityPattern.test(offer.to)) {
        validateResult = true;
        this.setState({ ToMsg: "Please Enter Destination" });
      } else this.setState({ ToMsg: "" });

      if (offer.timeInterval.length == 0) {
        validateResult = true;
        this.setState({ TimeMsg: "Please Select Time Interval" });
      } else this.setState({ TimeMsg: "" });

      for (let i = 0; i < ViaPoints.length; i++) {
        if (ViaPoints[i].length == 0 || !CityPattern.test(ViaPoints[i])) {
          this.setState({ shouldValidate: true });
          validateResult = true;
        }
      }

      if (offer.date.length == 0 || !DatePattern.test(offer.date)) {
        validateResult = true;
        this.setState({ dateMsg: "Please Enter Valid Date" });
      } else this.setState({ dateMsg: "" });

      if (offer.price == 0) {
        validateResult = true;
        this.setState({ PriceMsg: "Select Seats" });
      } else this.setState({ PriceMsg: "" });
    } else {
      const { from, to, timeInterval, date, price, ViaPoints } = this.state;
      if (from.length == 0 || !CityPattern.test(from)) {
        validateResult = true;
        this.setState({ FormMsg: "Please Enter Source" });
      } else this.setState({ FormMsg: "" });

      if (to.length == 0 || !CityPattern.test(to)) {
        validateResult = true;
        this.setState({ ToMsg: "Please Enter Destination" });
      } else this.setState({ ToMsg: "" });

      if (timeInterval.length == 0) {
        validateResult = true;
        this.setState({ TimeMsg: "Please Select Time Interval" });
      } else this.setState({ TimeMsg: "" });

      for (let i = 0; i < ViaPoints.length; i++) {
        if (ViaPoints[i].length == 0 || !CityPattern.test(ViaPoints[i])) {
          this.setState({ shouldValidate: true });
          validateResult = true;
        }
      }

      if (date.length == 0 || !DatePattern.test(date)) {
        validateResult = true;
        this.setState({ dateMsg: "Please Enter Valid Date" });
      } else this.setState({ dateMsg: "" });

      if (price.length == 0) {
        validateResult = true;
        this.setState({ PriceMsg: "Enter Ride Fare" });
      } else this.setState({ PriceMsg: "" });
    }
    return validateResult;
  }
  onOfferSubmit(event) {
    let { history, location } = this.props;
    const { offer, ViaPoints, isOnUpdate } = this.state;
    event.preventDefault();
    if (this.offerSubmitValidate()) return;

    let newOffer: Offer = new Offer();
    if (isOnUpdate) {
      newOffer.Id = offer.Id;
      newOffer.SeatsAvailable = offer.seats;
      newOffer.TotalEarn = 0;
      newOffer.UserId = offer.UserId;
      newOffer.ViaPoints = ViaPoints;
      newOffer.date = offer.date;
      newOffer.from = offer.from;
      newOffer.to = offer.to;
      newOffer.price = offer.price;
      newOffer.seats = offer.seats;
      newOffer.timeInterval = offer.timeInterval;
      console.log(OfferService.Update(offer));
    } else {
      const {
        timeInterval,
        seats,
        price,
        date,
        from,
        to,
        user,
        ViaPoints
      } = this.state;

      offer.Active = true;
      offer.timeInterval = timeInterval;
      offer.to = to;
      offer.SeatsAvailable = seats;
      offer.price = Number(price);
      offer.seats = seats;
      offer.date = date;
      offer.TotalEarn = 0;
      offer.ViaPoints = [...ViaPoints];
      offer.from = from;
      offer.UserId = user.id;
      OfferService.Create(offer);
    }

    history.push(convertUrl(location.pathname, "display"));
  }
  validateBookingSubmit(): boolean {
    let validateResult: boolean = false;
    const { from, to, date } = this.state;
    if (from.length == 0) {
      validateResult = true;
      this.setState({ FormMsg: "Please Enter Source" });
    } else this.setState({ FormMsg: "" });

    if (to.length == 0) {
      validateResult = true;
      this.setState({ ToMsg: "Please Enter Destination" });
    } else this.setState({ ToMsg: "" });

    if (date.length == 0 && !DatePattern.test(date)) {
      validateResult = true;
      this.setState({ dateMsg: "Please Enter Valid Date" });
    } else this.setState({ dateMsg: "" });

    return validateResult;
  }
  onBookingSubmit(event) {
    event.preventDefault();
    if (this.validateBookingSubmit()) {
    } else this.setState({ showRides: true });
  }
  render() {
    const { offer, isOnUpdate } = this.state;
    const {
      from,
      to,
      ViaPoints,
      price,
      seats,
      ViaPointMsg,
      FormMsg,
      ToMsg,
      PriceMsg,
      TimeMsg,
      showOfferForm,
      shouldValidate,
      timeInterval,
      Toogle,
      date,
      dateMsg,
      isSlideRight,
      showRides
    } = this.state;

    let checkboxes = [] as any;
    console.log("state before render : ", this.state);
    checkboxes = TimeInterval.map((e, index) => {
      if (index == 0)
        return (
          <div>
            <input
              type="radio"
              required
              name="time-radio"
              className="radioTime"
              onClick={this.SelectTime}
              checked={
                isOnUpdate
                  ? e.toString() === offer.timeInterval
                    ? true
                    : false
                  : timeInterval == e.toString()
                  ? true
                  : false
              }
              value={e.toString()}
            />
            <label>{e.toString()}</label>
          </div>
        );
      else
        return (
          <div>
            <input
              type="radio"
              required
              name="time-radio"
              className="radioTime"
              onClick={this.SelectTime}
              value={e.toString()}
              checked={
                isOnUpdate
                  ? e.toString() === offer.timeInterval
                    ? true
                    : false
                  : timeInterval == e.toString()
                  ? true
                  : false
              }
            />
            <label>{e.toString()}</label>
          </div>
        );
    });
    const {
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <>
        <div className="ride">
          <form
            className={"rideForm ".concat(
              Toogle ? "formWidthLess" : "formWidthMore"
            )}
          >
            <div className="rideContent">
              <div id="rideHead">
                <div id="top">
                  <h1>{Toogle ? "Book a Ride" : "Offer a Ride"}</h1>
                  <input
                    type="checkbox"
                    checked={isSlideRight}
                    onChange={this.handleSlider}
                  />
                </div>
                <p>we get you the matches asap!</p>
              </div>
              <div id="rideFormBar">
                <div id="rideFormcontent">
                  <label>
                    From <span className="msg">{FormMsg}</span>
                  </label>
                  <input
                    type="text"
                    name="from"
                    required
                    autoComplete="off"
                    placeholder=" "
                    value={isOnUpdate ? offer.from : from}
                    onChange={this.onInputChange}
                  />
                </div>
                <div id="rideFormcontent">
                  <label>
                    To <span className="msg">{ToMsg}</span>
                  </label>
                  <input
                    type="text" name="to" required placeholder=" "
                    autoComplete="off"
                    value={isOnUpdate ? offer.to : to}
                    onChange={this.onInputChange}
                  />
                </div>
                <div id="rideFormcontent">
                  <label>
                    Date <span className="msg">{dateMsg}</span>
                  </label>
                  <input type="text"
                    name="date"
                    required
                    placeholder="dd/mm/yyyy"
                    autoComplete="off"
                    value={isOnUpdate ? offer.date : date}
                    onChange={this.onInputChange}
                  />
                </div>
                <div id="rideFormcontent">
                  <label>
                    Time <span className="msg">{TimeMsg}</span>
                  </label>
                  <div> {checkboxes}</div>
                </div>
                {Toogle ? (
                  <button
                    type="button"
                    className="submit-button"
                    onClick={this.onBookingSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  ""
                )}
              </div>
              {Toogle ? (
                ""
              ) : (
                <button id="next" onClick={this.displayOfferRightPanel}>
                  Next>>
                </button>
              )}
            </div>

            {showOfferForm ? (
              <>
                <div id="rideFormContinue">
                  <div id="rideHead">
                    <div id="top">
                      <h1>{"Offer a Ride"}</h1>
                      <input
                        type="checkbox"
                        checked={Toogle}
                        onClick={this.handleSlider}
                      />
                    </div>
                    <p>we get you the matches asap!</p>
                  </div>
                  <div id="viapoints">
                    <div key={0} className="stops">
                      <label>
                        Stop {1}{" "}
                        <span className="msg">
                          {shouldValidate
                            ? ViaPoints[0].length == 0
                              ? ViaPointMsg
                              : ""
                            : ""}
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder=" "
                        autoComplete="off"
                        className="extras"
                        required
                        name={"_0"}
                        value={ViaPoints[0]}
                        onChange={this.onViaPointInput}
                      />
                    </div>
                    {ViaPoints.map((currentValue, index) => {
                      if (index == 0) return <></>;
                      return (
                        <div key={index} className="stops">
                          <label className="minus" onClick={this.removeStop}>
                            <i
                              className="fa fa-times"
                              data-key={index + ""}
                            ></i>
                          </label>
                          <label>
                            Stop {index + 1}{" "}
                            <span className="msg">
                              {shouldValidate
                                ? ViaPoints[index].length == 0
                                  ? ViaPointMsg
                                  : ""
                                : ""}
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="extras"
                            required
                            name={"_" + index}
                            value={currentValue}
                            onChange={this.onViaPointInput}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <label className="plus" onClick={this.AddMoreStops}>
                    <i className="fa fa-plus"></i>
                  </label>
                  <div id="sectionB">
                    <label>Available Seats </label>
                    <div id="offerSeats">
                      <span>
                        <input
                          type="radio"
                          name="seats"
                          required
                          value={1}
                          onClick={() => {
                            if (isOnUpdate) {
                              offer.seats = 1;
                              this.setState({ offer: offer });
                            } else this.setState({ seats: 1 });
                          }}
                          checked={
                            isOnUpdate
                              ? offer.seats == 1
                                ? true
                                : false
                              : seats == 1
                              ? true
                              : false
                          }
                        />
                        <label>1</label>
                      </span>
                    </div>
                    <div id="offerSeats">
                      <span>
                        <input
                          type="radio"
                          value={2}
                          name="seats"
                          checked={
                            isOnUpdate
                              ? offer.seats == 2
                                ? true
                                : false
                              : seats == 2
                              ? true
                              : false
                          }
                          onClick={() => {
                            if (isOnUpdate) {
                              offer.seats = 2;
                              this.setState({ offer: offer });
                            } else this.setState({ seats: 2 });
                          }}
                        />
                        <label>2</label>
                      </span>
                    </div>
                    <div id="offerSeats">
                      <span>
                        <input
                          type="radio"
                          value={3}
                          name="seats"
                          onClick={() => {
                            if (isOnUpdate) {
                              offer.seats = 3;
                              this.setState({ offer: offer });
                            } else this.setState({ seats: 3 });
                          }}
                          checked={
                            isOnUpdate
                              ? offer.seats == 3
                                ? true
                                : false
                              : seats == 3
                              ? true
                              : false
                          }
                        />
                        <label>3</label>
                      </span>
                    </div>
                  </div>
                  <div id="offerPrice">
                    <label>
                      Price <span className="msg">{PriceMsg}</span>
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={isOnUpdate ? offer.price : price}
                      required
                      onChange={this.onInputChange}
                      placeholder="Enter Ride Price"
                    />
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <button
                    type="submit"
                    form="rideForm"
                    className="submit-button"
                    onClick={this.onOfferSubmit}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </form>
          {showRides ? (
            <Matches
              offers={RouteService.ShowOffersUnderRangeWithRequestedSeats(
                from,
                to,
                timeInterval,
                seats,
                date,
                id
              )}
              book={{
                Destination: to,
                Source: from,
                date: date,
                RequestTimeInterval: timeInterval,
                SeatsRequested: 1,
                UserId: id
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
  displayOfferRightPanel(event) {
    event.preventDefault();
    this.setState(state => {
      return { showOfferForm: !state.showOfferForm };
    });
  }
  onInputChange(event) {
    const { isOnUpdate } = this.state;
    const { name, value } = event.target;
    if (isOnUpdate) {
      this.setState(state => {
        return { offer: { ...state.offer, [name]: value } };
      });
    } else {
      let newState = {};
      newState[name] = value;
      this.setState(newState);
    }
  }
}

export default withRouter(Ride);
