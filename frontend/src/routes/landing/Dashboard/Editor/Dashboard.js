import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import './editor.css';
const FormPage = () => {
    const [id, setId] = useState('');
    const [site, setSiteName] = useState('');
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [phone, setPhone] = useState('');
    const [officeHours, setOfficeHours] = useState('');
    const [address, setAddress] = useState('');
    const [address1, setAddress1] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ id, site, email, email1, phone, officeHours, address, address1 });
        fetch('/basic', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, site, email, email1, phone, officeHours, address, address1 })
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
            })
    }
    useEffect(() => {
        fetch('/basic', {
            method: 'GET',
        }).then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    const {
                        _id: id = '',
                        site = '',
                        email = '',
                        email1 = '',
                        phone = '',
                        officeHours = '',
                        address = '',
                        address1 = ''
                    } = res.info;
                    setId(id);
                    setSiteName(site);
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
        <MDBContainer>
            <form className='basic-form' onSubmit={handleSubmit}>
                <p className="h4 text-center mb-4">Basic Information</p>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Site name"
                            type="text"
                            value={site}
                            onChange={(e) => {
                                let site = e.target.value;
                                setSiteName(site);
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBInput
                            label="Primary Email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                                let email = e.target.value;
                                setEmail(email);
                            }}
                        />
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            label="Secondary Email"
                            type="text"
                            value={email1}
                            onChange={(e) => {
                                let email1 = e.target.value;
                                setEmail1(email1);
                            }}
                        />

                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBInput
                            label="Primary Phone"
                            type="text"
                            value={phone}
                            onChange={(e) => {
                                let phone = e.target.value;
                                setPhone(phone);
                            }}
                        />

                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            label="Office hours"
                            type="text"
                            value={officeHours}
                            onChange={(e) => {
                                let officeHours = e.target.value;
                                setOfficeHours(officeHours);
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBInput
                            label="Address"
                            type="text"
                            value={address}
                            onChange={(e) => {
                                let address = e.target.value;
                                setAddress(address);
                            }}
                        />

                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            label="Address 2"
                            type="text"
                            value={address1}
                            onChange={(e) => {
                                let address1 = e.target.value;
                                setAddress1(address1);
                            }}
                        />

                    </MDBCol>
                </MDBRow>

                <div className="text-center mt-4">
                    <MDBBtn color="info" outline type="submit">
                        Save <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                </div>
            </form>

        </MDBContainer>
    );
};

export default FormPage;