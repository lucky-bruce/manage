/**
 * @fileoverview gRPC-Web generated client stub for financial
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require("grpc-web");

var products_products_pb = require("../products/products_pb.js");
const proto = {};
proto.financial = require("./financial_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.financial.FinancialServiceClient = function(
	hostname,
	credentials,
	options
) {
	if (!options) options = {};
	options["format"] = "text";

	/**
	 * @private @const {!grpc.web.GrpcWebClientBase} The client
	 */
	this.client_ = new grpc.web.GrpcWebClientBase(options);

	/**
	 * @private @const {string} The hostname
	 */
	this.hostname_ = hostname;

	/**
	 * @private @const {?Object} The credentials to be used to connect
	 *    to the server
	 */
	this.credentials_ = credentials;

	/**
	 * @private @const {?Object} Options for the client
	 */
	this.options_ = options;
};

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.financial.FinancialServicePromiseClient = function(
	hostname,
	credentials,
	options
) {
	if (!options) options = {};
	options["format"] = "text";

	/**
	 * @private @const {!grpc.web.GrpcWebClientBase} The client
	 */
	this.client_ = new grpc.web.GrpcWebClientBase(options);

	/**
	 * @private @const {string} The hostname
	 */
	this.hostname_ = hostname;

	/**
	 * @private @const {?Object} The credentials to be used to connect
	 *    to the server
	 */
	this.credentials_ = credentials;

	/**
	 * @private @const {?Object} Options for the client
	 */
	this.options_ = options;
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Params,
 *   !proto.financial.Response>}
 */
const methodDescriptor_FinancialService_GetIncome = new grpc.web.MethodDescriptor(
	"/financial.FinancialService/GetIncome",
	grpc.web.MethodType.UNARY,
	proto.financial.Params,
	proto.financial.Response,
	/** @param {!proto.financial.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.financial.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Params,
 *   !proto.financial.Response>}
 */
const methodInfo_FinancialService_GetIncome = new grpc.web.AbstractClientBase.MethodInfo(
	proto.financial.Response,
	/** @param {!proto.financial.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.financial.Response.deserializeBinary
);

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.getIncome = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/financial.FinancialService/GetIncome",
		request,
		metadata || {},
		methodDescriptor_FinancialService_GetIncome,
		callback
	);
};

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.Response>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.getIncome = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/financial.FinancialService/GetIncome",
		request,
		metadata || {},
		methodDescriptor_FinancialService_GetIncome
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Bank,
 *   !proto.financial.EmptyResponse>}
 */
const methodDescriptor_FinancialService_NewBank = new grpc.web.MethodDescriptor(
	"/financial.FinancialService/NewBank",
	grpc.web.MethodType.UNARY,
	proto.financial.Bank,
	proto.financial.EmptyResponse,
	/** @param {!proto.financial.Bank} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.financial.EmptyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Bank,
 *   !proto.financial.EmptyResponse>}
 */
const methodInfo_FinancialService_NewBank = new grpc.web.AbstractClientBase.MethodInfo(
	proto.financial.EmptyResponse,
	/** @param {!proto.financial.Bank} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.financial.EmptyResponse.deserializeBinary
);

/**
 * @param {!proto.financial.Bank} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.EmptyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.EmptyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.newBank = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/financial.FinancialService/NewBank",
		request,
		metadata || {},
		methodDescriptor_FinancialService_NewBank,
		callback
	);
};

/**
 * @param {!proto.financial.Bank} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.EmptyResponse>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.newBank = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/financial.FinancialService/NewBank",
		request,
		metadata || {},
		methodDescriptor_FinancialService_NewBank
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Request,
 *   !proto.financial.Response>}
 */
const methodDescriptor_FinancialService_GetBanks = new grpc.web.MethodDescriptor(
	"/financial.FinancialService/GetBanks",
	grpc.web.MethodType.UNARY,
	proto.financial.Request,
	proto.financial.Response,
	/** @param {!proto.financial.Request} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.financial.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Request,
 *   !proto.financial.Response>}
 */
const methodInfo_FinancialService_GetBanks = new grpc.web.AbstractClientBase.MethodInfo(
	proto.financial.Response,
	/** @param {!proto.financial.Request} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.financial.Response.deserializeBinary
);

/**
 * @param {!proto.financial.Request} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.getBanks = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/financial.FinancialService/GetBanks",
		request,
		metadata || {},
		methodDescriptor_FinancialService_GetBanks,
		callback
	);
};

/**
 * @param {!proto.financial.Request} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.Response>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.getBanks = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/financial.FinancialService/GetBanks",
		request,
		metadata || {},
		methodDescriptor_FinancialService_GetBanks
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Params,
 *   !proto.financial.Response>}
 */
const methodDescriptor_FinancialService_ToDestination = new grpc.web.MethodDescriptor(
	"/financial.FinancialService/ToDestination",
	grpc.web.MethodType.UNARY,
	proto.financial.Params,
	proto.financial.Response,
	/** @param {!proto.financial.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.financial.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Params,
 *   !proto.financial.Response>}
 */
const methodInfo_FinancialService_ToDestination = new grpc.web.AbstractClientBase.MethodInfo(
	proto.financial.Response,
	/** @param {!proto.financial.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.financial.Response.deserializeBinary
);

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.toDestination = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/financial.FinancialService/ToDestination",
		request,
		metadata || {},
		methodDescriptor_FinancialService_ToDestination,
		callback
	);
};

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.Response>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.toDestination = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/financial.FinancialService/ToDestination",
		request,
		metadata || {},
		methodDescriptor_FinancialService_ToDestination
	);
};

module.exports = proto.financial;
