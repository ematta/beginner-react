import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  handleChange = event => {
    //take copy of fish
    const updatedFish = {
      ...this.props.fishes,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

EditFishForm.propTypes = {
  fish: PropTypes.object,
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  index: PropTypes.string,
  deleteFish: PropTypes.func,
};

export default EditFishForm;
