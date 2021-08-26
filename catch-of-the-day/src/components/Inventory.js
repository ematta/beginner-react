import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null,
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  authHandler = async authData => {
    console.log(authData);
    // 1. look up current store in db
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2. claim it if there is no owner
    if (!store.owner) {
      base.post(`${this.props.storeId}/owner`, { data: authData.user.uid });
    }
    // 3. set state of inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };
  render() {
    const logout = <button onClick={this.logout}>Logout!</button>;
    // check if logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner</p>
          {logout}
        </div>
      );
    }
    // they ust be the owner, just render the inventory
    return (
      <>
        <div className="inventory">
          <h2>Inventory</h2>
          {logout}
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
