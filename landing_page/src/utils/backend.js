import { GetClients } from "../clients";

import { Image } from "../proto/products/products_pb";

import { Params as LandingParams } from "../proto/landing/landing_pb";

const client = GetClients();

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
