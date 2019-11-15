const ROUTE_REGISTER = "/users";
const ROUTE_LOGIN = "/users/login";
const ROUTE_USER = "/user";
const ROUTE_GET_USER_ARTICLES =
  "/articles?author=:username&limit=10&offset=:offset";
const ROUTE_GET_TAGS = "/tags";
const ROUTE_ADD_ARTICLE = "/articles";
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

    if (props) {
      for (const [prop, value] of Object.entries(props)) {
        endpoint = endpoint.replace(`:${prop}`, value);
      }
    }

    return DOMAIN + endpoint;
  }
};
