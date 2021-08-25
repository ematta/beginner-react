import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";

class Inventory extends React.Component {
  render() {
    return (
      <>
        <div className="inventory">
          <h2>Inventory</h2>
          {Object.keys(this.props.fishes).map(key => (
            <EditFishForm
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
              key={key}
              index={key}
              fish={this.props.fishes[key]}
            />
          ))}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSampleFishes}>
            Load Sample Fishes
          </button>
        </div>
      </>
    );
  }
}

Inventory.propTypes = {
  addFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  fishes: PropTypes.object,
};

export default Inventory;
