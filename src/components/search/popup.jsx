import React from "react";

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { items, isOpen } = this.props;

    //Do not show popup
    if (!isOpen) return null;

    return (
      <div className="popup">
        <div className="container">
          <div className="content">
            {items &&
              items.map((item, idx) => {
                return (
                  <div className="item" key={idx}>
                    <div className="response">{item.name}</div>
                  </div>
                );
              })}
            {!items && <div className="my-4 warning"> Nothing Found ! </div>}
          </div>
          <hr />
          <div className="mt-2 footer"> Type keyword to search for food </div>
        </div>
      </div>
    );
  }
}
