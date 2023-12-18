const FormEdit = ({ span, onChangeEdited, id, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={span} onChange={(e) => onChangeEdited(e, id)}></input>
    </form>
  )
}

export default FormEdit
