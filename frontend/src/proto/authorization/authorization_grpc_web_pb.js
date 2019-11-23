/**
 * @fileoverview gRPC-Web generated client stub for authorization
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require("grpc-web");

var products_products_pb = require("../products/products_pb.js");
const proto = {};
proto.authorization = require("./authorization_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.authorization.AuthorizationServiceClient = function(
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
proto.authorization.AuthorizationServicePromiseClient = function(
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
 *   !proto.authorization.User,
 *   !proto.authorization.Response>}
 */
const methodDescriptor_AuthorizationService_Register = new grpc.web.MethodDescriptor(
  "/authorization.AuthorizationService/Register",
  grpc.web.MethodType.UNARY,
  proto.authorization.User,
  proto.authorization.Response,
  /** @param {!proto.authorization.User} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.authorization.User,
 *   !proto.authorization.Response>}
 */
const methodInfo_AuthorizationService_Register = new grpc.web.AbstractClientBase.MethodInfo(
  proto.authorization.Response,
  /** @param {!proto.authorization.User} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @param {!proto.authorization.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.authorization.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.authorization.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.authorization.AuthorizationServiceClient.prototype.register = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/authorization.AuthorizationService/Register",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_Register,
    callback
  );
};

/**
 * @param {!proto.authorization.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.authorization.Response>}
 *     A native promise that resolves to the response
 */
proto.authorization.AuthorizationServicePromiseClient.prototype.register = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/authorization.AuthorizationService/Register",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_Register
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.authorization.LoginParams,
 *   !proto.authorization.Response>}
 */
const methodDescriptor_AuthorizationService_Login = new grpc.web.MethodDescriptor(
  "/authorization.AuthorizationService/Login",
  grpc.web.MethodType.UNARY,
  proto.authorization.LoginParams,
  proto.authorization.Response,
  /** @param {!proto.authorization.LoginParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.authorization.LoginParams,
 *   !proto.authorization.Response>}
 */
const methodInfo_AuthorizationService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.authorization.Response,
  /** @param {!proto.authorization.LoginParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @param {!proto.authorization.LoginParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.authorization.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.authorization.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.authorization.AuthorizationServiceClient.prototype.login = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/authorization.AuthorizationService/Login",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_Login,
    callback
  );
};

/**
 * @param {!proto.authorization.LoginParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.authorization.Response>}
 *     A native promise that resolves to the response
 */
proto.authorization.AuthorizationServicePromiseClient.prototype.login = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/authorization.AuthorizationService/Login",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_Login
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.authorization.PasswordChange,
 *   !proto.authorization.Response>}
 */
const methodDescriptor_AuthorizationService_ChangePassword = new grpc.web.MethodDescriptor(
  "/authorization.AuthorizationService/ChangePassword",
  grpc.web.MethodType.UNARY,
  proto.authorization.PasswordChange,
  proto.authorization.Response,
  /** @param {!proto.authorization.PasswordChange} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.authorization.PasswordChange,
 *   !proto.authorization.Response>}
 */
const methodInfo_AuthorizationService_ChangePassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.authorization.Response,
  /** @param {!proto.authorization.PasswordChange} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @param {!proto.authorization.PasswordChange} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.authorization.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.authorization.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.authorization.AuthorizationServiceClient.prototype.changePassword = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/authorization.AuthorizationService/ChangePassword",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_ChangePassword,
    callback
  );
};

/**
 * @param {!proto.authorization.PasswordChange} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.authorization.Response>}
 *     A native promise that resolves to the response
 */
proto.authorization.AuthorizationServicePromiseClient.prototype.changePassword = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/authorization.AuthorizationService/ChangePassword",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_ChangePassword
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.authorization.Params,
 *   !proto.authorization.User>}
 */
const methodDescriptor_AuthorizationService_GetUser = new grpc.web.MethodDescriptor(
  "/authorization.AuthorizationService/GetUser",
  grpc.web.MethodType.UNARY,
  proto.authorization.Params,
  proto.authorization.User,
  /** @param {!proto.authorization.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.User.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.authorization.Params,
 *   !proto.authorization.User>}
 */
const methodInfo_AuthorizationService_GetUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.authorization.User,
  /** @param {!proto.authorization.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.User.deserializeBinary
);

/**
 * @param {!proto.authorization.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.authorization.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.authorization.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.authorization.AuthorizationServiceClient.prototype.getUser = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/authorization.AuthorizationService/GetUser",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_GetUser,
    callback
  );
};

/**
 * @param {!proto.authorization.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.authorization.User>}
 *     A native promise that resolves to the response
 */
proto.authorization.AuthorizationServicePromiseClient.prototype.getUser = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/authorization.AuthorizationService/GetUser",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_GetUser
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.authorization.Params,
 *   !proto.authorization.Response>}
 */
const methodDescriptor_AuthorizationService_GetUsers = new grpc.web.MethodDescriptor(
  "/authorization.AuthorizationService/GetUsers",
  grpc.web.MethodType.UNARY,
  proto.authorization.Params,
  proto.authorization.Response,
  /** @param {!proto.authorization.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.authorization.Params,
 *   !proto.authorization.Response>}
 */
const methodInfo_AuthorizationService_GetUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.authorization.Response,
  /** @param {!proto.authorization.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @param {!proto.authorization.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.authorization.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.authorization.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.authorization.AuthorizationServiceClient.prototype.getUsers = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/authorization.AuthorizationService/GetUsers",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_GetUsers,
    callback
  );
};

/**
 * @param {!proto.authorization.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.authorization.Response>}
 *     A native promise that resolves to the response
 */
proto.authorization.AuthorizationServicePromiseClient.prototype.getUsers = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/authorization.AuthorizationService/GetUsers",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_GetUsers
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.authorization.Params,
 *   !proto.authorization.Stats>}
 */
const methodDescriptor_AuthorizationService_GetStats = new grpc.web.MethodDescriptor(
  "/authorization.AuthorizationService/GetStats",
  grpc.web.MethodType.UNARY,
  proto.authorization.Params,
  proto.authorization.Stats,
  /** @param {!proto.authorization.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Stats.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.authorization.Params,
 *   !proto.authorization.Stats>}
 */
const methodInfo_AuthorizationService_GetStats = new grpc.web.AbstractClientBase.MethodInfo(
  proto.authorization.Stats,
  /** @param {!proto.authorization.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Stats.deserializeBinary
);

/**
 * @param {!proto.authorization.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.authorization.Stats)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.authorization.Stats>|undefined}
 *     The XHR Node Readable Stream
 */
proto.authorization.AuthorizationServiceClient.prototype.getStats = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/authorization.AuthorizationService/GetStats",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_GetStats,
    callback
  );
};

/**
 * @param {!proto.authorization.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.authorization.Stats>}
 *     A native promise that resolves to the response
 */
proto.authorization.AuthorizationServicePromiseClient.prototype.getStats = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/authorization.AuthorizationService/GetStats",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_GetStats
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.authorization.PermissionParams,
 *   !proto.authorization.Response>}
 */
const methodDescriptor_AuthorizationService_ChangePermissions = new grpc.web.MethodDescriptor(
  "/authorization.AuthorizationService/ChangePermissions",
  grpc.web.MethodType.UNARY,
  proto.authorization.PermissionParams,
  proto.authorization.Response,
  /** @param {!proto.authorization.PermissionParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.authorization.PermissionParams,
 *   !proto.authorization.Response>}
 */
const methodInfo_AuthorizationService_ChangePermissions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.authorization.Response,
  /** @param {!proto.authorization.PermissionParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.authorization.Response.deserializeBinary
);

/**
 * @param {!proto.authorization.PermissionParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.authorization.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.authorization.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.authorization.AuthorizationServiceClient.prototype.changePermissions = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/authorization.AuthorizationService/ChangePermissions",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_ChangePermissions,
    callback
  );
};

/**
 * @param {!proto.authorization.PermissionParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.authorization.Response>}
 *     A native promise that resolves to the response
 */
proto.authorization.AuthorizationServicePromiseClient.prototype.changePermissions = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/authorization.AuthorizationService/ChangePermissions",
    request,
    metadata || {},
    methodDescriptor_AuthorizationService_ChangePermissions
  );
};

module.exports = proto.authorization;
