function createMessage(statusCode, errorMessage, data ) {
    return {
        statusCode: statusCode,
        message: {
            status: statusCode === 200 ? 'OK' : 'ERR',
            message: errorMessage,
            ...data
        },
    };
}

export default createMessage;
