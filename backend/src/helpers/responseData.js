const responseData = (status, message, error, data) => {
  return {
    status,
    message,
    error,
    data,
  };
};

module.exports = responseData;
