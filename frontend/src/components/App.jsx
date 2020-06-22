import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import OpenedPostPage from "./pages/OpenedPostPage";

function App() {
	return (
		<Router>
			<Route path="/" exact component={LandingPage} />
			<Route path="/explore" component={ExplorePage} />
			<Route path="/favorites" component={FavoritesPage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/new-post" component={CreatePostPage} />
			<Route path="/post/:id" component={OpenedPostPage} />
		</Router>
	);
}

export default App;
