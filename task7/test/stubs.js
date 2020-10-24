import httpMocks from 'node-mocks-http';

export const createHttpMocks = (body = {}, route = {}, params = {}) => {
    return httpMocks.createMocks({
        body,
        route,
        params
    });
};

