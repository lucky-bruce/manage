import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import Upload from './Upload';

export default () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [mix, setMix] = useState([]);
    const [defaultimage, setDefaultImage] = useState(undefined);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, image, description });
        let data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('file', image);
        fetch('/mix', {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
            })
    }

    const handleImage = (file) => {
       setImage(file);
    }

    const setValues = (value) => {
        let defaultValues = mix.find(item => item.title === value);
        if (!!defaultValues) {
            const { title = '', description = '', image = ''  } = defaultValues;
            setTitle(title);
            setDefaultImage(image);
            setDescription(description);
        }
    }
    useEffect(() => {
        fetch('/mix', {
            method: 'GET',
        }).then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    setMix(res.info);
                    let defaultValues = res.info.find(item => item.title === 'Sector A');
                    if (!!defaultValues) {
                        const { title, description, image = '' } = defaultValues;
                        setTitle(title);
                        setDefaultImage(image);
                        setDescription(description);
                    }
                }
            })
    }, []);
    return (
        <MDBContainer>
            <form className='sectors-form' onSubmit={handleSubmit}>
                <p className="h4 text-center mb-4">Sectors</p>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                    <div className="custom-control custom-radio custom-control-inline">
                            <input
                                defaultChecked={true}
                                type="radio"
                                className="custom-control-input"
                                id="radio1"
                                name="about" onClick={(e) => {
                                    setValues('Sector A')
                                    setTitle('Sector A');
                                }}
                            />
                            <label className="custom-control-label" htmlFor="radio1">Sector A</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                defaultChecked={(title === 'Sector B')}

                                type="radio" className="custom-control-input" id="radio2" name="about" onClick={(e) => {
                                    setValues('Sector B')
                                    setTitle('Sector B');
                                }} />
                            <label className="custom-control-label" htmlFor="radio2">Sector B</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                defaultChecked={(title === 'Sector C')}
                                type="radio" className="custom-control-input" id="radio3" name="about" onClick={(e) => {
                                    setValues('Sector C')
                                    setTitle('Sector C');
                                }} />
                            <label className="custom-control-label" htmlFor="radio3">Sector C</label>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBInput
                            type="textarea"
                            label="Description"
                            rows="3"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <Upload handleImage={handleImage}  defaultV = {`/${defaultimage}`}/>
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