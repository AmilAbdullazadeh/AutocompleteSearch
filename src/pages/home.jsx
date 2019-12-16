import React from "react";
import Search from "../components/search";

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div className="page">
          <div className="page-container">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-12">
                  <Search />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
