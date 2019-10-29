/**
 * @fileoverview gRPC-Web generated client stub for quotes
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require("grpc-web");

var products_products_pb = require("../products/products_pb.js");
const proto = {};
proto.quotes = require("./quotes_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.quotes.QuoteServiceClient = function(hostname, credentials, options) {
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
proto.quotes.QuoteServicePromiseClient = function(
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
 *   !proto.quotes.Quote,
 *   !proto.quotes.Response>}
 */
const methodDescriptor_QuoteService_NewQuote = new grpc.web.MethodDescriptor(
	"/quotes.QuoteService/NewQuote",
	grpc.web.MethodType.UNARY,
	proto.quotes.Quote,
	proto.quotes.Response,
	/** @param {!proto.quotes.Quote} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.quotes.Quote,
 *   !proto.quotes.Response>}
 */
const methodInfo_QuoteService_NewQuote = new grpc.web.AbstractClientBase.MethodInfo(
	proto.quotes.Response,
	/** @param {!proto.quotes.Quote} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Response.deserializeBinary
);

/**
 * @param {!proto.quotes.Quote} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.quotes.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.quotes.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.quotes.QuoteServiceClient.prototype.newQuote = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/quotes.QuoteService/NewQuote",
		request,
		metadata || {},
		methodDescriptor_QuoteService_NewQuote,
		callback
	);
};

/**
 * @param {!proto.quotes.Quote} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.quotes.Response>}
 *     A native promise that resolves to the response
 */
proto.quotes.QuoteServicePromiseClient.prototype.newQuote = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/quotes.QuoteService/NewQuote",
		request,
		metadata || {},
		methodDescriptor_QuoteService_NewQuote
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.Query,
 *   !proto.quotes.QuoteResponse>}
 */
const methodDescriptor_QuoteService_GetQuotes = new grpc.web.MethodDescriptor(
	"/quotes.QuoteService/GetQuotes",
	grpc.web.MethodType.UNARY,
	products_products_pb.Query,
	proto.quotes.QuoteResponse,
	/** @param {!proto.products.Query} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.QuoteResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.Query,
 *   !proto.quotes.QuoteResponse>}
 */
const methodInfo_QuoteService_GetQuotes = new grpc.web.AbstractClientBase.MethodInfo(
	proto.quotes.QuoteResponse,
	/** @param {!proto.products.Query} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.QuoteResponse.deserializeBinary
);

/**
 * @param {!proto.products.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.quotes.QuoteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.quotes.QuoteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.quotes.QuoteServiceClient.prototype.getQuotes = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/quotes.QuoteService/GetQuotes",
		request,
		metadata || {},
		methodDescriptor_QuoteService_GetQuotes,
		callback
	);
};

/**
 * @param {!proto.products.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.quotes.QuoteResponse>}
 *     A native promise that resolves to the response
 */
proto.quotes.QuoteServicePromiseClient.prototype.getQuotes = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/quotes.QuoteService/GetQuotes",
		request,
		metadata || {},
		methodDescriptor_QuoteService_GetQuotes
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.quotes.QuoteParams,
 *   !proto.quotes.Quote>}
 */
const methodDescriptor_QuoteService_GetQuoteByID = new grpc.web.MethodDescriptor(
	"/quotes.QuoteService/GetQuoteByID",
	grpc.web.MethodType.UNARY,
	proto.quotes.QuoteParams,
	proto.quotes.Quote,
	/** @param {!proto.quotes.QuoteParams} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Quote.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.quotes.QuoteParams,
 *   !proto.quotes.Quote>}
 */
const methodInfo_QuoteService_GetQuoteByID = new grpc.web.AbstractClientBase.MethodInfo(
	proto.quotes.Quote,
	/** @param {!proto.quotes.QuoteParams} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Quote.deserializeBinary
);

/**
 * @param {!proto.quotes.QuoteParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.quotes.Quote)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.quotes.Quote>|undefined}
 *     The XHR Node Readable Stream
 */
proto.quotes.QuoteServiceClient.prototype.getQuoteByID = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/quotes.QuoteService/GetQuoteByID",
		request,
		metadata || {},
		methodDescriptor_QuoteService_GetQuoteByID,
		callback
	);
};

/**
 * @param {!proto.quotes.QuoteParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.quotes.Quote>}
 *     A native promise that resolves to the response
 */
proto.quotes.QuoteServicePromiseClient.prototype.getQuoteByID = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/quotes.QuoteService/GetQuoteByID",
		request,
		metadata || {},
		methodDescriptor_QuoteService_GetQuoteByID
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.quotes.QuoteParams,
 *   !proto.quotes.Response>}
 */
const methodDescriptor_QuoteService_DeleteQuote = new grpc.web.MethodDescriptor(
	"/quotes.QuoteService/DeleteQuote",
	grpc.web.MethodType.UNARY,
	proto.quotes.QuoteParams,
	proto.quotes.Response,
	/** @param {!proto.quotes.QuoteParams} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.quotes.QuoteParams,
 *   !proto.quotes.Response>}
 */
const methodInfo_QuoteService_DeleteQuote = new grpc.web.AbstractClientBase.MethodInfo(
	proto.quotes.Response,
	/** @param {!proto.quotes.QuoteParams} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Response.deserializeBinary
);

/**
 * @param {!proto.quotes.QuoteParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.quotes.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.quotes.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.quotes.QuoteServiceClient.prototype.deleteQuote = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/quotes.QuoteService/DeleteQuote",
		request,
		metadata || {},
		methodDescriptor_QuoteService_DeleteQuote,
		callback
	);
};

/**
 * @param {!proto.quotes.QuoteParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.quotes.Response>}
 *     A native promise that resolves to the response
 */
proto.quotes.QuoteServicePromiseClient.prototype.deleteQuote = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/quotes.QuoteService/DeleteQuote",
		request,
		metadata || {},
		methodDescriptor_QuoteService_DeleteQuote
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.quotes.Quote,
 *   !proto.quotes.Response>}
 */
const methodDescriptor_QuoteService_EditQuote = new grpc.web.MethodDescriptor(
	"/quotes.QuoteService/EditQuote",
	grpc.web.MethodType.UNARY,
	proto.quotes.Quote,
	proto.quotes.Response,
	/** @param {!proto.quotes.Quote} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.quotes.Quote,
 *   !proto.quotes.Response>}
 */
const methodInfo_QuoteService_EditQuote = new grpc.web.AbstractClientBase.MethodInfo(
	proto.quotes.Response,
	/** @param {!proto.quotes.Quote} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Response.deserializeBinary
);

/**
 * @param {!proto.quotes.Quote} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.quotes.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.quotes.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.quotes.QuoteServiceClient.prototype.editQuote = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/quotes.QuoteService/EditQuote",
		request,
		metadata || {},
		methodDescriptor_QuoteService_EditQuote,
		callback
	);
};

/**
 * @param {!proto.quotes.Quote} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.quotes.Response>}
 *     A native promise that resolves to the response
 */
proto.quotes.QuoteServicePromiseClient.prototype.editQuote = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/quotes.QuoteService/EditQuote",
		request,
		metadata || {},
		methodDescriptor_QuoteService_EditQuote
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.Query,
 *   !proto.quotes.Stats>}
 */
const methodDescriptor_QuoteService_GetStatistics = new grpc.web.MethodDescriptor(
	"/quotes.QuoteService/GetStatistics",
	grpc.web.MethodType.UNARY,
	products_products_pb.Query,
	proto.quotes.Stats,
	/** @param {!proto.products.Query} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Stats.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.Query,
 *   !proto.quotes.Stats>}
 */
const methodInfo_QuoteService_GetStatistics = new grpc.web.AbstractClientBase.MethodInfo(
	proto.quotes.Stats,
	/** @param {!proto.products.Query} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.quotes.Stats.deserializeBinary
);

/**
 * @param {!proto.products.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.quotes.Stats)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.quotes.Stats>|undefined}
 *     The XHR Node Readable Stream
 */
proto.quotes.QuoteServiceClient.prototype.getStatistics = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/quotes.QuoteService/GetStatistics",
		request,
		metadata || {},
		methodDescriptor_QuoteService_GetStatistics,
		callback
	);
};

/**
 * @param {!proto.products.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.quotes.Stats>}
 *     A native promise that resolves to the response
 */
proto.quotes.QuoteServicePromiseClient.prototype.getStatistics = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/quotes.QuoteService/GetStatistics",
		request,
		metadata || {},
		methodDescriptor_QuoteService_GetStatistics
	);
};

module.exports = proto.quotes;
