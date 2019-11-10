import React, { Component } from "react";
import { connect } from "react-redux";
import { searchColleague } from "../actions/DiaryManagerActions";

const emptyBox = { background: "Khaki" };
const filledBox = { background: "white" };

class SelectionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaryId: "",
      textBoxStyle: emptyBox
    };
  }

  colleagueSearch = () => {
    this.props.searchColleague(this.state.diaryId);
  };

  setValue = e => {
    console.log(e.target.id + " : " + e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
      textBoxStyle: e.target.value ? filledBox : emptyBox
    });

    console.log(this.state);
  };

  render() {
    var errorMessage = this.props.serviceError && (
      <span>Error Occured during Service call</span>
    );

    var noColleague = this.props.noColleague && <span>No Colleague found</span>;

    return (
      <div className="row card-margin">
        <div className="col-sm-12 card">
          <div className="panel panel-default panelcontent-default">
            <div className="panel card-header">
              <label className="col-sm-6 text-Left">
                <div>Sample Branch</div>
              </label>
              <label className="col-sm-6 text-right">
                {this.props.resources[0].title +
                  " - " +
                  this.props.resources[0].id}
              </label>
            </div>
            <div className="panel-body mt-2">
              <div className="row col-sm-12">
                <div className="col-sm-6 input-group text-center mb-2">
                  <label className="mr-4 ml-3 custom-middle">Diary ID: </label>
                  <input
                    id="diaryId"
                    style={this.state.textBoxStyle}
                    type="text"
                    placeholder="Eg: SS07001"
                    onChange={this.setValue}
                  />
                  <button
                    type="button"
                    disabled={!this.state.diaryId}
                    className="input-group-append btn btn-outline-secondary btn-sm"
                    onClick={this.colleagueSearch}
                  >
                    <span className="fa fa-search" />
                  </button>
                </div>
                <div className="col-sm-6 text-right mb-2">
                  <label
                    className="mr-4 ml-3 custom-middle"
                    style={{ color: "red" }}
                  >
                    {errorMessage}
                    {noColleague}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sortCode: state.resReducer.sortCode,
  resources: state.resReducer.resources,
  noColleague: state.resReducer.noColleague,
  serviceError: state.resReducer.serviceError
});

export default connect(
  mapStateToProps,
  { searchColleague }
)(SelectionBar);
