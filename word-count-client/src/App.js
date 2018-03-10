import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: false, input: 0, wordCollection: [] };
	}

	render() {
		return (
			<div className="App">
				<form
					onSubmit={e => this.handleSubmit(e)}
					className="input-container">
					<label>
						Top N Words:
						<input
							type="number"
							onChange={e => this.setInput(e.target.value)}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
				{this.state.loading && (
					<div className="loader-container">
						<div class="loader" />
					</div>
				)}
				<ul className="words-container">{this.renderWords()}</ul>
			</div>
		);
	}
	renderWords() {
		return this.state.wordCollection.map(function(wordItem, i) {
			return (
				<li key={i} className="word-item">
					<div className="word-label">Word: {wordItem.word}</div>
					<div className="word-count-value">
						Count: {wordItem.count}
					</div>
				</li>
			);
		});
	}
	setInput(value) {
		this.setState({ input: parseInt(value) });
	}
	handleSubmit(event) {
		this.setState({ loading: true }, this.getTopNWords);
		event.preventDefault();
	}

	getTopNWords() {
		return fetch("http://localhost:8081/" + this.state.input)
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				this.setState({ loading: false, wordCollection: responseJson });
			})
			.catch(error => {
				console.error(error);
			});
	}
}

export default App;
