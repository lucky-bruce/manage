/**
 * @fileoverview gRPC-Web generated client stub for
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require("grpc-web");

const proto = require("./landing_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.LandingServiceClient = function(hostname, credentials, options) {
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
proto.LandingServicePromiseClient = function(hostname, credentials, options) {
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
 *   !proto.Team,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_NewTeam = new grpc.web.MethodDescriptor(
	"/LandingService/NewTeam",
	grpc.web.MethodType.UNARY,
	proto.Team,
	proto.Response,
	/** @param {!proto.Team} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Team,
 *   !proto.Response>}
 */
const methodInfo_LandingService_NewTeam = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Response,
	/** @param {!proto.Team} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @param {!proto.Team} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.newTeam = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/NewTeam",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewTeam,
		callback
	);
};

/**
 * @param {!proto.Team} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Response>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.newTeam = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/NewTeam",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewTeam
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Teams>}
 */
const methodDescriptor_LandingService_GetTeams = new grpc.web.MethodDescriptor(
	"/LandingService/GetTeams",
	grpc.web.MethodType.UNARY,
	proto.Params,
	proto.Teams,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Teams.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Params,
 *   !proto.Teams>}
 */
const methodInfo_LandingService_GetTeams = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Teams,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Teams.deserializeBinary
);

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Teams)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Teams>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.getTeams = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/GetTeams",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetTeams,
		callback
	);
};

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Teams>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.getTeams = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/GetTeams",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetTeams
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_DeleteTeam = new grpc.web.MethodDescriptor(
	"/LandingService/DeleteTeam",
	grpc.web.MethodType.UNARY,
	proto.Params,
	proto.Response,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Params,
 *   !proto.Response>}
 */
const methodInfo_LandingService_DeleteTeam = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Response,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.deleteTeam = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/DeleteTeam",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeleteTeam,
		callback
	);
};

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Response>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.deleteTeam = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/DeleteTeam",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeleteTeam
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Portfolio,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_NewPortfolio = new grpc.web.MethodDescriptor(
	"/LandingService/NewPortfolio",
	grpc.web.MethodType.UNARY,
	proto.Portfolio,
	proto.Response,
	/** @param {!proto.Portfolio} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Portfolio,
 *   !proto.Response>}
 */
const methodInfo_LandingService_NewPortfolio = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Response,
	/** @param {!proto.Portfolio} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @param {!proto.Portfolio} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.newPortfolio = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/NewPortfolio",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewPortfolio,
		callback
	);
};

/**
 * @param {!proto.Portfolio} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Response>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.newPortfolio = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/NewPortfolio",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewPortfolio
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Portfolios>}
 */
const methodDescriptor_LandingService_GetPortfolios = new grpc.web.MethodDescriptor(
	"/LandingService/GetPortfolios",
	grpc.web.MethodType.UNARY,
	proto.Params,
	proto.Portfolios,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Portfolios.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Params,
 *   !proto.Portfolios>}
 */
const methodInfo_LandingService_GetPortfolios = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Portfolios,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Portfolios.deserializeBinary
);

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Portfolios)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Portfolios>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.getPortfolios = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/GetPortfolios",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetPortfolios,
		callback
	);
};

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Portfolios>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.getPortfolios = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/GetPortfolios",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetPortfolios
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_DeletePortfolio = new grpc.web.MethodDescriptor(
	"/LandingService/DeletePortfolio",
	grpc.web.MethodType.UNARY,
	proto.Params,
	proto.Response,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Params,
 *   !proto.Response>}
 */
const methodInfo_LandingService_DeletePortfolio = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Response,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.deletePortfolio = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/DeletePortfolio",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeletePortfolio,
		callback
	);
};

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Response>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.deletePortfolio = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/DeletePortfolio",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeletePortfolio
	);
};

module.exports = proto;
