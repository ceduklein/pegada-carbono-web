export function FormGroup(props) {
  return (
    <div className="form-group" style={{marginBottom: '10px'}}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      {props.children}
    </div>
  )
}