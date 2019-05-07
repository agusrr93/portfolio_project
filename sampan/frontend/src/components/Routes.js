import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CategoryPage from './pages/CategoryPage';
import CityPage from './pages/CityPage';
import TrainingPage from './pages/TrainingPage';
import EventPage from './pages/EventPage';
import TransactionPage from './pages/TransactionPage';
import ImageSliderPage from './pages/ImageSliderPage';

class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/dashboard" exact component={DashboardPage} />
				<Route path="/transaction" exact component={TransactionPage} />
				<Route path="/category" exact component={CategoryPage} />
				<Route path="/city" exact component={CityPage} />
				<Route path="/training" exact component={TrainingPage} />
				<Route path="/event" exact component={EventPage} />
				<Route path="/slider" exact component={ImageSliderPage} />
			</Switch>
		);
	}
}

export default Routes;
