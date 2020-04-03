import * as React from "react";
import Form from "../Form/Form";
import Home from "../Home/Home";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import UserService from "../../Service/UserService";

class App extends React.Component {
	render() {
		
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/home/:id" component={Home} />
					<Route path="/login" render={props => <Form IsLogIn={true} />} />
					<Route
						exact
						path={["/", "/profile/:id"]}
						render={props => <Form IsLogIn={false} />}
					/>
				</Switch>
			</BrowserRouter>
		);
	}
}
export default App;
