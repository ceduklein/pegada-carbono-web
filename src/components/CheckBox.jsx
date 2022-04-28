export function CheckBox(props) {
  return (
    <div className="form-check">
      <input className="form-check-input" 
        type="checkbox" 
        id={props.id} 
        onChange={e => props.click(e.target.checked)} />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  )
}