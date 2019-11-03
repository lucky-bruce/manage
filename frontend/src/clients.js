import { AuthorizationServiceClient } from "./proto/authorization/authorization_grpc_web_pb";
import { QuoteServiceClient } from "./proto/quotes/quotes_grpc_web_pb";
import { ProductServiceClient } from "./proto/products/products_grpc_web_pb";
import { FinancialServiceClient } from "./proto/financial/financial_grpc_web_pb";
import { ChunkerClient } from "./proto/chunker/chunker_grpc_web_pb";
import { DbServiceClient } from "./proto/db/db_grpc_web_pb";
import { ServicesClient } from "./proto/services/services_grpc_web_pb";

export function GetClients() {
	const quotes = new QuoteServiceClient(
		"http://192.168.0.106:8080",
		null,
		null
	);
	const auth = new AuthorizationServiceClient(
		"http://192.168.0.106:8080",
		null,
		null
	);
	const products = new ProductServiceClient(
		"http://192.168.0.106:8080",
		null,
		null
	);

	const finances = new FinancialServiceClient(
		"http://192.168.0.106:8080",
		null,
		null
	);

	const db = new DbServiceClient("http://192.168.0.106:8080", null, null);

	const chunker = new ChunkerClient("http://192.168.0.106:8080", null, null);

	const services = new ServicesClient(
		"http://192.168.0.106:8080",
		null,
		null
	);

	return {
		quotes,
		products,
		finances,
		auth,
		db,
		chunker,
		services
	};
}
