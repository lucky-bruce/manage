import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard } from 'mdbreact';

const EditorReg = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const style = {
    padding: '50px',
    margin: '70px auto 0',
    maxWidth: '400px',
    width: '100%'
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name , email, password : pass 
      })
    }).then(res => res.json())
    .then((res) => {
      console.log(res);
    })
  }
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard style={style}>
            <form onSubmit={handleSubmit}>
              <p className="h4 text-center mb-4" style={{ color: '#2bbbad', }}>Sign Up</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your Name
            </label>
              <input
                type="text"
                name='name'
                id="defaultFormLoginEmailEx"
                value={name}
                onChange= {(e)=> { setName(e.target.value) }}
                className="form-control"
              />
              <br />
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
            </label>
              <input
                type="email"
                name='email'
                id="defaultFormLoginEmailEx"
                value={email}
                onChange= {(e)=> { setEmail(e.target.value) }}
                className="form-control"
              />
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
            </label>
              <input
                type="password"
                name='pass'
                id="defaultFormLoginPasswordEx"
                value={pass}
                onChange= {(e)=> { setPass(e.target.value) }}
                className="form-control"
              />
              <div className='text-center' style={{ marginTop: '20px', }}>
                <MDBBtn type="submit">Sign Up</MDBBtn>
              </div>
            </form>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default EditorReg;
