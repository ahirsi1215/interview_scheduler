import React, { useEffect, useState } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
    })
  }, [])
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const appointedAppointments = dailyAppointments.map(appointment =>(
    <Appointment 
    key={appointment.id} 
    {...appointment} 
    />
  ))
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<DayList 
  days={state.days}
  day={state.day} 
  setDay={setDay} 
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {appointedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
