import { GetClients } from "../clients";
import { QuoteParams } from "../proto/quotes/quotes_pb";
import { StatusParams } from "../proto/quotes/quotes_pb";

const client = GetClients();

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