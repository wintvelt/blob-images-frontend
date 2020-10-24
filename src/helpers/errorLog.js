export const errorLog = (error) => {
    const response = error.response;
    const message = (response?.data) ?
        `ERROR - ${response.status} - ${response.data.error || 'unknown error'}`
        : error.message || 'unknown error';
    console.warn(message);
}