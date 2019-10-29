import React, { useState, useEffect } from "react";
import Context from "../../components/context/context";
import { User, Params } from "../../proto/authorization/authorization_pb";
import { navigate, useQueryParams } from "hookrouter";
import GeneralInfo from "../../components/registration/general";
import AddressInfo from "../../components/staff/addressInfo";
import AccountInfo from "../../components/registration/account";

export default function StaffForm() {
	const context = React.useContext(Context);
	const client = context.auth;

	const [error, setError] = useState("");
	const [queryParams] = useQueryParams();

	useEffect(() => {
		if (queryParams.id) {
			findCompany(queryParams.id);
		} else {
			setError("Bad link. Company ID is not stated");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function findCompany(id) {
		let params = new Params();

		params.setId(id);

		client.getUser(params, {}, (err, res) => {
			if (err) {
				console.log(err);

				setError(
					"Company ID is not valid. Please ask your employeer to give you a valid link"
				);
			}

			if (res) {
				res = res.toObject();
				setCompanyname(res.companyname);
				setCompanyid(res.id);
			}
		});
	}

	const [tab, setTab] = useState(0);
	const [firstname, setFirstname] = useState("");
	const [midname, setMidname] = useState("");
	const [lastname, setLastname] = useState("");
	const [role] = useState("staff");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [phonenumber, setPhonenumber] = useState("");
	const [state, setState] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [companyid, setCompanyid] = useState("");
	const [companyname, setCompanyname] = useState("");

	function Register() {
		let request = new User();
		request.setFirstname(firstname);
		request.setMidname(midname);
		request.setLastname(lastname);
		request.setRole(role);
		request.setPassword(password);
		request.setEmail(email);
		request.setPhonenumber(phonenumber);
		request.setUsername(username);
		request.setState(state);
		request.setCity(city);
		request.setAddress(address);
		request.setCompanyid(companyid);
		request.setCompanyname(companyname);

		client.register(request, {}, (err, res) => {
			if (err) {
				console.log(err);
			}
			if (res) {
				const r = res.toObject();
				localStorage.setItem("token", r.token);
				navigate("/profile", true);
			}
		});
	}

	var tabs = [
		<GeneralInfo
			onFirstNameChange={name => setFirstname(name)}
			firstname={firstname}
			onMidNameChange={name => setMidname(name)}
			midname={midname}
			onLastNameChange={name => setLastname(name)}
			lastname={lastname}
			switchTab={() => {
				setTab(1);
			}}
		/>,
		<AddressInfo
			email={email}
			onEmailChange={value => setEmail(value)}
			phonenumber={phonenumber}
			onPhoneNumberChange={value => setPhonenumber(value)}
			state={state}
			onStateChange={value => setState(value)}
			city={city}
			onCityChange={value => setCity(value)}
			address={address}
			onAddressChange={value => setAddress(value)}
			switchTab={() => {
				setTab(2);
			}}
		/>,
		<AccountInfo
			onUsernameChange={value => setUsername(value)}
			username={username}
			onPasswordChange={value => setPassword(value)}
			password={password}
			Register={() => Register()}
		/>
	];

	function renderTabs() {
		return tabs[tab];
	}

	function switchTab(t) {
		setTab(t);
	}

	var switchers = [];

	for (let i = 0; i < tabs.length; i++) {
		switchers.push(
			<span
				key={i}
				className={`tab-indicator ${
					tab === parseInt(i) ? "active" : ""
				}`}
				onClick={() => switchTab(parseInt(i))}
			>
				{parseInt(i) + 1}
			</span>
		);
	}

	return (
		<div className="d-flex  flex-column" style={{ height: "100vh" }}>
			<div className="form-signin d-flex justify-content-between align-items-center ">
				<div className="d-flex flex-column  mb-3">{switchers}</div>
				<div className="w-75 ">
					<div className="d-flex justify-content-center">
						<span className="text-center mb-3">
							<h1>Logo</h1>

							<span>Registration</span>
						</span>
					</div>
					<div style={{ alignItems: "stretch" }}>
						{error ? error : renderTabs()}
						<p className="mt-5 mb-3 text-muted text-center">
							© 2017-2019
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
