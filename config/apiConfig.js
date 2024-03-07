const API_BASE_URL = process.env.API_BASE_URL

module.exports = {
    DATA_ENDPOINT1: `${API_BASE_URL}/calendar/data`,

    LOGIN_ENDPOINT: `${API_BASE_URL}/api/login`,
    DATA_ENDPOINT2: `${API_BASE_URL}/calendar/data`,
    LOGOUT_ENDPOINT: `${API_BASE_URL}/logout`
}