import React from "react";

import "./style.scss";
import Popup from "./popup";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      foods: [],
      errors: [],
      foundFoods: [],
      isError: false
    };
  }

  async fetchData() {
    const foods = await fetch("/resources/food.json").catch(err => {
      this.setError("Cannot load food data from server !");
    });
    this.setState({ foods: (await foods.json()).foods });
  }

  componentDidMount() {
    this.fetchData();
  }

  searchFood(keyword) {
    const { foods } = this.state;
    keyword = RegExp.escape(keyword.toLowerCase());
    const pattern = `[A-Za-z.\s]*${keyword}[A-Za-z.\s]*`;
    const matchRegEx = new RegExp(pattern);
    const foundFoods = foods.filter(item =>
      matchRegEx.test(item.name.toLowerCase())
    );
    this.setState({ foundFoods });
  }

  onInput(e) {
    if (e.target.value !== "") this.showPopup();
    else this.hidePopup();
  }

  onInputChange(e) {
    const keyword = e.target.value;
    this.searchFood(keyword);
  }

  showPopup() {
    this.setState({ isPopupOpen: true });
  }

  hidePopup() {
    this.setState({ isPopupOpen: false });
  }

  setError(msg) {
    this.setState(prevState => ({
      errors: [...prevState.errors, msg],
      isError: true
    }));
  }

  clearAllError() {
    this.setState({ errors: [], isError: false });
  }

  render() {
    const { isPopupOpen, foundFoods } = this.state;
    return (
      <div className="search">
        <div className="search-container">
          <div className="mt-4 title">Type Food Name</div>
          <div className="content">
            <div className="offset-md-4 offset-0 my-4 col-md-4 md-form mt-0">
              <input
                className="Search form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onInput={this.onInput.bind(this)}
                onChange={this.onInputChange.bind(this)}
              />
            </div>
            <Popup isOpen={isPopupOpen} items={foundFoods} />
          </div>
        </div>
      </div>
    );
  }
}
