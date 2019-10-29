/**
 * @fileoverview gRPC-Web generated client stub for db
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require("grpc-web");

const proto = {};
proto.db = require("./db_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.db.DbServiceClient = function(hostname, credentials, options) {
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
proto.db.DbServicePromiseClient = function(hostname, credentials, options) {
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
 *   !proto.db.Params,
 *   !proto.db.Response>}
 */
const methodDescriptor_DbService_GetUnique = new grpc.web.MethodDescriptor(
	"/db.DbService/GetUnique",
	grpc.web.MethodType.UNARY,
	proto.db.Params,
	proto.db.Response,
	/** @param {!proto.db.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.db.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.db.Params,
 *   !proto.db.Response>}
 */
const methodInfo_DbService_GetUnique = new grpc.web.AbstractClientBase.MethodInfo(
	proto.db.Response,
	/** @param {!proto.db.Params} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.db.Response.deserializeBinary
);

/**
 * @param {!proto.db.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.db.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.db.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.db.DbServiceClient.prototype.getUnique = function(
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/db.DbService/GetUnique",
		request,
		metadata || {},
		methodDescriptor_DbService_GetUnique,
		callback
	);
};

/**
 * @param {!proto.db.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.db.Response>}
 *     A native promise that resolves to the response
 */
proto.db.DbServicePromiseClient.prototype.getUnique = function(
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/db.DbService/GetUnique",
		request,
		metadata || {},
		methodDescriptor_DbService_GetUnique
	);
};

module.exports = proto.db;
