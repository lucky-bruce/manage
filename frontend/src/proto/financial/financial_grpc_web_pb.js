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

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Expense,
 *   !proto.financial.Expense>}
 */
const methodDescriptor_FinancialService_NewExpense = new grpc.web.MethodDescriptor(
  "/financial.FinancialService/NewExpense",
  grpc.web.MethodType.UNARY,
  proto.financial.Expense,
  proto.financial.Expense,
  /** @param {!proto.financial.Expense} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.Expense.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Expense,
 *   !proto.financial.Expense>}
 */
const methodInfo_FinancialService_NewExpense = new grpc.web.AbstractClientBase.MethodInfo(
  proto.financial.Expense,
  /** @param {!proto.financial.Expense} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.Expense.deserializeBinary
);

/**
 * @param {!proto.financial.Expense} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.Expense)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.Expense>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.newExpense = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/financial.FinancialService/NewExpense",
    request,
    metadata || {},
    methodDescriptor_FinancialService_NewExpense,
    callback
  );
};

/**
 * @param {!proto.financial.Expense} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.Expense>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.newExpense = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/financial.FinancialService/NewExpense",
    request,
    metadata || {},
    methodDescriptor_FinancialService_NewExpense
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Params,
 *   !proto.financial.Expenses>}
 */
const methodDescriptor_FinancialService_GetExpenses = new grpc.web.MethodDescriptor(
  "/financial.FinancialService/GetExpenses",
  grpc.web.MethodType.UNARY,
  proto.financial.Params,
  proto.financial.Expenses,
  /** @param {!proto.financial.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.Expenses.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Params,
 *   !proto.financial.Expenses>}
 */
const methodInfo_FinancialService_GetExpenses = new grpc.web.AbstractClientBase.MethodInfo(
  proto.financial.Expenses,
  /** @param {!proto.financial.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.Expenses.deserializeBinary
);

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.Expenses)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.Expenses>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.getExpenses = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/financial.FinancialService/GetExpenses",
    request,
    metadata || {},
    methodDescriptor_FinancialService_GetExpenses,
    callback
  );
};

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.Expenses>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.getExpenses = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/financial.FinancialService/GetExpenses",
    request,
    metadata || {},
    methodDescriptor_FinancialService_GetExpenses
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Params,
 *   !proto.financial.Expense>}
 */
const methodDescriptor_FinancialService_GetExpense = new grpc.web.MethodDescriptor(
  "/financial.FinancialService/GetExpense",
  grpc.web.MethodType.UNARY,
  proto.financial.Params,
  proto.financial.Expense,
  /** @param {!proto.financial.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.Expense.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Params,
 *   !proto.financial.Expense>}
 */
const methodInfo_FinancialService_GetExpense = new grpc.web.AbstractClientBase.MethodInfo(
  proto.financial.Expense,
  /** @param {!proto.financial.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.Expense.deserializeBinary
);

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.Expense)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.Expense>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.getExpense = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/financial.FinancialService/GetExpense",
    request,
    metadata || {},
    methodDescriptor_FinancialService_GetExpense,
    callback
  );
};

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.Expense>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.getExpense = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/financial.FinancialService/GetExpense",
    request,
    metadata || {},
    methodDescriptor_FinancialService_GetExpense
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Params,
 *   !proto.financial.EmptyResponse>}
 */
const methodDescriptor_FinancialService_DeleteExpense = new grpc.web.MethodDescriptor(
  "/financial.FinancialService/DeleteExpense",
  grpc.web.MethodType.UNARY,
  proto.financial.Params,
  proto.financial.EmptyResponse,
  /** @param {!proto.financial.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.EmptyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Params,
 *   !proto.financial.EmptyResponse>}
 */
const methodInfo_FinancialService_DeleteExpense = new grpc.web.AbstractClientBase.MethodInfo(
  proto.financial.EmptyResponse,
  /** @param {!proto.financial.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.EmptyResponse.deserializeBinary
);

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.EmptyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.EmptyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.deleteExpense = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/financial.FinancialService/DeleteExpense",
    request,
    metadata || {},
    methodDescriptor_FinancialService_DeleteExpense,
    callback
  );
};

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.EmptyResponse>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.deleteExpense = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/financial.FinancialService/DeleteExpense",
    request,
    metadata || {},
    methodDescriptor_FinancialService_DeleteExpense
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Params,
 *   !proto.financial.EmptyResponse>}
 */
const methodDescriptor_FinancialService_ToggleReiteration = new grpc.web.MethodDescriptor(
  "/financial.FinancialService/ToggleReiteration",
  grpc.web.MethodType.UNARY,
  proto.financial.Params,
  proto.financial.EmptyResponse,
  /** @param {!proto.financial.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.EmptyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Params,
 *   !proto.financial.EmptyResponse>}
 */
const methodInfo_FinancialService_ToggleReiteration = new grpc.web.AbstractClientBase.MethodInfo(
  proto.financial.EmptyResponse,
  /** @param {!proto.financial.Params} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.EmptyResponse.deserializeBinary
);

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.EmptyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.EmptyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.toggleReiteration = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/financial.FinancialService/ToggleReiteration",
    request,
    metadata || {},
    methodDescriptor_FinancialService_ToggleReiteration,
    callback
  );
};

/**
 * @param {!proto.financial.Params} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.EmptyResponse>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.toggleReiteration = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/financial.FinancialService/ToggleReiteration",
    request,
    metadata || {},
    methodDescriptor_FinancialService_ToggleReiteration
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.Salary,
 *   !proto.financial.Salary>}
 */
const methodDescriptor_FinancialService_NewSalary = new grpc.web.MethodDescriptor(
  "/financial.FinancialService/NewSalary",
  grpc.web.MethodType.UNARY,
  proto.financial.Salary,
  proto.financial.Salary,
  /** @param {!proto.financial.Salary} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.Salary.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.Salary,
 *   !proto.financial.Salary>}
 */
const methodInfo_FinancialService_NewSalary = new grpc.web.AbstractClientBase.MethodInfo(
  proto.financial.Salary,
  /** @param {!proto.financial.Salary} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.Salary.deserializeBinary
);

/**
 * @param {!proto.financial.Salary} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.Salary)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.Salary>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.newSalary = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/financial.FinancialService/NewSalary",
    request,
    metadata || {},
    methodDescriptor_FinancialService_NewSalary,
    callback
  );
};

/**
 * @param {!proto.financial.Salary} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.Salary>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.newSalary = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/financial.FinancialService/NewSalary",
    request,
    metadata || {},
    methodDescriptor_FinancialService_NewSalary
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.financial.PaymentParams,
 *   !proto.financial.EmptyResponse>}
 */
const methodDescriptor_FinancialService_Pay = new grpc.web.MethodDescriptor(
  "/financial.FinancialService/Pay",
  grpc.web.MethodType.UNARY,
  proto.financial.PaymentParams,
  proto.financial.EmptyResponse,
  /** @param {!proto.financial.PaymentParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.EmptyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.financial.PaymentParams,
 *   !proto.financial.EmptyResponse>}
 */
const methodInfo_FinancialService_Pay = new grpc.web.AbstractClientBase.MethodInfo(
  proto.financial.EmptyResponse,
  /** @param {!proto.financial.PaymentParams} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.financial.EmptyResponse.deserializeBinary
);

/**
 * @param {!proto.financial.PaymentParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.financial.EmptyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.financial.EmptyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.financial.FinancialServiceClient.prototype.pay = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + "/financial.FinancialService/Pay",
    request,
    metadata || {},
    methodDescriptor_FinancialService_Pay,
    callback
  );
};

/**
 * @param {!proto.financial.PaymentParams} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.financial.EmptyResponse>}
 *     A native promise that resolves to the response
 */
proto.financial.FinancialServicePromiseClient.prototype.pay = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + "/financial.FinancialService/Pay",
    request,
    metadata || {},
    methodDescriptor_FinancialService_Pay
  );
};

module.exports = proto.financial;
