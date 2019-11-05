import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './editor.css';
import { Modal } from 'antd';
import EditIcon from '@material-ui/icons/Edit';
import Upload from './Upload'
const { confirm } = Modal;

const Portfolio = () => {
    // detail, sector
    const [sector, setSector] = useState('');
    const [detail, setDetail] = useState('');
    const [image, setImage] = useState('');
    const [portfolios, setPortfolios] = useState('');

    const [id, setId] = useState('');
    const [editsector, setEditSector] = useState('');
    const [editdetail, setEditdetail] = useState('');
    const [editimage, seteditImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [defaultimage, setDefaultImage] = useState(undefined);

    useEffect(() => {
        fetchPortfolioData();
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('detail', detail);
        data.append('sector', sector);
        data.append('file', image);
        fetch('/portfolio', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchPortfolioData()
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
    }

    const handleImage = (file) => {
        setImage(file)
    }
    const imageSelectedEditHandler = (file) => {
        seteditImage(file)
    }
    const fetchPortfolioData = () => {
        setDetail('');
        setSector('');
        setImage('');
        fetch(`/portfolio`)
            .then(res => res.json())
            .then(res => {
                setPortfolios(res.result)
            })
            .catch(error => {
                console.log('Please check your connection..!');
            })
    }
    const edit = (id) => {
        let editableArrary = portfolios.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', detail = '', sector = '' , image = ''} = editable;
        setId(_id);
        setEditSector(sector);
        setDefaultImage(image);
        setEditdetail(detail);
        setVisible(!visible);
    }
    const handleEdit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('detail', editdetail);
        data.append('sector', editsector);
        if (editimage !== '') {
            data.append('file', editimage);
        } else {
            data.append('file', image);
        }
        fetch(`/portfolio/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditSector('');
                setEditdetail('');
                seteditImage('');
                setVisible(!visible);
                fetchPortfolioData();
            }
        })
    }
    const deleteHandler = (id) => {
        fetch(`/portfolio/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchPortfolioData();
                }
            })
    }
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this item?',
            onOk() {
                deleteHandler(id);
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }

    return (
        <MDBContainer>
            <p className="h4 text-center mb-4">Portfolio</p>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>

                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    label="Details"
                                    type="text"
                                    value={detail}
                                    onChange={(e) => {
                                        setDetail(e.target.value);
                                    }}
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md="12">
                                <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                    <InputLabel htmlFor="Sector" style={{ width: '100%', textAlign: 'left' }}>Sector</InputLabel>
                                    <Select
                                        style={{ width: '100%', textAlign: 'left' }}
                                        value={sector}
                                        onChange={(e) => {
                                            setSector(e.target.value);
                                        }}
                                        inputProps={{
                                            name: 'Sector',
                                            id: 'Sector',
                                        }}
                                    >
                                        <MenuItem value='A'>Sector A</MenuItem>
                                        <MenuItem value='B'>Sector B</MenuItem>
                                        <MenuItem value='C'>Sector C</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <Upload handleImage={handleImage}  />
                            </MDBCol>
                        </MDBRow>

                        <div className="text-center mt-4">
                            <MDBBtn color="info" outline type="submit">
                                Save <MDBIcon far icon="paper-plane" className="ml-2" />
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
                <MDBCol md="6">
                    <MDBTable style={{ marginTop: '25px', }}>
                        <MDBTableHead >
                            <tr>
                                <th>Image</th>
                                <th>Details</th>
                                <th>Sector</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                portfolios.length ?
                                    portfolios.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <img
                                                        width={50}
                                                        alt={item._id}
                                                        src={`/${item.image}`}
                                                    />
                                                </td>
                                                <td>{item.detail.substring(0, 35)}</td>
                                                <td>{item.sector}</td>
                                                <td>
                                                    <DeleteForeverIcon onClick={() => showDeleteConfirm(item._id)} />
                                                    <EditIcon onClick={() => edit(item._id)} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : null
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
            <Modal
                visible={visible}
                title="Edit News"
                onOk={handleEdit}
                onCancel={() => { setVisible(!visible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                label="Detail"
                                type="text"
                                value={editdetail}
                                onChange={(e) => {
                                    let editdetail = e.target.value;
                                    setEditdetail(editdetail);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ marginTop: '2%' }}>
                        <MDBCol md={12}>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="Sector" style={{ width: '100%', textAlign: 'left' }}>Sector</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editsector}
                                    onChange={(e) => {
                                        let editsector = e.target.value;
                                        setEditSector(editsector);

                                    }}
                                    inputProps={{
                                        name: 'Sector',
                                        id: 'Sector',
                                    }}
                                >
                                    <MenuItem value='A'>Sector A</MenuItem>
                                    <MenuItem value='B'>Sector B</MenuItem>
                                    <MenuItem value='C'>Sector C</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12">
                            <Upload handleImage={imageSelectedEditHandler} defaultV = {`/${defaultimage}`} />
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>
        </MDBContainer>
    );
};

export default Portfolio;