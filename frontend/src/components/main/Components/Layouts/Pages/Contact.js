import React,{ useEffect, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCard, MDBInput } from "mdbreact";
import './page.css';
const color = {
    color:'#979798'
};
export default (props) => {
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [phone, setPhone] = useState('');
    const [officeHours, setOfficeHours] = useState('');
    const [address, setAddress] = useState('');
    const [address1, setAddress1] = useState('')
    useEffect(() => {
        fetch('/basic')
        .then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    const {
                        email = '',
                        email1 = '',
                        phone = '',
                        officeHours = '',
                        address = '',
                        address1 = ''
                    } = res.info;
                    setEmail(email);
                    setEmail1(email1);
                    setPhone(phone);
                    setOfficeHours(officeHours);
                    setAddress(address);
                    setAddress1(address1);
                }
            })
    }, []);
    return (
    <div id='contact' className='contact-us '>
        <div className='block-title text-center'>
            <MDBContainer>
                <h2>Contact <span style={{fontWeight:'bold'}}>Us</span></h2>
                <MDBRow >   <p id="contact-us-p">In an idea world this website wouldn't exist,a client would acknowledge the importance of having web copy before the design starts</p></MDBRow>
            </MDBContainer>
        </div>
        <div >
            <MDBContainer>
                <MDBRow >
                    <MDBCol md="4" className="mt-xl-5 mb-5" >
                        <MDBCard>
                          <span> <MDBIcon icon="map-marker-alt" size="2x" style={{width: '62px',textAlign: 'center'}} className="contact-us-icons" />
                            <div className='contact-steps' >
                                <h6 className="contact-us-h6">Address</h6>
                                <p style={color}>{address}<br/>{address1}</p>
                                
                            </div>
                          </span>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className=" mt-xl-5 mb-5">
                        <MDBCard>
                           <span> 
                            <MDBIcon icon="envelope" size="2x" className="contact-us-icons"  />
                            <div className='contact-steps'>
                                <h6 className="contact-us-h6">Email</h6>
                                <p style={color}>{email}<br/>{email1}</p>
                                {/* <p className="mb-md-0">sale@gmail.com</p> */}
                            </div>
                           </span>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mt-xl-5 mb-5">
                        <MDBCard>
                          <span>
                            <MDBIcon icon="phone" size="2x" className="contact-us-icons"  />
                            <div className='contact-steps'>
                                <h6 className="contact-us-h6">Phone</h6>
                                <p style={color}>{phone}<br/>{officeHours}</p>
                                {/* <p className="mb-md-0">Mon - Fri, 8:00-22:00</p> */}
                            </div>
                          </span>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow >
                    <MDBCol md="4" className="text-md-left mt-xl-5 mb-5">
                        <h3>Get in Touch</h3>
                        <hr/>
                        <p style={{ color:'#979798' , paddingRight:'10px' ,}} >
                            Lorem ipsum dolor sit amet, consect etur adipis icing elit.
                             Nihil odit magnam minima, soluta dolor ibus reic iendis moles tiae
                              placeat unde eos mole stias. Quis quam aperiam, pariatur. Tempora,
                              placeat ratione porro volup tate odit minima.
                        </p>
                        <ul className="list-inline text-center list-unstyled" style={{float:'left',}}>
                        <li className="list-inline-item">
                                <a href="#!" className=" w-ic">
                                    <MDBIcon fab icon="facebook-f" className="contact-icons"  />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!" className=" w-ic">
                                    <MDBIcon fab icon="twitter" className="contact-icons" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!" className="w-ic">
                                    <MDBIcon fab icon="instagram" className="contact-icons" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!" className=" w-ic">
                                    <MDBIcon fab icon="linkedin" className="contact-icons" />
                                </a>
                            </li>
                            
                        </ul>
                    </MDBCol>
                    <MDBCol md="8" className="text-md-left mt-xl-5 mb-5">
                        <form>
                            <MDBRow style={{marginTop:'-2%'}}>
                                <MDBCol md="6">
                                    <div className="md-form mb-0">
                                        <MDBInput type="text" id="contact-name" label="Your name" />
                                    </div>
                                </MDBCol>
                                <MDBCol md="6">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="text"
                                            id="contact-email"
                                            label="Your email"
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="textarea"
                                            id="contact-message"
                                            label="Your message"
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBBtn id="snd-msg" color="success">Send Message</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    </div>);
}