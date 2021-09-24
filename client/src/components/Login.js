export const Login = () => {

    // toggle when selected file changed
    const onChangeHandler = (e) => {
      console.log(e.target.files[0]);
    }

    return (
    <div>
      <p>Login page</p>
      <input type="file" onChange={onChangeHandler}/>
    </div>)
}