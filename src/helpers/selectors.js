export function getAppointmentsForDay(state, day) {
  
  const getDays = state.days.find(id => id.name === day);
  if (!getDays) {
    return [];
  }
  const total = [];
  for (let a of getDays.appointments) {
    total.push(state.appointments[a]);
  }

  return total;
}

export function getInterview(state, interview) {
  let interviewHolder = {};
  if (!interview) {
    return null;
  }
  const intId = interview.interviewer

  interviewHolder.student = interview.student;
  interviewHolder.interviewer = state.interviewers[intId];

  return interviewHolder
}

export function getInterviewersForDay(state, day) {
  let allInterviewers = [];
  const interviewerEle = state.days.find((element) => {
    return element.name === day;
  });
  if (state.days.length === 0 || interviewerEle[0] === undefined) {
    return [];
  }
  allInterviewers = interviewerEle.interviewers.map((element) => {
    return state.interviewers[element];
  });
  return allInterviewers;
}