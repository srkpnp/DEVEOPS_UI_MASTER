import React, { Component } from "react";
import moment from "moment";
import $ from "jquery";

import "../../node_modules/fullcalendar/dist/fullcalendar.min.css";
import fullcalendarscheduler from "fullcalendar-scheduler";
import "../../node_modules/fullcalendar-scheduler/dist/scheduler.min.css";
import "../../node_modules/moment/moment.js";
import "../../node_modules/jquery-ui/ui/widgets/datepicker.js";
import "../../node_modules/jquery-ui/themes/base/datepicker.css";
import { connect } from "react-redux";
import { searchColleague } from "../actions/DiaryManagerActions";

class CalendarPersonal extends Component {
  componentDidMount() {
    this.setUpCalendar($("#calendar"), this.props.resources, this.props.events);
  }

  componentWillReceiveProps(nextProps) {
    //setUpCalendar($('#calendar'),this.props.resources);
    console.log("component update: " + nextProps.events);
    $("#calendar").fullCalendar("removeEvents");
    $("#calendar").fullCalendar("option", "resources", nextProps.resources);
    $("#calendar").fullCalendar("refetchResources");
    $("#calendar").fullCalendar("addEventSource", nextProps.events);
    $("#calendar").fullCalendar("rerenderEvents");
  }

  setUpCalendar(calendar, resources, events) {
    console.log("resources inside setUpCalendar: " + resources);
    calendar.fullCalendar({
      schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
      defaultView: "agendaDay",
      defaultDate: "2019-07-22",
      editable: true,
      selectable: true,
      eventLimit: true,
      allDaySlot: false,
      nowIndicator: true,
      scrollTime: "08:00:00",
      slotDuration: "00:15:00",
      eventOverlap: false,
      eventConstraint: "businessHours",
      customButtons: {
        datePickerButton: {
          text: "Change Date",
          themeIcon: "circle-triangle-s",
          click: function() {
            var $btnCustom = $(".fc-datePickerButton-button");
            $btnCustom.after(
              '<input type="hidden" id="hiddenDate" className="datepicker"/>'
            );

            $("#hiddenDate").datepicker({
              showOn: "button",

              dateFormat: "yy-mm-dd",
              onSelect: function(dateText, inst) {
                $("#calendar").fullCalendar("gotoDate", dateText);
              }
            });

            var $btnDatepicker = $(".ui-datepicker-trigger");
            $("#hiddenDate")
              .show()
              .focus()
              .hide();
            $btnDatepicker.trigger("click");
            $btnDatepicker.hide();
            $btnDatepicker.remove();
            $("input.datepicker")
              .not(":first")
              .remove();
          }
        }
      },
      header: {
        left: "prev,next today datePickerButton",
        center: "title",
        right: "agendaDay,agendaTwoDay,agendaWeek"
      },
      views: {
        agendaTwoDay: {
          type: "agenda",
          duration: { days: 2 },
          groupByResource: true
        }
      },

      resources: resources,

      events: events,

      select: function(start, end, jsEvent, view, resource) {
        console.log(
          "select",
          moment(start).format("hh:mm:ss a"),
          end.format(),
          resource ? resource.id : "(no resource)",
          resource ? resource.title : "(no resource)"
        );
        //$('#aptDesc').html(info.title);advisorName
        $("#aptBookDate").html(moment(start).format("DD/MM/YYYY"));
        $("#aptBookStart").html(moment(start).format("hh:mm:ss a"));
        $("#aptBookEnd").html(moment(end).format("hh:mm:ss a"));
        $("#advisorName").html(resource.title);
        $("#advisorId").html(resource.id);
        $("#aptBookModal").modal();
      },
      dayClick: function(date, jsEvent, view, resource) {
        console.log(
          "dayClick",
          date.format(),
          resource ? resource.id : "(no resource)"
        );
      },
      eventClick: function(info) {
        console.log(info);
        $("#aptDesc").html(info.title);
        $("#aptStart").html(moment(info.start).format("hh:mm:ss a") + " ");
        $("#aptEnd").html(" " + moment(info.end).format("hh:mm:ss a"));
        $("#aptId").html(info.id);
        $("#aptDetModal").modal();
      },
      eventDragStop: function(info) {
        //console.log(info);
      },
      eventAllow: function(dropInfo, draggedEvent) {
        if (
          dropInfo.start.isSame(draggedEvent.start) &&
          dropInfo.end.isSame(draggedEvent.end)
        ) {
          return true;
        } else {
          return false;
        }
      }
    });
  }

  render() {
    return (
      <div className="card-margin mt-2">
        <div id="calendar" className="m-5" />

        <div id="aptMoveModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 id="aptMoveModalTitle" className="modal-title text-center">
                  Amend Appointment Details
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>{" "}
                  <span className="sr-only">close</span>
                </button>
              </div>
              <div id="aptMoveModalBody" className="modal-body">
                <h5>
                  Dow you wish to move <span id="aptMoveDesc"> </span> to new
                  timings
                </h5>
                <label id="aptDate"> </label>
                <span id="aptStart" />
                <span> to </span>
                <span id="aptEnd" />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={this.setMoveFlagTrue}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resources: state.resReducer.resources,
  events: state.resReducer.events
});

export default connect(
  mapStateToProps,
  { searchColleague }
)(CalendarPersonal);
