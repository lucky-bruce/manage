/**
 * @fileoverview gRPC-Web generated client stub for products
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require("grpc-web");

const proto = {};
proto.products = require("./products_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.products.ProductServiceClient = function(hostname, credentials, options) {
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
proto.products.ProductServicePromiseClient = function(
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
 *   !proto.products.Product,
 *   !proto.products.Product>}
 */
const methodDescriptor_ProductService_NewProduct = new grpc.web.MethodDescriptor(
  "/products.ProductService/NewProduct",
  grpc.web.MethodType.UNARY,
  proto.products.Product,
  proto.products.Product,
  /** @param {!proto.products.Product} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.Product.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.Product,
 *   !proto.products.Product>}
 */
const methodInfo_ProductService_NewProduct = new grpc.web.AbstractClientBase.MethodInfo(
  proto.products.Product,
  /** @param {!proto.products.Product} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.Product.deserializeBinary
);

/**
 * @param {!proto.products.Product} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.products.Product)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.products.Product>|undefined}
 *     The XHR Node Readable Stream
 */
proto.products.ProductServiceClient.prototype.newProduct = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/products.ProductService/NewProduct",
    request,
    metadata || {},
    methodDescriptor_ProductService_NewProduct,
    callback
  );
};

/**
 * @param {!proto.products.Product} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.products.Product>}
 *     A native promise that resolves to the response
 */
proto.products.ProductServicePromiseClient.prototype.newProduct = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/products.ProductService/NewProduct",
    request,
    metadata || {},
    methodDescriptor_ProductService_NewProduct
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.ProductParams,
 *   !proto.products.ProductResponse>}
 */
const methodDescriptor_ProductService_GetProducts = new grpc.web.MethodDescriptor(
  "/products.ProductService/GetProducts",
  grpc.web.MethodType.UNARY,
  proto.products.ProductParams,
  proto.products.ProductResponse,
  /** @param {!proto.products.ProductParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.ProductResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.ProductParams,
 *   !proto.products.ProductResponse>}
 */
const methodInfo_ProductService_GetProducts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.products.ProductResponse,
  /** @param {!proto.products.ProductParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.ProductResponse.deserializeBinary
);

/**
 * @param {!proto.products.ProductParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.products.ProductResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.products.ProductResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.products.ProductServiceClient.prototype.getProducts = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/products.ProductService/GetProducts",
    request,
    metadata || {},
    methodDescriptor_ProductService_GetProducts,
    callback
  );
};

/**
 * @param {!proto.products.ProductParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.products.ProductResponse>}
 *     A native promise that resolves to the response
 */
proto.products.ProductServicePromiseClient.prototype.getProducts = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/products.ProductService/GetProducts",
    request,
    metadata || {},
    methodDescriptor_ProductService_GetProducts
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.ProductParams,
 *   !proto.products.Product>}
 */
const methodDescriptor_ProductService_GetProductByID = new grpc.web.MethodDescriptor(
  "/products.ProductService/GetProductByID",
  grpc.web.MethodType.UNARY,
  proto.products.ProductParams,
  proto.products.Product,
  /** @param {!proto.products.ProductParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.Product.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.ProductParams,
 *   !proto.products.Product>}
 */
const methodInfo_ProductService_GetProductByID = new grpc.web.AbstractClientBase.MethodInfo(
  proto.products.Product,
  /** @param {!proto.products.ProductParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.Product.deserializeBinary
);

/**
 * @param {!proto.products.ProductParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.products.Product)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.products.Product>|undefined}
 *     The XHR Node Readable Stream
 */
proto.products.ProductServiceClient.prototype.getProductByID = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/products.ProductService/GetProductByID",
    request,
    metadata || {},
    methodDescriptor_ProductService_GetProductByID,
    callback
  );
};

/**
 * @param {!proto.products.ProductParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.products.Product>}
 *     A native promise that resolves to the response
 */
proto.products.ProductServicePromiseClient.prototype.getProductByID = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/products.ProductService/GetProductByID",
    request,
    metadata || {},
    methodDescriptor_ProductService_GetProductByID
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.Product,
 *   !proto.products.EmptyResponse>}
 */
