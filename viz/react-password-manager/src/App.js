import React, { Component } from "react";
import "./App.css";
import MainPage from "./containers/MainPage";
import store from "./js/store";
import { Provider } from "react-redux";
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<MainPage />
				</div>
			</Provider>
		);
	}
}

export default App;
