import React, { useState, useEffect, useReducer } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Modal } from "antd";
import Upload from "./Upload";
import {
  getNews,
  getSectors,
  newNews,
  deleteNews
} from "../../../../utils/backend";
import { newsInput, GetGRPCNews } from "../../../../utils/grpc";
import Img from "../../../../components/img/index";
import { usePath } from "hookrouter";
import { limitedAccess } from "../../../../utils/utils";
import NewsTable from "../../../../components/landing/news/NewsTable";

const { confirm } = Modal;

const News = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    newsInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  const [sectors, setSectors] = useState([]);

  const [editsector, setEditSector] = useState("");
  const [edittitle, setEditTitle] = useState("");
  const [editdes, setEditDes] = useState("");

  const [news, setNews] = useState([]);
  const [visible, setVisible] = useState(false);

  const GetSectors = () => {
    getSectors((err, res) => {
      if (err) {
        console.log(err);
      } else {
        const s = res.toObject().sectorsList;

        setSectors(s);
      }
    });
  };

  const path = usePath();

  useEffect(() => {
    fetchNewsData();
    GetSectors();
    limitedAccess(["admin"], path);
    //eslint-disable-next-line
  }, []);

  const fetchNewsData = () => {
    getNews((err, res) => {
      if (err) {
        console.log(err);
      } else {
        setNews(res.toObject().newsList);
      }
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    let n = GetGRPCNews(userInput);

    newNews(n, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        fetchNewsData();
      }
    });
  };

  // const edit = id => {};

  const handleEdit = e => {};

  const deleteHandler = title => {
    var p = new Promise(res => {
      deleteNews(title, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.toObject());
        }
      });
      res();
    });

    p.then(fetchNewsData());
  };

  const showDeleteConfirm = title => {
    confirm({
      title: "Do you Want to delete this item?",
      onOk() {
        deleteHandler(title);
      },
      onCancel() {
        console.log("Cancel", title);
      }
    });
  };

  return (
    <MDBContainer className="text-center">
      <p className="h4 text-center mb-4">News</p>
      <MDBRow>
        <MDBCol md="6">
          <form onSubmit={submitHandler}>
            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  label="Title"
                  type="text"
                  value={userInput.title}
                  onChange={e => {
                    handleChange("title", e.target.value);
                  }}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  value={userInput.description}
                  onChange={e => {
                    handleChange("description", e.target.value);
                  }}
                  type="textarea"
                  label=" News Description"
                  rows="3"
                />
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ marginTop: "2%" }}>
              <MDBCol md={12}>
                <FormControl style={{ width: "100%", textAlign: "left" }}>
                  <InputLabel
                    htmlFor="Sector"
                    style={{
                      width: "100%",
                      textAlign: "left"
                    }}
                  >
                    Sector
                  </InputLabel>
                  <Select
                    style={{
                      width: "100%",
                      textAlign: "left"
                    }}
                    value={userInput.sector}
                    onChange={e => {
                      handleChange("sector", e.target.value);
                    }}
                    inputProps={{
                      name: "Sector",
                      id: "Sector"
                    }}
                  >
                    {sectors.map((sector, i) => (
                      <MenuItem value={sector.title}>{sector.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <Upload setImage={image => handleChange("image", image)} />
                {userInput.image ? (
                  <Img className="img-thumb " src={userInput.image} />
                ) : (
                  ""
                )}
              </MDBCol>
            </MDBRow>
            <div className="text-center mt-4">
              <MDBBtn color="info" type="submit">
                Save{" "}
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="6">
          <NewsTable
            showDeleteConfirm={title => showDeleteConfirm(title)}
            news={news}
          />
        </MDBCol>
      </MDBRow>
      <Modal
        visible={visible}
        title="Edit Portfolio"
        onOk={handleEdit}
        onCancel={() => {
          setVisible(!visible);
        }}
      >
        <form encType="multipart/form-data">
          <MDBRow>
            <MDBCol md="12">
              <MDBInput
                label="Title"
                type="text"
                value={edittitle}
                onChange={e => {
                  let title = e.target.value;
                  setEditTitle(title);
                }}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="12">
              <MDBInput
                value={editdes}
                onChange={e => {
                  let description = e.target.value;
                  setEditDes(description);
                }}
                type="textarea"
                label=" News Description"
                rows="3"
              />
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ marginTop: "2%" }}>
            <MDBCol md={12}>
              <FormControl style={{ width: "100%", textAlign: "left" }}>
                <InputLabel
                  htmlFor="Sector"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Sector
                </InputLabel>
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  value={editsector}
                  onChange={e => {
                    let editsector = e.target.value;
                    setEditSector(editsector);
                  }}
                  inputProps={{
                    name: "Sector",
                    id: "Sector"
                  }}
                >
                  <MenuItem value="A">Sector A</MenuItem>
                  <MenuItem value="B">Sector B</MenuItem>
                  <MenuItem value="C">Sector C</MenuItem>
                </Select>
              </FormControl>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="12">
              <Upload />
              {/* <input
                                type='file'
                                onChange={imageSelectedEditHandler}
                            /> */}
            </MDBCol>
          </MDBRow>
        </form>
      </Modal>
    </MDBContainer>
  );
};

export default News;
