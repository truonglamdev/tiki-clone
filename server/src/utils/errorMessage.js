const createErrorMessage = (error) => {
    if (error.name === 'ValidationError') {
        const yupErrors = error.errors;
        return {
            statusCode: 400,
            message: {
                errors: yupErrors,
            },
        };
    } else {
        return {
            statusCode: 500,
            message: {
                error: `Internal Server Error : ${error.message}`,
            },
        };
    }
};

export default createErrorMessage;
