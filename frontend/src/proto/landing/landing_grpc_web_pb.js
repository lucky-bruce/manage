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

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Mix,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_NewMix = new grpc.web.MethodDescriptor(
	"/LandingService/NewMix",
	grpc.web.MethodType.UNARY,
	proto.Mix,
	proto.Response,
	/** @param {!proto.Mix} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Mix,
 *   !proto.Response>}
 */
const methodInfo_LandingService_NewMix = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Response,
	/** @param {!proto.Mix} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @param {!proto.Mix} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.newMix = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/NewMix",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewMix,
		callback
	);
};

/**
 * @param {!proto.Mix} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Response>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.newMix = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/NewMix",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewMix
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Mixes>}
 */
const methodDescriptor_LandingService_GetMixes = new grpc.web.MethodDescriptor(
	"/LandingService/GetMixes",
	grpc.web.MethodType.UNARY,
	proto.Params,
	proto.Mixes,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Mixes.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Params,
 *   !proto.Mixes>}
 */
const methodInfo_LandingService_GetMixes = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Mixes,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Mixes.deserializeBinary
);

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Mixes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Mixes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.getMixes = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/GetMixes",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetMixes,
		callback
	);
};

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Mixes>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.getMixes = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/GetMixes",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetMixes
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_DeleteMix = new grpc.web.MethodDescriptor(
	"/LandingService/DeleteMix",
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
const methodInfo_LandingService_DeleteMix = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.LandingServiceClient.prototype.deleteMix = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/DeleteMix",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeleteMix,
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
proto.LandingServicePromiseClient.prototype.deleteMix = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/DeleteMix",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeleteMix
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Basic,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_NewBasic = new grpc.web.MethodDescriptor(
	"/LandingService/NewBasic",
	grpc.web.MethodType.UNARY,
	proto.Basic,
	proto.Response,
	/** @param {!proto.Basic} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Basic,
 *   !proto.Response>}
 */
const methodInfo_LandingService_NewBasic = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Response,
	/** @param {!proto.Basic} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @param {!proto.Basic} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.newBasic = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/NewBasic",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewBasic,
		callback
	);
};

/**
 * @param {!proto.Basic} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Response>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.newBasic = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/NewBasic",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewBasic
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Basic>}
 */
const methodDescriptor_LandingService_GetBasic = new grpc.web.MethodDescriptor(
	"/LandingService/GetBasic",
	grpc.web.MethodType.UNARY,
	proto.Params,
	proto.Basic,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Basic.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Params,
 *   !proto.Basic>}
 */
const methodInfo_LandingService_GetBasic = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Basic,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Basic.deserializeBinary
);

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Basic)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Basic>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.getBasic = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/GetBasic",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetBasic,
		callback
	);
};

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Basic>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.getBasic = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/GetBasic",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetBasic
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Sector,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_NewSector = new grpc.web.MethodDescriptor(
	"/LandingService/NewSector",
	grpc.web.MethodType.UNARY,
	proto.Sector,
	proto.Response,
	/** @param {!proto.Sector} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Sector,
 *   !proto.Response>}
 */
const methodInfo_LandingService_NewSector = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Response,
	/** @param {!proto.Sector} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @param {!proto.Sector} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.newSector = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/NewSector",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewSector,
		callback
	);
};

/**
 * @param {!proto.Sector} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Response>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.newSector = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/NewSector",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewSector
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Sectors>}
 */
const methodDescriptor_LandingService_GetSectors = new grpc.web.MethodDescriptor(
	"/LandingService/GetSectors",
	grpc.web.MethodType.UNARY,
	proto.Params,
	proto.Sectors,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Sectors.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Params,
 *   !proto.Sectors>}
 */
const methodInfo_LandingService_GetSectors = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Sectors,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Sectors.deserializeBinary
);

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Sectors)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Sectors>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.getSectors = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/GetSectors",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetSectors,
		callback
	);
};

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Sectors>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.getSectors = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/GetSectors",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetSectors
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_DeleteSector = new grpc.web.MethodDescriptor(
	"/LandingService/DeleteSector",
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
const methodInfo_LandingService_DeleteSector = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.LandingServiceClient.prototype.deleteSector = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/DeleteSector",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeleteSector,
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
proto.LandingServicePromiseClient.prototype.deleteSector = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/DeleteSector",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeleteSector
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.News,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_NewNews = new grpc.web.MethodDescriptor(
	"/LandingService/NewNews",
	grpc.web.MethodType.UNARY,
	proto.News,
	proto.Response,
	/** @param {!proto.News} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.News,
 *   !proto.Response>}
 */
const methodInfo_LandingService_NewNews = new grpc.web.AbstractClientBase.MethodInfo(
	proto.Response,
	/** @param {!proto.News} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.Response.deserializeBinary
);

/**
 * @param {!proto.News} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.newNews = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/NewNews",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewNews,
		callback
	);
};

/**
 * @param {!proto.News} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Response>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.newNews = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/NewNews",
		request,
		metadata || {},
		methodDescriptor_LandingService_NewNews
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.NewsList>}
 */
const methodDescriptor_LandingService_GetNews = new grpc.web.MethodDescriptor(
	"/LandingService/GetNews",
	grpc.web.MethodType.UNARY,
	proto.Params,
	proto.NewsList,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.NewsList.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Params,
 *   !proto.NewsList>}
 */
const methodInfo_LandingService_GetNews = new grpc.web.AbstractClientBase.MethodInfo(
	proto.NewsList,
	/** @param {!proto.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.NewsList.deserializeBinary
);

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.NewsList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.NewsList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LandingServiceClient.prototype.getNews = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/GetNews",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetNews,
		callback
	);
};

/**
 * @param {!proto.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.NewsList>}
 *     A native promise that resolves to the response
 */
proto.LandingServicePromiseClient.prototype.getNews = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/GetNews",
		request,
		metadata || {},
		methodDescriptor_LandingService_GetNews
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Params,
 *   !proto.Response>}
 */
const methodDescriptor_LandingService_DeleteNews = new grpc.web.MethodDescriptor(
	"/LandingService/DeleteNews",
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
const methodInfo_LandingService_DeleteNews = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.LandingServiceClient.prototype.deleteNews = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/LandingService/DeleteNews",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeleteNews,
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
proto.LandingServicePromiseClient.prototype.deleteNews = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/LandingService/DeleteNews",
		request,
		metadata || {},
		methodDescriptor_LandingService_DeleteNews
	);
};

module.exports = proto;
