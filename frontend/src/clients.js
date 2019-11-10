import { AuthorizationServiceClient } from "./proto/authorization/authorization_grpc_web_pb";
import { QuoteServiceClient } from "./proto/quotes/quotes_grpc_web_pb";
import { ProductServiceClient } from "./proto/products/products_grpc_web_pb";
import { FinancialServiceClient } from "./proto/financial/financial_grpc_web_pb";
import { ChunkerClient } from "./proto/chunker/chunker_grpc_web_pb";
import { DbServiceClient } from "./proto/db/db_grpc_web_pb";
import { ServicesClient } from "./proto/services/services_grpc_web_pb";
import { LandingServiceClient } from "./proto/landing/landing_grpc_web_pb";

export function GetClients() {
	const ip = `${process.env.REACT_APP_SERVER_LOCAL_IP}:8080`;

	const quotes = new QuoteServiceClient(ip, null, null);
	const auth = new AuthorizationServiceClient(ip, null, null);
	const products = new ProductServiceClient(ip, null, null);

	const finances = new FinancialServiceClient(ip, null, null);

	const db = new DbServiceClient(ip, null, null);

	const chunker = new ChunkerClient(ip, null, null);

	const services = new ServicesClient(ip, null, null);

	const landing = new LandingServiceClient(ip, null, null);

	return {
		quotes,
		products,
		finances,
		auth,
		db,
		chunker,
		landing,
		services
	};
}
