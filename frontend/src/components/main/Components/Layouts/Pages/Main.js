import React, { Component } from "react";

import {
	MDBMask,
	MDBRow,
	MDBCol,
	MDBView,
	MDBContainer,
	MDBFormInline,
	MDBAnimation
} from "mdbreact";
import Header from "../Header";
import {
	About,
	Contact,
	Portfolio,
	Sectors,
	Quotes,
	Signup,
	Signin
} from "../Pages";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import BackgroundSlideshow from "react-background-slider";
import image2 from "../../../images/b.jpg";
import image3 from "../../../images/c.jpg";

class Main extends Component {
	state = {
		data: []
	};
	componentDidMount() {
		fetch("/mix", {
			method: "GET"
		})
			.then(res => res.json())
			.then(res => {
				if (!!res.info) {
					this.setState({ data: res.info });
				}
			});
	}
	render() {
		const image1 =
			"http://4.bp.blogspot.com/-LVDJIaNyM1A/UoAL7AIswrI/AAAAAAAAAAc/O1IPVytbLwE/s1600/_piscina_04.jpg";
		return (
			<div id="apppage">
				<Header />
				<MDBView>
					<BackgroundSlideshow
						duration={5}
						images={[image2, image3, image1]}
					/>
					<MDBMask className="d-flex justify-content-center align-items-center gradient">
						<MDBContainer>
							<MDBRow>
								<MDBCol
									md="6"
									className="white-text text-center text-md-left mt-xl-5 mb-5"
								>
									<MDBAnimation type="fadeInLeft" delay=".3s">
										<h1 className="h1-responsive font-weight-bold mt-sm-5">
											Cadastre-se para uma experiência
											melhor ...
										</h1>
										<hr className="hr-light" />
										<h6 className="mb-4">
											Usuário cadastrado, você tem
											vantagens exclusivas e únicas, o
											cadastro e grátis e rápido, confira
											as vantajes.
										</h6>
										<MDBFormInline>
											<Signin />
											<Signup />
										</MDBFormInline>
									</MDBAnimation>
								</MDBCol>

								<MDBCol md="6" xl="5" className="mt-xl-5">
									<MDBAnimation
										type="fadeInRight"
										delay=".3s"
									>
										<img
											src="https://pngimage.net/wp-content/uploads/2018/06/happy-client-png-7.png"
											alt=""
											className="img-fluid"
										/>
									</MDBAnimation>
								</MDBCol>
							</MDBRow>
						</MDBContainer>
					</MDBMask>
				</MDBView>

				<div id="colorlib-main">
					<About data={this.state.data} />
					<Portfolio />
					<Sectors data={this.state.data} />
					<Quotes />
					<Contact />
				</div>
				<ScrollUpButton
					style={{
						background: "#71c11c",
						padding: "12px 18px",
						borderRadius: "50%",
						width: "50px",
						height: "50px"
					}}
				/>
			</div>
		);
	}
}

export default Main;
