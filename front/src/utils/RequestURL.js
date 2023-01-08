const API_BASE_URL_DEVELOPMENT = "https://localhost:7098";
const API_BASE_URL_PRODUCTION = "https://kazukauskasdangispresentconnection.azurewebsites.net";

const ENDPOINT = "records";

const development = `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT}`;
const production = `${API_BASE_URL_PRODUCTION}/${ENDPOINT}`;

const RequestURL = process.env.NODE_ENV === "development" ? development : production;

export default RequestURL;
