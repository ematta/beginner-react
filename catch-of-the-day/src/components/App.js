import { div } from "prelude-ls";
import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

export default class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addFish = fish => {
    // 1. Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // 2. Add new fish to fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. set new fishes object to state
    this.setState({ fishes });
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    // add or update order
    order[key] = order[key] + 1 || 1;
    //update state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}