const methodDescriptor_ProductService_EditProduct = new grpc.web.MethodDescriptor(
  "/products.ProductService/EditProduct",
  grpc.web.MethodType.UNARY,
  proto.products.Product,
  proto.products.EmptyResponse,
  /** @param {!proto.products.Product} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.EmptyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.Product,
 *   !proto.products.EmptyResponse>}
 */
const methodInfo_ProductService_EditProduct = new grpc.web.AbstractClientBase.MethodInfo(
  proto.products.EmptyResponse,
  /** @param {!proto.products.Product} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.EmptyResponse.deserializeBinary
);

/**
 * @param {!proto.products.Product} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.products.EmptyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.products.EmptyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.products.ProductServiceClient.prototype.editProduct = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/products.ProductService/EditProduct",
    request,
    metadata || {},
    methodDescriptor_ProductService_EditProduct,
    callback
  );
};

/**
 * @param {!proto.products.Product} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.products.EmptyResponse>}
 *     A native promise that resolves to the response
 */
proto.products.ProductServicePromiseClient.prototype.editProduct = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/products.ProductService/EditProduct",
    request,
    metadata || {},
    methodDescriptor_ProductService_EditProduct
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.ProductParams,
 *   !proto.products.EmptyResponse>}
 */
const methodDescriptor_ProductService_DeleteProductByID = new grpc.web.MethodDescriptor(
  "/products.ProductService/DeleteProductByID",
  grpc.web.MethodType.UNARY,
  proto.products.ProductParams,
  proto.products.EmptyResponse,
  /** @param {!proto.products.ProductParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.EmptyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.ProductParams,
 *   !proto.products.EmptyResponse>}
 */
const methodInfo_ProductService_DeleteProductByID = new grpc.web.AbstractClientBase.MethodInfo(
  proto.products.EmptyResponse,
  /** @param {!proto.products.ProductParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.EmptyResponse.deserializeBinary
);

/**
 * @param {!proto.products.ProductParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.products.EmptyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.products.EmptyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.products.ProductServiceClient.prototype.deleteProductByID = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/products.ProductService/DeleteProductByID",
    request,
    metadata || {},
    methodDescriptor_ProductService_DeleteProductByID,
    callback
  );
};

/**
 * @param {!proto.products.ProductParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.products.EmptyResponse>}
 *     A native promise that resolves to the response
 */
proto.products.ProductServicePromiseClient.prototype.deleteProductByID = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/products.ProductService/DeleteProductByID",
    request,
    metadata || {},
    methodDescriptor_ProductService_DeleteProductByID
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.Image,
 *   !proto.products.ImageResponse>}
 */
const methodDescriptor_ProductService_UploadImage = new grpc.web.MethodDescriptor(
  "/products.ProductService/UploadImage",
  grpc.web.MethodType.UNARY,
  proto.products.Image,
  proto.products.ImageResponse,
  /** @param {!proto.products.Image} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.ImageResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.Image,
 *   !proto.products.ImageResponse>}
 */
const methodInfo_ProductService_UploadImage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.products.ImageResponse,
  /** @param {!proto.products.Image} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.ImageResponse.deserializeBinary
);

/**
 * @param {!proto.products.Image} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.products.ImageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.products.ImageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.products.ProductServiceClient.prototype.uploadImage = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/products.ProductService/UploadImage",
    request,
    metadata || {},
    methodDescriptor_ProductService_UploadImage,
    callback
  );
};

/**
 * @param {!proto.products.Image} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.products.ImageResponse>}
 *     A native promise that resolves to the response
 */
proto.products.ProductServicePromiseClient.prototype.uploadImage = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/products.ProductService/UploadImage",
    request,
    metadata || {},
    methodDescriptor_ProductService_UploadImage
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.Comment,
 *   !proto.products.EmptyResponse>}
 */
const methodDescriptor_ProductService_NewComment = new grpc.web.MethodDescriptor(
  "/products.ProductService/NewComment",
  grpc.web.MethodType.UNARY,
  proto.products.Comment,
  proto.products.EmptyResponse,
  /** @param {!proto.products.Comment} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.EmptyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.Comment,
 *   !proto.products.EmptyResponse>}
 */
const methodInfo_ProductService_NewComment = new grpc.web.AbstractClientBase.MethodInfo(
  proto.products.EmptyResponse,
  /** @param {!proto.products.Comment} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.EmptyResponse.deserializeBinary
);

/**
 * @param {!proto.products.Comment} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.products.EmptyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.products.EmptyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.products.ProductServiceClient.prototype.newComment = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/products.ProductService/NewComment",
    request,
    metadata || {},
    methodDescriptor_ProductService_NewComment,
    callback
  );
};

/**
 * @param {!proto.products.Comment} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.products.EmptyResponse>}
 *     A native promise that resolves to the response
 */
proto.products.ProductServicePromiseClient.prototype.newComment = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/products.ProductService/NewComment",
    request,
    metadata || {},
    methodDescriptor_ProductService_NewComment
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.products.ProductParams,
 *   !proto.products.Comments>}
 */
const methodDescriptor_ProductService_GetComments = new grpc.web.MethodDescriptor(
  "/products.ProductService/GetComments",
  grpc.web.MethodType.UNARY,
  proto.products.ProductParams,
  proto.products.Comments,
  /** @param {!proto.products.ProductParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.Comments.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.products.ProductParams,
 *   !proto.products.Comments>}
 */
const methodInfo_ProductService_GetComments = new grpc.web.AbstractClientBase.MethodInfo(
  proto.products.Comments,
  /** @param {!proto.products.ProductParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.products.Comments.deserializeBinary
);

/**
 * @param {!proto.products.ProductParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.products.Comments)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.products.Comments>|undefined}
 *     The XHR Node Readable Stream
 */
proto.products.ProductServiceClient.prototype.getComments = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/products.ProductService/GetComments",
    request,
    metadata || {},
    methodDescriptor_ProductService_GetComments,
    callback
  );
};

/**
 * @param {!proto.products.ProductParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.products.Comments>}
 *     A native promise that resolves to the response
 */
proto.products.ProductServicePromiseClient.prototype.getComments = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/products.ProductService/GetComments",
    request,
    metadata || {},
    methodDescriptor_ProductService_GetComments
  );
};

module.exports = proto.products;
