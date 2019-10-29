/**
 * @fileoverview gRPC-Web generated client stub for services
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require("grpc-web");

var products_products_pb = require("../products/products_pb.js");
const proto = {};
proto.services = require("./services_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.ServicesClient = function(hostname, credentials, options) {
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
proto.services.ServicesPromiseClient = function(
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
 *   !proto.services.Params,
 *   !proto.services.Service>}
 */
const methodDescriptor_Services_GetService = new grpc.web.MethodDescriptor(
	"/services.Services/GetService",
	grpc.web.MethodType.UNARY,
	proto.services.Params,
	proto.services.Service,
	/** @param {!proto.services.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.Service.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.Params,
 *   !proto.services.Service>}
 */
const methodInfo_Services_GetService = new grpc.web.AbstractClientBase.MethodInfo(
	proto.services.Service,
	/** @param {!proto.services.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.Service.deserializeBinary
);

/**
 * @param {!proto.services.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.Service)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.Service>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ServicesClient.prototype.getService = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/services.Services/GetService",
		request,
		metadata || {},
		methodDescriptor_Services_GetService,
		callback
	);
};

/**
 * @param {!proto.services.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.Service>}
 *     A native promise that resolves to the response
 */
proto.services.ServicesPromiseClient.prototype.getService = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/services.Services/GetService",
		request,
		metadata || {},
		methodDescriptor_Services_GetService
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.Params,
 *   !proto.services.ServicesResponse>}
 */
const methodDescriptor_Services_GetServices = new grpc.web.MethodDescriptor(
	"/services.Services/GetServices",
	grpc.web.MethodType.UNARY,
	proto.services.Params,
	proto.services.ServicesResponse,
	/** @param {!proto.services.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.ServicesResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.Params,
 *   !proto.services.ServicesResponse>}
 */
const methodInfo_Services_GetServices = new grpc.web.AbstractClientBase.MethodInfo(
	proto.services.ServicesResponse,
	/** @param {!proto.services.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.ServicesResponse.deserializeBinary
);

/**
 * @param {!proto.services.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ServicesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ServicesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ServicesClient.prototype.getServices = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/services.Services/GetServices",
		request,
		metadata || {},
		methodDescriptor_Services_GetServices,
		callback
	);
};

/**
 * @param {!proto.services.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ServicesResponse>}
 *     A native promise that resolves to the response
 */
proto.services.ServicesPromiseClient.prototype.getServices = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/services.Services/GetServices",
		request,
		metadata || {},
		methodDescriptor_Services_GetServices
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.Service,
 *   !proto.services.Response>}
 */
const methodDescriptor_Services_NewService = new grpc.web.MethodDescriptor(
	"/services.Services/NewService",
	grpc.web.MethodType.UNARY,
	proto.services.Service,
	proto.services.Response,
	/** @param {!proto.services.Service} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.Service,
 *   !proto.services.Response>}
 */
const methodInfo_Services_NewService = new grpc.web.AbstractClientBase.MethodInfo(
	proto.services.Response,
	/** @param {!proto.services.Service} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.Response.deserializeBinary
);

/**
 * @param {!proto.services.Service} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ServicesClient.prototype.newService = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/services.Services/NewService",
		request,
		metadata || {},
		methodDescriptor_Services_NewService,
		callback
	);
};

/**
 * @param {!proto.services.Service} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.Response>}
 *     A native promise that resolves to the response
 */
proto.services.ServicesPromiseClient.prototype.newService = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/services.Services/NewService",
		request,
		metadata || {},
		methodDescriptor_Services_NewService
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.Service,
 *   !proto.services.Response>}
 */
const methodDescriptor_Services_EditService = new grpc.web.MethodDescriptor(
	"/services.Services/EditService",
	grpc.web.MethodType.UNARY,
	proto.services.Service,
	proto.services.Response,
	/** @param {!proto.services.Service} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.Service,
 *   !proto.services.Response>}
 */
const methodInfo_Services_EditService = new grpc.web.AbstractClientBase.MethodInfo(
	proto.services.Response,
	/** @param {!proto.services.Service} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.Response.deserializeBinary
);

/**
 * @param {!proto.services.Service} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ServicesClient.prototype.editService = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/services.Services/EditService",
		request,
		metadata || {},
		methodDescriptor_Services_EditService,
		callback
	);
};

/**
 * @param {!proto.services.Service} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.Response>}
 *     A native promise that resolves to the response
 */
proto.services.ServicesPromiseClient.prototype.editService = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/services.Services/EditService",
		request,
		metadata || {},
		methodDescriptor_Services_EditService
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.Params,
 *   !proto.services.Response>}
 */
const methodDescriptor_Services_DeleteService = new grpc.web.MethodDescriptor(
	"/services.Services/DeleteService",
	grpc.web.MethodType.UNARY,
	proto.services.Params,
	proto.services.Response,
	/** @param {!proto.services.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.Params,
 *   !proto.services.Response>}
 */
const methodInfo_Services_DeleteService = new grpc.web.AbstractClientBase.MethodInfo(
	proto.services.Response,
	/** @param {!proto.services.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.services.Response.deserializeBinary
);

/**
 * @param {!proto.services.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ServicesClient.prototype.deleteService = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/services.Services/DeleteService",
		request,
		metadata || {},
		methodDescriptor_Services_DeleteService,
		callback
	);
};

/**
 * @param {!proto.services.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.Response>}
 *     A native promise that resolves to the response
 */
proto.services.ServicesPromiseClient.prototype.deleteService = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/services.Services/DeleteService",
		request,
		metadata || {},
		methodDescriptor_Services_DeleteService
	);
};

module.exports = proto.services;
