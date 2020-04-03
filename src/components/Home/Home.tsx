import * as React from "react";
import "./css/home.css";
import UserService, { User } from "./../../Service/UserService";
import { Switch } from "react-router";
import { Link } from "react-router-dom";
import Ride from "../Ride/Ride";
import Display from "../Display/Display";
import { withRouter, Route } from "react-router-dom";
import axios from "axios";
import { arrayBufferToBase64 } from "../../utilities/util";

type HomeProps = {
	history: any;
	match: any;
	location: any;
};

interface HomeState {
	displayDropDown: boolean;
	src: string;
	user: User;
}
class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);
		this.state = {
			displayDropDown: false,
			src: "",
			user: {
				emailId: "",
				active: true,
				name: "",
				password: "",
				imageUploadedPath: "",
				id: ""
			}
		};
		this.handleDropDown = this.handleDropDown.bind(this);
	}
	componentDidMount() {
		const { id } = this.props.match.params;

		const user = UserService.GetById(id);
		debugger;
		axios
			.get(
				"http://localhost:5000/getProfileImage" +
					user.imageUploadedPath.toString().substr(0),
				{ responseType: "arraybuffer" }
			)
			.then(response => {
				const image = arrayBufferToBase64(response.data);
				debugger;
				this.setState({ src: "data:;base64," + image, user: { ...user } });
			});
	}

	shouldComponentUpdate() {
		return true;
	}
	handleDropDown() {
		this.setState(state => {
			return { displayDropDown: !state.displayDropDown };
		});
	}
	render() {
		const { url } = this.props.match;
		const { id } = this.props.match.params;
		const { user } = this.state;

		   
		return (
			<>
				<div id="home">
					<div id="head">
						<span>Ya!</span>
					</div>
					<div
						id="info"
						className={this.state.displayDropDown ? "displayDropDown" : ""}
					>
						<span>{user.name}</span>
						<img
							src={this.state.src}
							onClick={this.handleDropDown}
							className="userProfile"
						/>
						<ul className="list dropdown">
							<li>
								<Link to={url + "/content"}>Home</Link>
							</li>
							<li>
								<Link to={"/profile/" + id}>Profile</Link>
							</li>
							<li>
								<Link to={url + "/display"}>MyRides</Link>
							</li>
							<li>
								<Link to="/login">LogOut</Link>
							</li>
						</ul>
					</div>
				</div>

				<Switch>
					<Route path={this.props.match.path + "/content"}>
						<div id="content">
							<p>Hey {user.name}!</p>
							<div id="book">
								<Link to={this.props.match.url + "/ride/book"}>Book A Ride</Link>
							</div>
							<div id="offer">
								<Link to={this.props.match.url + "/ride/offer"}>Offer A Ride</Link>
							</div>
						</div>
					</Route>
					<Route
						exact
						path={this.props.match.path + "/ride/book"}
						render={props => <Ride isOnBooking={true} isOnUpdate={false} />}
					/>
					<Route
						exact
						path={this.props.match.path + "/ride/offer"}
						render={props => <Ride isOnBooking={false} isOnUpdate={false} />}
					/>
					<Route
						path={this.props.match.path + "/display"}
						render={props => <Display id={this.props.match.params.id} />}
					/>
					<Route
						path={this.props.match.path + "/ride/offer/update/:offerId"}
						render={props => <Ride isOnBooking={false} isOnUpdate={true} />}
					/>
				</Switch>
			</>
		);
	}
}

export default withRouter(Home);
