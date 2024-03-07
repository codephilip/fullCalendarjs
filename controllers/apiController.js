// At the top of the file
const { LOGIN_ENDPOINT, DATA_ENDPOINT, LOGOUT_ENDPOINT } = require('../config/apiConfig');

// Functions login, fetchData, logout as defined previously
exports.getRestfmData = async (req, res) => {
    try {
        const apiResponse = await fetch(process.env.API_ENDPOINT_RESTFM);
        if (apiResponse.ok) {
            const contentType = apiResponse.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const fullData = await apiResponse.json();
                // Log the full JSON object for debugging
                console.log(fullData.data);
                // Extract and respond with only the "data" portion
                const data = fullData.data; // Assuming the structure is { meta: [...], data: [...] }
                res.json(data);
            } else {
                throw new TypeError('Expected JSON, got ' + contentType);
            }
        } else {
            throw new Error('API response was not ok. Status: ' + apiResponse.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}

exports.login = async (req, res) => {
    console.log('Login request received');
    try {
        const fetchResponse = await fetch(process.env.LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.AUTH}`
            },
        });
        const data = await fetchResponse.json(); // Parse JSON body of response
        console.log(data); // Logs the response body (parsed JSON object
        const token = data.response.token;
        console.log(token); // Logs the token value

        // Send token back to client or indicate success
        return { token: token };
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.fetchData = async (token) => {
    const fetchResponse = await fetch(process.env.DATA_ENDPOINT, {
        method: 'POST', // or 'GET', if appropriate
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: [
                { "date_start": "2/1/2024...2/29/2024" }
            ]
        }),
    });

    if (!fetchResponse.ok) {
        console.log('Fetch response not okay');
        throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const data = await fetchResponse.json();
    console.log('Data:', data.response.data);
    return data;
};

exports.logout = async (token) => {
    const url = `${process.env.LOGOUT_ENDPOINT}/${token}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // If your API also requires the token in the Authorization header
            },
        });

        if (!response.ok) {
            // Handle response errors
            throw new Error(`Logout failed, HTTP status ${response.status}`);
        }

        // Optionally, process the response if needed
        const data = await response.json();
        console.log('Logout successful', data);
        return data;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error; // Rethrowing the error to be handled by the caller
    }
};

exports.dapi = async (req, res) => {
    try {
        console.log('Logging in');
        const loginResponse = await exports.login(); // Directly calling login
        const token = loginResponse.token; // Assuming loginResponse includes the token directly
        console.log(token);
        console.log('Fetching data');
        const data = await exports.fetchData(token); // Passing the token to fetchData

        console.log('Logging out');
        await exports.logout(token); // Logging out

        console.log('done dapi run')
        res.json({ success: true, data });
        // res.json({ success: true, data }); // Sending fetched data back to the client
    } catch (error) {
        console.error('Error during combined action:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};