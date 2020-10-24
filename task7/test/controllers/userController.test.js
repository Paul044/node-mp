import {
    getByIdMock,
    deleteMock,
    updateMock,
    createMock
} from '../../src/services/userService';
import { createHttpMocks } from '../stubs';

jest.mock('../../src/services/userService');
jest.mock('../../src/models');
jest.mock('../../src/utils/errorHandler');

const getMiddlewareMocks = (body) =>
    createHttpMocks(body, { path: '' }, { id: 'existedUserId' });

import {
    getUser,
    deleteUser,
    updateUser,
    createUser
} from '../../src/controllers/userController';
import {
    populateErrorWithHandledFields,
    ErrorHandler
} from '../../src/utils/errorHandler';

describe('userController', () => {
    describe('getUser', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call userService.getById with provided user id', async () => {
            const { req, res } = getMiddlewareMocks();
            await getUser(req, res, jest.fn());
            expect(getByIdMock).toHaveBeenCalledWith('existedUserId');
        });
        it('should return status code 200 for existed user', async () => {
            const { req, res } = getMiddlewareMocks();
            await getUser(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should have user data in res, when exited user id provided', async () => {
            const { req, res } = getMiddlewareMocks();
            await getUser(req, res, jest.fn());
            expect(res._getData()).toEqual(JSON.stringify('user'));
        });
        it('should call next middleware without arguments when user id existed', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await getUser(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should call next() with error for unexisted user id', async () => {
            const { req, res } = getMiddlewareMocks();
            req._setParameter('id', 'unexistedUserId');
            const nextMock = jest.fn();
            await getUser(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith(
                populateErrorWithHandledFields(
                    new ErrorHandler(
                        404,
                        'User with id unexistedUserId not found'
                    ),
                    req
                )
            );
        });
    });
    describe('deleteUser', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should call userService.delete with userId when user exists', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await deleteUser(req, res, nextMock);
            expect(deleteMock).toHaveBeenCalledWith('existedUserId');
        });
        it('should return status code 200 for existed user', async () => {
            const { req, res } = getMiddlewareMocks();
            req._setParameter('id', 'existedUserId');
            await deleteUser(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should populate res with correct data, when operation was succesfull', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await deleteUser(req, res, nextMock);
            expect(res._getJSONData()).toEqual({
                message: 'User with id existedUserId deleted'
            });
        });
        it('should call next middleware without arguments when user id existed', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await deleteUser(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });

        it('should call next() with error for unexisted user id', async () => {
            const { req, res } = getMiddlewareMocks();
            req._setParameter('id', 'unexistedUserId');
            const nextMock = jest.fn();
            await deleteUser(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith(
                populateErrorWithHandledFields(
                    new ErrorHandler(
                        404,
                        'User with id unexistedUserId not found'
                    ),
                    req
                )
            );
        });
    });
    describe('updateUser', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should call userService.update with userId when user exists', async () => {
            const mockedUserBody = { id: 'existedUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            const nextMock = jest.fn();
            await updateUser(req, res, nextMock);
            expect(updateMock).toHaveBeenCalledWith(mockedUserBody);
        });
        it('should not call userService.update with userId when user does not exist', async () => {
            const mockedUserBody = { id: 'notexistedUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            const nextMock = jest.fn();
            await updateUser(req, res, nextMock);
            expect(updateMock).not.toHaveBeenCalled();
        });
        it('should return status code 200 for existed user', async () => {
            const { req, res } = getMiddlewareMocks();
            req._setParameter('id', 'existedUserId');
            await updateUser(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should populate res with correct data, when operation was succesfull', async () => {
            const mockedUserBody = { id: 'existedUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            const nextMock = jest.fn();
            await updateUser(req, res, nextMock);
            expect(res._getJSONData()).toEqual({
                message: 'User with id existedUserId updated'
            });
        });
        it('should call next middleware without arguments when user id existed', async () => {
            const mockedUserBody = { id: 'existedUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            const nextMock = jest.fn();
            await updateUser(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });

        it('should call next() with error for unexisted user id', async () => {
            const mockedUserBody = { id: 'unexistedUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            const nextMock = jest.fn();
            await updateUser(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith(
                populateErrorWithHandledFields(
                    new ErrorHandler(
                        404,
                        'User with id unexistedUserId not found. Update failed'
                    ),
                    req
                )
            );
        });
    });
    describe('createUser', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should call userService.create with provided body when user exists', async () => {
            const mockedUserBody = { id: 'newUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            const nextMock = jest.fn();
            await createUser(req, res, nextMock);
            expect(createMock).toHaveBeenCalledWith(mockedUserBody);
        });
        it('should return status code 200 for created user', async () => {
            const mockedUserBody = { id: 'newUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            await createUser(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should populate res with correct data, when operation was succesfull', async () => {
            const mockedUserBody = { id: 'newUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            const nextMock = jest.fn();
            await createUser(req, res, nextMock);
            expect(res._getJSONData()).toEqual({
                message: 'User with id newUserId created',
                data: mockedUserBody
            });
        });
        it('should call next middleware without arguments when user created', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await createUser(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });

        it('should call next() with error for restricted id', async () => {
            const mockedUserBody = { id: 'restrictedUserId', name: 'userName' };
            const { req, res } = getMiddlewareMocks(mockedUserBody);
            const nextMock = jest.fn();
            await createUser(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith(
                populateErrorWithHandledFields(
                    new ErrorHandler(
                        404, // TODO: is it OK that we have 404 when it's userService issue ?
                        'Cannot create user, invalid id'
                    ),
                    req
                )
            );
        });
    });
});
