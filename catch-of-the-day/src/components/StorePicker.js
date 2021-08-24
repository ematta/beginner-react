import React from "react";
import { getFunName } from "../helpers";

export default class StorePicker extends React.Component {
  input = React.createRef();
  goToStore = event => {
    // 1. Stop form from submitting
    event.preventDefault();
    // 2. Get text from input
    const storeName = this.input.current.value;
    // 3. change page to /store/[input-text]
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <>
        {/* comment */}
        <form onSubmit={this.goToStore} className="store-selector">
          <h2>Please enter a store</h2>
          <input
            type="text"
            ref={this.input}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit" onClick={this.handleClick}>
            Visit store
          </button>
        </form>
      </>
    );
  }
}
