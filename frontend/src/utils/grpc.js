import { Product } from "../proto/products/products_pb";
import { Service } from "../proto/services/services_pb";
import {
  Quote,
  QuoteProduct,
  Suppliers,
  ServiceInQuote
} from "../proto/quotes/quotes_pb";
import { GetProfile } from "./utils";
import {
  Team,
  Portfolio,
  Mix,
  Basic,
  Sector,
  News
} from "../proto/landing/landing_pb";

const user = GetProfile();

export const productInput = {
  name: "",
  category: "",
  subcategory: "",
  sector: "",
  buyingprice: 0,
  desiredprofit: 0,
  sizew: 0,
  sizeh: 0,
  sizel: 0,
  sized: 0,
  description: "",
  qtyinstock: 1,
  minqtyinstock: 1,
  images: [],
  barcode: "",
  soldby: "unit",
  measurement: false,
  measurementunit: "cm",
  measurementvalue: 0,
  discount: 0,
  brand: "",
  brandmodel: "",
  portion: "volume",
  portionunit: "ml",
  portionvalue: "0",
  chargetype: "Per day",
  chargevalue: 0,
  userid: "",
  addedtime: 0
};

export const quoteInput = {
  id: "",
  name: user ? user.firstName + " " + user.lastName : "",
  email: user ? user.email : "",
  phonenumber: user ? user.phonenumber : "+",
  city: user ? user.city : "",
  address: user ? user.address : "",
  zip: "",
  size: "",
  sector: "",
  supplieridsList: [],
  product: {},
  productsList: [],
  sumprice: 0,
  userid: user ? user.id : "",
  qrcodeurl: "qrcode",
  status: 0,
  timestamp: 0,
  service: {},
  servicesList: [],
  delivery: 0,
  state: "Ukraine",
  suppliersLoc: [],
  subtotal: 0,
  total: 0
};

export const teamInput = {
  name: "",
  rating: "",
  image: "",
  description: "",
  timestamp: 0
};

export const portfolioInput = {
  image: "",
  details: "",
  sector: "",
  timestamp: ""
};

export const mixInput = {
  mixesList: [
    { title: "Who we are", description: "" },
    { title: "Our mision", description: "" },
    { title: "Our values", description: "" }
  ]
};

export const basicInput = {
  sitename: "",
  primaryemail: "",
  secondaryemail: "",
  primaryname: "",
  workinghours: "",
  primaryaddress: "",
  secondaryaddress: ""
};

export const sectorsInput = {
  sectorsList: []
};

export const newsInput = {
  title: "",
  description: "",
  sector: "",
  image: ""
};

export function ToGRPCObject(obj) {
  var values = Object.values(obj);
  var grpc = {};
  for (var i in values) {
    grpc[parseInt(i)] = values[i];
  }

  return grpc;
}

export const GetGRPCProduct = obj => {
  var product = new Product();

  product.setId(obj.id);
  product.setName(obj.name);
  product.setQtyinstock(obj.qtyinstock);
  product.setMinqtyinstock(obj.minqtyinstock);
  product.setCategory(obj.category);
  product.setDescription(obj.description);
  product.setSubcategory(obj.subcategory);
  product.setBuyingprice(obj.buyingprice);
  product.setDesiredprofit(obj.desiredprofit);
  product.setAddedtime(obj.addedtime);
  product.setSellingprice(
    obj.buyingprice + (obj.buyingprice * obj.desiredprofit) / 100
  );

  product.setSector(obj.sector);
  product.setSizew(obj.sizew);
  product.setSizel(obj.sizel);
  product.setSizeh(obj.sizeh);
  product.setSized(obj.sized);
  product.setUserid(obj.userid);
  product.setBarcode(obj.barcode);
  product.setImagesList(obj.images);
  product.setDiscount(obj.discount);
  product.setMeasurementunit(obj.measurementunit);
  product.setPortionunit(obj.portionunit);
  product.setPortionvalue(obj.portionvalue);
  product.setBrand(obj.brand);
  product.setBrandmodel(obj.brandmodel);

  return product;
};

export const GetGRPCQuote = obj => {
  var quote = new Quote();

  quote.setProductsList(undefined);

  for (let product of obj.productsList) {
    var qp = new QuoteProduct();
    var p = GetGRPCProduct(product.product);
    console.log(p);

    qp.setProduct(p);
    qp.setQty(product.qty);
    qp.setSizel(product.sizel);
    qp.setSizew(product.sizew);
    qp.setSizeh(product.sizeh);
    qp.setSizer(product.sizer);

    quote.addProducts(qp);
  }
  quote.setId(obj.id);
  quote.setName(obj.name);
  quote.setEmail(obj.email);
  quote.setPhonenumber(obj.phonenumber);
  quote.setCity(obj.city);
  quote.setAddress(obj.address);
  quote.setZip(obj.zip);
  quote.setSize(obj.size);
  quote.setUserid(obj.userid);
  quote.setSumprice(obj.totalprice);
  quote.setTimestamp(obj.timestamp);
  quote.setStatus(obj.status);
  quote.setDelivery(obj.delivery);
  quote.setQrcodeurl(obj.qrcodeurl);

  quote.setSupplieridsList(undefined);
  for (var rec of obj.supplieridsList) {
    var sup = new Suppliers();
    sup.setId(rec.id);

    quote.addSupplierids(sup);
  }
  quote.setServicesList(undefined);
  for (let service of obj.servicesList) {
    let sq = new ServiceInQuote();
    let s = GetGRPCService(service.service);

    sq.setService(s);
    sq.setQty(service.qty);

    quote.addServices(sq);
  }

  return quote;
};

