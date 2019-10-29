import decode from "jwt-decode";
import { navigate } from "hookrouter";
import { Product } from "../proto/products/products_pb";

export function checkAuthorization(profile, path) {
	if (profile) {
		if (profile.exp > new Date().getTime() / 1000) {
			return true;
		}
		navigate("/login", true, { to: path });
	}
	navigate("/login", true, { to: path });
}

export function limitedAccess(roles, path) {
	const profile = GetProfile();

	if (checkAuthorization(profile, path)) {
		if (roles.length > 0) {
			for (var i in roles) {
				if (profile.role === roles[i] || profile.role === "admin")
					return;
			}
			navigate("/not-permitted");
		}
	}
}

export function GetProfile() {
	var data = null;
	try {
		data = decode(getToken());
	} catch (e) {
		return null;
	}
	return data;
}

export function getToken() {
	return localStorage.getItem("token");
}

export function isLoggedIn() {
	if (GetProfile()) {
		return true;
	} else {
		return false;
	}
}

export function logOut() {
	localStorage.removeItem("token");
}

export function ToGRPCObject(obj) {
	var values = Object.values(obj);
	var grpc = {};
	for (var i in values) {
		grpc[parseInt(i)] = values[i];
	}

	return grpc;
}

export function GetIncome(incomes) {
	let total = 0;
	for (var i in incomes) {
		let t = 0;

		for (var j in incomes[i].payoffsList) {
			t += incomes[i].payoffsList[j].amount;
		}

		total += t - incomes[i].sent;
	}

	return total;
}

export function GetStatus(num) {
	switch (num) {
		case 0:
			return "New";
		case 1:
			return "Accepted by Supplier";
		case 2:
			return "Accepted by Client";

		case 3:
			return "Rejected by Supplier";
		case 4:
			return "Rejected by Client";
		default:
			break;
	}
}

export const GetGRPCProduct = obj => {
	let product = new Product();

	product.setId(obj.id);
	product.setName(obj.name);
	product.setQtyinstock(obj.qtyinstock);
	product.setCategory(obj.category);
	product.setDescription(obj.description);
	product.setSubcategory(obj.subcategory);
	product.setBuyingprice(obj.buyingprice);
	product.setDesiredprofit(obj.desiredprofit);
	product.setSellingprice(
		obj.buyingprice + (obj.buyingprice * obj.desiredprofit) / 100
	);
	product.setSector(obj.sector);
	product.setSizew(obj.sizew.toFixed(1));
	product.setSizel(obj.sizel.toFixed(1));
	product.setSizeh(obj.sizeh.toFixed(1));
	product.setUserid(obj.userid);
	product.setShipping(obj.shipping);
	return product;
};

export const TimestampSearch = (from, to, timestampLink) => {
	from = from.valueOf() / 1000 - 86400;
	to =
		to !== ""
			? Math.floor(to.valueOf() / 1000 + 86400)
			: new Date().valueOf() / 1000;

	timestampLink = timestampLink || "timestamp";

	return `"$and":[{"${timestampLink}":{"$gte": ${from}}},{"${timestampLink}":{"$lte": ${to}}}]`;
};
