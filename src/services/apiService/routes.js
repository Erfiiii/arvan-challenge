const ROUTE_REGISTER = "/users";
const ROUTE_LOGIN = "/user/login";
const ROUTE_USER = "/user";
const ROUTE_GET_USER_ARTICLES =
  "/articles?author=:username&limit=10&offset=:oddset";
const ROUTE_GET_TAGS = "/tag";
const ROUTE_ADD_ARTICLE = "/article";
const ROUTE_GET_ARTICLE_BY_SLUG = "/articles/:slug";
const ROUTE_DELETE_ARTICLE = "/articles/:slug";

const DOMAIN = 'https://conduit.productionready.io/api'

export const Endpoints = {
  ROUTE_REGISTER,
  ROUTE_LOGIN,
  ROUTE_USER,
  ROUTE_GET_USER_ARTICLES,
  ROUTE_GET_TAGS,
  ROUTE_ADD_ARTICLE,
  ROUTE_GET_ARTICLE_BY_SLUG,
  ROUTE_DELETE_ARTICLE,
  DOMAIN,
  get(endpoint, props) {
    endpoint = endpoints[endpoint];

    if (hasValue(props)) {
      for (const [prop, value] of Object.entries(props)) {
        endpoint = endpoint.replace(`:${prop}`, value);
      }
    }

    return Endpoint.DOMAIN + endpoint;
  }
};
