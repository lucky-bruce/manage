import React, { useState } from "react";
import Context from "../../components/context/context";
import { User } from "../../proto/authorization/authorization_pb";
import { navigate } from "hookrouter";
import GeneralInfo from "../../components/registration/general";
import RoleInfo from "../../components/registration/role";
import ContactInfo from "../../components/registration/contact";
import CompanyInfo from "../../components/registration/company";
import AccountInfo from "../../components/registration/account";

export default function Register() {
	const [tab, setTab] = useState(0);
	const [firstname, setFirstname] = useState("");
	const [midname, setMidname] = useState("");
	const [lastname, setLastname] = useState("");
	const [role, setRole] = useState("user");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [phonenumber, setPhonenumber] = useState("");
	const [state, setState] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [cnpj, setcnpj] = useState("");
	const [companyname, setCompanyname] = useState("");
	const [category, setCategory] = useState("");
	const [zip, setZip] = useState("");

	const context = React.useContext(Context);
	const client = context.auth;

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
		request.setCnpj(cnpj);
		request.setCompanyname(companyname);
		request.setCategory(category);

		client.register(request, {}, (err, res) => {
			if (err) {
				console.log(err);
			}
			if (res) {
				const r = res.toObject();
				localStorage.setItem("token", r.token);
				navigate("/", true);
			}
		});
	}

	var tabs = [
		<RoleInfo
			role={role}
			onRoleChange={role => setRole(role)}
			switchTab={() => {
				setTab(1);
			}}
		/>,
		<GeneralInfo
			onFirstNameChange={name => setFirstname(name)}
			firstname={firstname}
			onMidNameChange={name => setMidname(name)}
			midname={midname}
			onLastNameChange={name => setLastname(name)}
			lastname={lastname}
			switchTab={() => {
				setTab(2);
			}}
		/>,
		<ContactInfo
			onStateChange={value => setState(value)}
			state={state}
			onCityChange={value => setCity(value)}
			city={city}
			onPhoneNumberChange={value => setPhonenumber(value)}
			phonenumber={phonenumber}
			onEmailChange={value => setEmail(value)}
			email={email}
			onAddressChange={value => setAddress(value)}
			address={address}
			switchTab={() => setTab(3)}
		/>,
		<AccountInfo
			onUsernameChange={value => setUsername(value)}
			username={username}
			onPasswordChange={value => setPassword(value)}
			password={password}
			Register={() => Register()}
		/>
	];

	if (role === "supplier") {
		tabs.splice(
			3,
			0,
			<CompanyInfo
				onCNPJChange={value => setcnpj(value)}
				cnpj={cnpj}
				onCompanyNameChange={value => setCompanyname(value)}
				companyname={companyname}
				onCategoryChange={value => setCategory(value)}
				category={category}
				onZipChange={value => setZip(value)}
				zip={zip}
				switchTab={() => setTab(4)}
			/>
		);
	}

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
						{renderTabs()}
						<p className="mt-5 mb-3 text-muted text-center">
							© 2017-2019
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
