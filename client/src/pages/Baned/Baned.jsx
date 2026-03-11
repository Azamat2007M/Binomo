import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import './baned.scss'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()

  return (
    <>
      <Nav />
      <div className="b-wrapper">
        <div className="ban-card">
          <h1>Oops!</h1>
          <b>403 - SORRY BUT YOUR ACCOUNT IS BLOCKED :(</b>
          <p>The resource is blocked for your account due to violation of our rules. <br /> You better log out of your account and create a new one.</p>
          <button onClick={() => {
            localStorage.removeItem("Access");
            navigate("/login");
            window.location.reload();
          }}>LOG OUT FROM ACCOUNT</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Error
