import React, { useState } from 'react'
import './index.scss'
import { useHistory } from 'react-router'
import axios from 'axios'
export const Admin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  const directToMain = (e: any) => {
    e.preventDefault()
    if (email === "admin@gmail.com" && password === "admin") {
      axios
        .post("http://localhost:8806/admin", {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          sessionStorage.removeItem("user")
          sessionStorage.setItem("user", "Admin")
          history.push("/main");
        })
    }
  }
  return (
    <div className="animated bounceInDown">
      <div className="form-box container">
        <span className="error animated tada" id="msg"></span>
        <form name="form1" onSubmit={directToMain} className="admin-form">
          <h4>Admin<span>Dashboard</span></h4>
          <h5>Sign in to your account.</h5>
          <input value={email} style={{ color: "black" }} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email (admin@gmail.com)" ></input>
          <i className="typcn typcn-eye" id="eye"></i>
          <input value={password} style={{ color: "black" }} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="Password(admin)" ></input>
          <input type="submit" value="Sign in" style={{ width: "340px", background: "#2468CD" }} className="admin-form-submit"></input>
        </form>
      </div>
    </div>
  )
}
export default Admin
