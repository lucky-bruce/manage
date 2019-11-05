import React from "react";
import { isLoggedIn, GetProfile } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { A } from "hookrouter";
import { withStyles } from "@material-ui/core/styles";

const styles = {
	boxShadow: "none",
	backgroundColor: "transparent !important"
};

function Account() {
	const profile = GetProfile();

	var acc = (
		<div className="d-flex justify-content-between">
			<A className="text-white" href="/login">
				Login
			</A>
			<A className="text-white ml-3" href="/regoster">
				Register
			</A>
		</div>
	);

	if (isLoggedIn()) {
		acc = (
			<div
				className={styles}
				className="d-flex flex-column mr-3"
				style={{
					boxShadow: "none!important",
					background: "transparent"
				}}
			>
				<div style={{ whiteSpace: "nowrap" }}>
					{profile.firstName + " " + profile.lastName}{" "}
					<FontAwesomeIcon icon={faUser} />
				</div>

				<div className="dropdown ">
					<A
						className="text-white font-weight-light nav-link dropdown-toggle p-0"
						href="#"
						id="navbarDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Account settings
					</A>
					<div
						className="dropdown-menu 	"
						aria-labelledby="navbarDropdown"
					>
						<A className="dropdown-item" href="/profile">
							My profile
						</A>
						<A className="dropdown-item" href="/logout">
							Log out
						</A>

						<div className="dropdown-divider"></div>
						<A className="dropdown-item" href="#">
							Something else here
						</A>
					</div>
				</div>
			</div>
		);
	}
	return acc;
}

export default withStyles(styles)(Account);
