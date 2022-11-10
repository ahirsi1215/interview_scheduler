import React from "react";
import Header from "./Header.js"
import Show from "./Show.js"
import "./styles.scss";
import Empty from "./Empty.js"
import Form from "./Form"
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from './Confirm';
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  
  function deleteSlot() {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)} 
          />)}
          
      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave = {save}
         />)}
      {mode === SAVING && <Status 
      message={"Saving"} />}
      {mode === DELETING && <Status 
      message={"Deleting"} />}
      {mode === CONFIRM && <Confirm
          message="Are you sure you want to delete?"
          onCancel={back}
          onConfirm={deleteSlot}
        />}
      {mode === EDIT &&
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />}
      {mode === ERROR_SAVE && 
      <Error message="ERROR Appointment could not be saved try again!" 
      onClose={back} />}
      {mode === ERROR_DELETE && 
      <Error message="Error deleting try again!" 
      onClose={back} />}
    </article>
  );
}