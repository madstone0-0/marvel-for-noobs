const DEFAULT_QUERY = "Spider-Man";
const API_KEY = "apikey=23a80623a19e54b4e7904a81d8a8780e";
const PATH_BASE = "https://gateway.marvel.com:443/v1/public";
const CHARACTERS = "/characters";
const PATH_SEARCH_STARTS = "nameStartsWith";
const PATH_SEARCH_IS = "name";
const LIMIT = 50;
const LIMIT_MAX = 100;
const TIMESTAMP = `ts=${+new Date()}`;
const FORMAT_COMIC = "formatType=comic";
const ORDER_BY_ISSUE_NUMBER = "orderBy=issueNumber";
const ORDER_BY_ON_SALE_DATE = "orderBy=onsaleDate";
const ORDER_BY_START_DATE_ASC = "orderBy=startDate";
const ORDER_BY_START_DATE_DESC = "orderBy=-startDate";

const MOVIE_PATH_BASE = "https://mcuapi.herokuapp.com/api/v1";
const MOVIES = "/movies";
const MOVIES_LIMIT = 12;
const MOVIES_COLUMNS = "title,release_date,cover_url,trailer_url";
const MOVIES_ORDER = "chronology,DESC";

export {
    API_KEY,
    PATH_BASE,
    CHARACTERS,
    PATH_SEARCH_IS,
    PATH_SEARCH_STARTS,
    LIMIT,
    DEFAULT_QUERY,
    TIMESTAMP,
    MOVIE_PATH_BASE,
    MOVIES,
    MOVIES_LIMIT,
    MOVIES_COLUMNS,
    MOVIES_ORDER,
    FORMAT_COMIC,
    ORDER_BY_ISSUE_NUMBER,
    ORDER_BY_ON_SALE_DATE,
    ORDER_BY_START_DATE_ASC,
    ORDER_BY_START_DATE_DESC,
    LIMIT_MAX,
};