export const GetGRPCTeam = obj => {
  let team = new Team();

  team.setName(obj.name);
  team.setRating(obj.rating);
  team.setImage(obj.image);
  team.setDescription(obj.description);
  team.setTimestamp(obj.timestamp);

  return team;
};

export function GetGRPCService(obj) {
  let s = new Service();

  s.setId(obj.id);
  s.setName(obj.name);
  s.setUserid(obj.userid);
  s.setChargetype(obj.chargetype);
  s.setChargevalue(obj.chargevalue);
  s.setSector(obj.sector);

  return s;
}

export const GetGRPCPortfolio = obj => {
  let p = new Portfolio();

  p.setDetails(obj.details);
  p.setSector(obj.sector);
  p.setImage(obj.image);
  p.setTimestamp(obj.timestamp);

  return p;
};

export const GetGRPCMix = obj => {
  let m = new Mix();

  m.setTitle(obj.title);
  m.setDescription(obj.description);
  m.setImage(obj.image);

  return m;
};

export const getGRPCBasic = obj => {
  let b = new Basic();

  b.setSitename(obj.sitename);
  b.setPrimaryemail(obj.primaryemail);
  b.setSecondaryemail(obj.secondaryemail);
  b.setPrimaryphone(obj.primaryphone);
  b.setWorkinghours(obj.workinghours);
  b.setPrimaryaddress(obj.primaryaddress);
  b.setSecondaryaddress(obj.secondaryaddress);

  return b;
};

export const getGRPCSector = obj => {
  let s = new Sector();

  s.setTitle(obj.title);
  s.setDescription(obj.description);
  s.setImage(obj.image);

  return s;
};

export const GetGRPCNews = obj => {
  let n = new News();

  n.setTitle(obj.title);
  n.setDescription(obj.description);
  n.setSector(obj.sector);
  n.setImage(obj.image);

  return n;
};

export const getBasicFromGRPC = (handleChange, obj) => {
  handleChange("sitename", obj.sitename);
  handleChange("primaryemail", obj.primaryemail);
  handleChange("secondaryemail", obj.secondaryemail);
  handleChange("primaryphone", obj.primaryphone);
  handleChange("workinghours", obj.workinghours);
  handleChange("primaryaddress", obj.primaryaddress);
  handleChange("secondaryaddress", obj.secondaryaddress);
};

export const GetMixFromGRPC = (handleChange, obj) => {
  handleChange("title", obj.title);
  handleChange("description", obj.description);
  handleChange("image", obj.image);
};

export function GetProductObjFromGRPCProduct(handleChange, obj) {
  handleChange("id", obj.id);
  handleChange("name", obj.name);
  handleChange("qtyinstock", obj.qtyinstock);
  handleChange("minqtyinstock", obj.minqtyinstock);
  handleChange("category", obj.category);
  handleChange("description", obj.description);
  handleChange("subcategory", obj.subcategory);
  handleChange("buyingprice", obj.buyingprice);
  handleChange("desiredprofit", obj.desiredprofit);
  handleChange(
    "sellingprice",
    obj.buyingprice + (obj.buyingprice * obj.desiredprofit) / 100
  );

  handleChange("sector", obj.sector);
  handleChange("sizew", obj.sizew);
  handleChange("sizel", obj.sizel);
  handleChange("sizeh", obj.sizeh);
  handleChange("sized", obj.sized);
  handleChange("userid", obj.userid);
  handleChange("barcode", obj.barcode);
  handleChange("images", obj.images);
  handleChange("discount", obj.discount);
  handleChange("measurementunit", obj.measurementunit);
  handleChange("portionunit", obj.portionunit);
  handleChange("portionvalue", obj.portionvalue);
  handleChange("brand", obj.brand);
  handleChange("brandmodel", obj.brandmodel);
  handleChange("addedtime", obj.addedtime);
}

export const GetQuoteObjFromGRPC = (handleChange, obj) => {
  handleChange("id", obj.id);
  handleChange("name", obj.name);
  handleChange("email", obj.email);
  handleChange("phonenumber", obj.phonenumber);
  handleChange("city", obj.city);
  handleChange("address", obj.address);
  handleChange("zip", obj.zip);
  handleChange("size", obj.size);
  handleChange("userid", obj.userid);
  handleChange("sumprice", obj.sumprice);
  handleChange("timestamp", obj.timestamp);
  handleChange("status", obj.status);
  handleChange("qrcodeurl", obj.qrcodeurl);
  handleChange("productsList", obj.productsList);
  handleChange("supplieridsList", obj.supplieridsList);
  handleChange("servicesList", obj.servicesList);
  handleChange("delivery", obj.delivery);
};

export const GetTeamFromGRPC = (handleChange, obj) => {
  handleChange("name", obj.name);
  handleChange("rating", obj.rating);
  handleChange("image", obj.image);
  handleChange("description", obj.description);
  handleChange("timestamp", obj.timestamp);
};
