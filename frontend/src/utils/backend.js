import { GetClients } from "../clients";
import {
  QuoteParams,
  StatusParams,
  DistanceParams
} from "../proto/quotes/quotes_pb";
import { ProductParams, Query, Image } from "../proto/products/products_pb";
import { Params as DbParams } from "../proto/db/db_pb";
import { Params as ServiceParams } from "../proto/services/services_pb";
import {
  Params as AuthorizationParams,
  PasswordChange,
  PermissionParams,
  Permission
} from "../proto/authorization/authorization_pb";
import { Params as LandingParams } from "../proto/landing/landing_pb";
import {
  Params as FinancialParams,
  PaymentParams
} from "../proto/financial/financial_pb";

const client = GetClients();

export const newQuote = (quote, callback) => {
  client.quotes.newQuote(quote, {}, (err, res) => callback(err, res));
};

export function GetQuote(id, callback) {
  let params = new QuoteParams();
  params.setId(id);

  client.quotes.getQuoteByID(params, {}, (err, res) => {
    callback(err, res);
  });
}

export function changeShippingStatus(id, callback) {
  let params = new StatusParams();
  params.setId(id);

  client.quotes.changeShippingStatus(params, {}, callback);
}

export const getDistance = (from, to, callback) => {
  let params = new DistanceParams();

  params.setFrom(from);
  params.setTo(to);

  client.quotes.getDistance(params, {}, (err, res) => callback(err, res));
};

export const getProducts = (params, callback) => {
  client.products.getProducts(params, {}, callback);
};

export const GetProductByID = (id, callback) => {
  let params = new ProductParams();
  params.setId(id);

  client.products.getProductByID(params, {}, (err, res) => callback(err, res));
};

export const editProduct = (prod, callback) => {
  client.products.editProduct(prod, {}, (err, res) => callback(err, res));
};

export const getServices = (q, callback) => {
  let params = new ServiceParams();

  let query = new Query();
  query.setQuerystring(q);
  params.setQuery(query);

  client.services.getServices(params, {}, (err, res) => callback(err, res));
};

export const getUser = (id, callback) => {
  let params = new AuthorizationParams();

  params.setId(id);

  client.auth.getUser(params, {}, (err, res) => callback(err, res));
};

export const changePassword = (obj, callback) => {
  let params = new PasswordChange();
  params.setId(obj.id);
  params.setOld(obj.old);
  params.setNew(obj.new);

  client.auth.changePassword(params, {}, callback);
};

export const changePermission = (id, permissions, callback) => {
  let pp = new PermissionParams();
  pp.setId(id);

  let p = new Permission();
  p.setQuotes(permissions.quotes);
  p.setStock(permissions.stock);
  p.setFinancial(permissions.financial);

  pp.setPermission(p);

  client.auth.changePermissions(pp, {}, callback);
};

export const getIncomes = (params = new FinancialParams(), callback) => {
  client.finances.getIncome(params, {}, callback);
};

export const getExpenses = (params = new FinancialParams(), callback) => {
  client.finances.getExpenses(params, {}, callback);
};

export const pay = (params = new PaymentParams(), callback) => {
  client.finances.pay(params, {}, callback);
};

export const getUniqueFields = (field, collection, callback) => {
  let params = new DbParams();

  params.setField(field);
  params.setCollection(collection);

  client.db.getUnique(params, {}, (err, res) => callback(err, res));
};

export const newTeam = (team, callback) => {
  client.landing.newTeam(team, {}, (err, res) => callback(err, res));
};

export const getTeams = callback => {
  let params = new LandingParams();
  client.landing.getTeams(params, {}, (err, res) => callback(err, res));
};

export const deleteTeam = (name, callback) => {
  let params = new LandingParams();

  params.setName(name);

  client.landing.deleteTeam(params, {}, callback);
};

export const getPortfolios = (params, callback) => {
  client.landing.getPortfolios(
    params ? params : new LandingParams(),
    {},
    callback
  );
};

export const newPortfolio = (portfolio, callback) => {
  client.landing.newPortfolio(portfolio, {}, callback);
};

export const deletePortfolio = (id, callback) => {
  let params = new LandingParams();

  params.setId(id);

  client.landing.deletePortfolio(params, {}, callback);
};

export const newMix = (mix, callback) => {
  client.landing.newMix(mix, {}, callback);
};

export const getMixes = (params, callback) => {
  client.landing.getMixes(params || new LandingParams(), {}, callback);
};

export const deleteMix = (title, callback) => {
  let params = new LandingParams();

  params.setName(title);

  client.landing.deleteMix(params, {}, callback);
};

export const getBasic = callback => {
  let params = new LandingParams();

  client.landing.getBasic(params, {}, callback);
};

export const newBasic = (basic, callback) => {
  client.landing.newBasic(basic, {}, callback);
};

export const newSector = (sector, callback) => {
  client.landing.newSector(sector, {}, callback);
};

export const getSectors = callback => {
  let params = new LandingParams();

  client.landing.getSectors(params, {}, callback);
};

export const deleteSector = (title, callback) => {
  let params = new LandingParams();

  params.setName(title);

  client.landing.deleteSector(params, {}, callback);
};

export const getNews = callback => {
  client.landing.getNews(new LandingParams(), {}, callback);
};

export const newNews = (news, callback) => {
  client.landing.newNews(news, {}, callback);
};

export const deleteNews = (title, callback) => {
  let params = new LandingParams();

  params.setName(title);

  client.landing.deleteNews(params, {}, callback);
};

export function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = e => {
      resolve(e.target.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export function processFiles(files) {
  return new Promise(async res => {
    let urls = [];
    for (let file of files) {
      let image = new Image();
      let exts = file.name.split(".");

      image.setExt(`.${exts[exts.length - 1]}`);
      await new Promise(res => {
        let content = readFileAsync(file);
        res(content);
      }).then(content => image.setImage(content));

      await new Promise(resolve => {
        client.products.uploadImage(image, {}, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            resolve(res.toObject().url);
          }
        });
      }).then(url => urls.push(url));
    }
    res(urls);
  });
}

export const toDestination = (params, callback) => {
  client.finances.toDestination(params, {}, callback);
};
