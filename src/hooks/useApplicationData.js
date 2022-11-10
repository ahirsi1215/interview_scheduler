import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  const setDay = (day) => setState({ ...state, day });

  const updateSpots = function (state, appointments) {
    const dayObj = state.days.find((s) => s.name === state.day);
    let spots = 0;
    for (const obj of dayObj.appointments) {
      const newAppointment = appointments[obj];
      if (!newAppointment.interview) {
        spots++;
      }
    }
    const dayAppend = { ...dayObj, spots };
    const newSpots = state.days.map((s) => (s.name === state.day ? dayAppend : s));
    return newSpots;
  };


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments)
        });
      });
  };


  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments)
        });
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview };

};


