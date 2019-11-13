import React, { useState, useEffect, useReducer } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import Upload from "./Upload";
import { sectorsInput, getGRPCSector } from "../../../../utils/grpc";
import Img from "../../../../components/img/index";
import { newSector, getSectors } from "../../../../utils/backend";
import { usePath } from "hookrouter";
import { limitedAccess } from "../../../../utils/utils";
export default () => {
	const [tab, setTab] = useState(0);

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		sectorsInput
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	const descriptionChange = e => {
		let ms = userInput.sectorsList;
		ms[tab].description = e.target.value;

		handleChange("sectorsList", ms);
	};

	const submit = () => {
		for (let sector of userInput.sectorsList) {
			console.log(sector);

			let s = getGRPCSector(sector);

			newSector(s, (err, res) => {
				if (err) {
					console.log(err);
				}
			});
		}
		GetSectors();
	};

	const addSector = () => {
		var name = window.prompt("Please enter sector name");

		if (!name) {
			return;
		}

		handleChange("sectorsList", [
			...userInput.sectorsList,
			{ title: name }
		]);
	};

	const GetSectors = () => {
		getSectors((err, res) => {
			if (err) {
				console.log(err);
			} else {
				const sectors = res.toObject().sectorsList;
				console.log(sectors);
				handleChange("sectorsList", sectors);
			}
		});
	};
	const path = usePath();

	useEffect(() => {
		GetSectors();
		limitedAccess(["admin"], path);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MDBContainer>
			<form className="about-form">
				<p className="h4 text-center mb-4">About</p>
				<MDBRow>
					<MDBCol md="12" style={{ margin: "auto" }}>
						{userInput.sectorsList.map((sector, i) => (
							<div className="custom-control custom-radio custom-control-inline">
								<input
									defaultChecked={tab === i}
									type="radio"
									className="custom-control-input"
									id={`radio${i}`}
									name="about"
									onClick={() => {
										setTab(i);
									}}
								/>
								<label
									className="custom-control-label"
									htmlFor={`radio${i}`}
								>
									{sector.title}
								</label>
							</div>
						))}
						<div
							className="custom-control custom-radio custom-control-inline"
							style={{ cursor: "pointer" }}
							onClick={() => addSector()}
						>
							+
						</div>
					</MDBCol>
				</MDBRow>
				<MDBRow>
					<MDBCol md="12">
						<MDBInput
							type="textarea"
							label="Description"
							rows="3"
							value={
								userInput.sectorsList[tab]
									? userInput.sectorsList[tab].description
									: ""
							}
							onChange={e => descriptionChange(e)}
						/>
					</MDBCol>
				</MDBRow>
				<MDBRow>
					<MDBCol md="12">
						<Upload
							setImage={image => {
								let ms = userInput.sectorsList;
								if (ms.length !== 0) {
									ms[tab].image = image;

									handleChange("sectorsList", ms);
								}
							}}
						/>
						{userInput.sectorsList[tab] &&
						userInput.sectorsList[tab].image ? (
							<Img
								className="img-thumb "
								src={userInput.sectorsList[tab].image}
							/>
						) : (
							""
						)}
					</MDBCol>
				</MDBRow>
				<div className="text-center mt-4">
					<MDBBtn color="info" outline onClick={() => submit()}>
						Save
					</MDBBtn>
				</div>
			</form>
		</MDBContainer>
	);
};
