import { GetClients } from "../clients";
import {
	QuoteParams,
	StatusParams,
	DistanceParams
} from "../proto/quotes/quotes_pb";
import { ProductParams, Query } from "../proto/products/products_pb";
import { Params as DbParams } from "../proto/db/db_pb";
import { Params as ServiceParams } from "../proto/services/services_pb";
import { Params as AuthorizationParams } from "../proto/authorization/authorization_pb";

const client = GetClients();

export const newQuote = (quote, callback) => {
	client.quotes.newQuote(quote, {}, (err, res) => callback(err, res));
};

export function GetQuote(id, callback) {
	let params = new QuoteParams();
	params.setId(id);

	client.quotes.getQuoteByID(params, {}, (err, res) => {
		callback(err, res);
	});
}

export function changeShippingStatus(id, callback) {
	let params = new StatusParams();
	params.setId(id);

	client.quotes.changeShippingStatus(params, {}, (err, res) => {
		callback(err, res);
	});
}

export const getDistance = (from, to, callback) => {
	let params = new DistanceParams();

	params.setFrom(from);
	params.setTo(to);

	client.quotes.getDistance(params, {}, (err, res) => callback(err, res));
};

export const GetProductByID = (id, callback) => {
	let params = new ProductParams();
	params.setId(id);

	client.products.getProductByID(params, {}, (err, res) =>
		callback(err, res)
	);
};

export const editProduct = (prod, callback) => {
	client.products.editProduct(prod, {}, (err, res) => callback(err, res));
};

export const getServices = (q, callback) => {
	let params = new ServiceParams();

	let query = new Query();
	query.setQuerystring(q);
	params.setQuery(query);

	client.services.getServices(params, {}, (err, res) => callback(err, res));
};

export const getUser = (id, callback) => {
	let params = new AuthorizationParams();

	params.setId(id);

	client.auth.getUser(params, {}, (err, res) => callback(err, res));
};

export const getUniqueFields = (field, collection, callback) => {
	let params = new DbParams();

	params.setField(field);
	params.setCollection(collection);

	client.db.getUnique(params, {}, (err, res) => callback(err, res));
};
