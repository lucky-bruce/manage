/**
 * @fileoverview gRPC-Web generated client stub for chunker
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require("grpc-web");

const proto = {};
proto.chunker = require("./chunker_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.chunker.ChunkerClient = function(hostname, credentials, options) {
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
proto.chunker.ChunkerPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.chunker.Request,
 *   !proto.chunker.Chunk>}
 */
const methodDescriptor_Chunker_Chunker = new grpc.web.MethodDescriptor(
	"/chunker.Chunker/Chunker",
	grpc.web.MethodType.SERVER_STREAMING,
	proto.chunker.Request,
	proto.chunker.Chunk,
	/** @param {!proto.chunker.Request} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.chunker.Chunk.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.chunker.Request,
 *   !proto.chunker.Chunk>}
 */
const methodInfo_Chunker_Chunker = new grpc.web.AbstractClientBase.MethodInfo(
	proto.chunker.Chunk,
	/** @param {!proto.chunker.Request} request */
	function(request) {
		return request.serializeBinary();
	},
	proto.chunker.Chunk.deserializeBinary
);

/**
 * @param {!proto.chunker.Request} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chunker.Chunk>}
 *     The XHR Node Readable Stream
 */
proto.chunker.ChunkerClient.prototype.chunker = function(request, metadata) {
	return this.client_.serverStreaming(
		this.hostname_ + "/chunker.Chunker/Chunker",
		request,
		metadata || {},
		methodDescriptor_Chunker_Chunker
	);
};

/**
 * @param {!proto.chunker.Request} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chunker.Chunk>}
 *     The XHR Node Readable Stream
 */
proto.chunker.ChunkerPromiseClient.prototype.chunker = function(
	request,
	metadata
) {
	return this.client_.serverStreaming(
		this.hostname_ + "/chunker.Chunker/Chunker",
		request,
		metadata || {},
		methodDescriptor_Chunker_Chunker
	);
};

module.exports = proto.chunker;
