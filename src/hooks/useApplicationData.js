import React, { useEffect, useState } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state,
      appointments});
      
    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
     setState({...state,
      appointments});
      })
  }

  function updateSpots (day, days, appointments) {
    let eleMen = days.find(element => element.name === day);
  
    let appointmentArr = eleMen.appointments;
    let result = 0;
    for (let a of appointmentArr){
     let appointment = appointments[a]
     if (!appointment.interview){
      result++;
     }
    }

    const newResult = {...eleMen, result}
    const b = days.map((element) => element.name === day ? newResult: element)
    return b;
    }


  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state,
      appointments});

      return axios.delete(`/api/appointments/${id}`).then(() => {
        setState({...state,
          appointments});
      }) 
  }


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('api/interviewers')
    ])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])
  return { state, setDay, bookInterview, cancelInterview, updateSpots }
}
