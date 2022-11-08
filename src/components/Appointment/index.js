import React from "react";
import Header from "./Header.js"
import Show from "./Show.js"
import "./styles.scss";
import Empty from "./Empty.js"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer} />)}
      {mode === CREATE && (
      <Form
        interviewers={[]}
        onCancel={() => transition(EMPTY)}
         />)}
    </article>
  );
}