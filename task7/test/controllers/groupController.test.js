import { createHttpMocks } from '../stubs';
import {
    getGroupById,
    deleteGroupById,
    getAllGroups,
    createGroup,
    updateGroup
} from '../../src/controllers/groupController';
import {
    populateErrorWithHandledFields,
    ErrorHandler
} from '../../src/utils/errorHandler';

const mockGetById = jest.fn((id) => {
    if (id === 'existedGroupId') {
        return 'group';
    }
});
const mockDelete = jest.fn();
const mockGetAllGroups = jest.fn(() => 'groups');
const mockUpdate = jest.fn();
const mockCreate = jest.fn((group) => {
    if (group.id === 'restrictedGroupId') {
        throw new Error('Cannot create group, invalid id');
    }
    return group;
});

jest.mock('../../src/models');
jest.mock('../../src/utils/errorHandler');
jest.mock('../../src/services/groupService', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getById: (ctx) => mockGetById(ctx),
            delete: (ctx) => mockDelete(ctx),
            getAllGroups: (ctx) => mockGetAllGroups(ctx),
            create: (ctx) => mockCreate(ctx),
            update: (ctx) => mockUpdate(ctx)
        };
    });
});

const getMiddlewareMocks = (body) =>
    createHttpMocks(body, { path: '' }, { id: 'existedGroupId' });

describe('groupController', () => {
    describe('getGroupById', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call groupService.getById with provided group id', async () => {
            const { req, res } = getMiddlewareMocks();
            await getGroupById(req, res, jest.fn());
            expect(mockGetById).toHaveBeenCalledWith('existedGroupId');
        });
        it('should return status code 200 for existed group', async () => {
            const { req, res } = getMiddlewareMocks();
            await getGroupById(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should have group data in res, when exited group id provided', async () => {
            const { req, res } = getMiddlewareMocks();
            await getGroupById(req, res, jest.fn());
            expect(res._getData()).toEqual(JSON.stringify('group'));
        });
        it('should call next middleware without arguments when group id existed', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await getGroupById(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should call next() with error for unexisted group id', async () => {
            const { req, res } = getMiddlewareMocks();
            req._setParameter('id', 'unexistedGroupId');
            const nextMock = jest.fn();
            await getGroupById(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith(
                populateErrorWithHandledFields(
                    new ErrorHandler(
                        404,
                        'Group with id unexistedGroupId not found'
                    ),
                    req
                )
            );
        });
    });
    describe('deleteGroupById', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should call groupService.delete with groupId when group exists', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await deleteGroupById(req, res, nextMock);
            expect(mockDelete).toHaveBeenCalledWith('existedGroupId');
        });
        it('should return status code 200 for existed group', async () => {
            const { req, res } = getMiddlewareMocks();
            req._setParameter('id', 'existedGroupId');
            await deleteGroupById(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should populate res with correct data, when operation was succesfull', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await deleteGroupById(req, res, nextMock);
            expect(res._getJSONData()).toEqual({
                message: 'Group with id existedGroupId deleted'
            });
        });
        it('should call next middleware without arguments when group id existed', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await deleteGroupById(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });
    });
    describe('getAllGroups', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call groupService.getAllGroups ', async () => {
            const { req, res } = getMiddlewareMocks();
            await getAllGroups(req, res, jest.fn());
            expect(mockGetAllGroups).toHaveBeenCalled();
        });
        it('should return status code 200 for existed group', async () => {
            const { req, res } = getMiddlewareMocks();
            await getAllGroups(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should have group data in res', async () => {
            const { req, res } = getMiddlewareMocks();
            await getAllGroups(req, res, jest.fn());
            expect(res._getJSONData()).toEqual('groups');
        });
        it('should call next middleware without arguments when succesful', async () => {
            const { req, res } = getMiddlewareMocks();
            const nextMock = jest.fn();
            await getAllGroups(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });
    });
    describe('createGroup', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should call groupService.create with provided body', async () => {
            const mockedGroupBody = { id: 'newGroupId', name: 'groupName' };
            const { req, res } = getMiddlewareMocks(mockedGroupBody);
            const nextMock = jest.fn();
            await createGroup(req, res, nextMock);
            expect(mockCreate).toHaveBeenCalledWith(mockedGroupBody);
        });
        it('should return status code 200 for existed group', async () => {
            const { req, res } = getMiddlewareMocks();
            req._setParameter('id', 'newGroupId');
            await createGroup(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should populate res with correct data, when operation was succesfull', async () => {
            const mockedGroupBody = { id: 'newGroupId', name: 'groupName' };
            const { req, res } = getMiddlewareMocks(mockedGroupBody);
            const nextMock = jest.fn();
            await createGroup(req, res, nextMock);
            expect(res._getJSONData()).toEqual({
                message: 'Group with id newGroupId created',
                data: mockedGroupBody
            });
        });
        it('should call next middleware without arguments when can create', async () => {
            const mockedGroupBody = { id: 'newGroupId', name: 'groupName' };
            const { req, res } = getMiddlewareMocks(mockedGroupBody);
            const nextMock = jest.fn();
            await createGroup(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should call next() with error for restricted group id', async () => {
            const mockedGroupBody = { id: 'restrictedGroupId', name: 'groupName' };
            const { req, res } = getMiddlewareMocks(mockedGroupBody);
            const nextMock = jest.fn();
            await createGroup(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith(
                populateErrorWithHandledFields(
                    new ErrorHandler(
                        404,
                        'Cannot create group, invalid id'
                    ),
                    req
                )
            );
        });
    });
    describe('updateGroup', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should call groupService.update with provided body', async () => {
            const mockedGroupBody = { id: 'existedGroupId', name: 'groupName' };
            const { req, res } = getMiddlewareMocks(mockedGroupBody);
            const nextMock = jest.fn();
            await updateGroup(req, res, nextMock);
            expect(mockUpdate).toHaveBeenCalledWith(mockedGroupBody);
        });
        it('should return status code 200 for existed group', async () => {
            const { req, res } = getMiddlewareMocks();
            req._setParameter('id', 'existedGroupId');
            await updateGroup(req, res, jest.fn());
            expect(res.statusCode).toEqual(200);
        });
        it('should populate res with correct data, when operation was succesfull', async () => {
            const mockedGroupBody = { id: 'existedGroupId', name: 'groupName' };
            const { req, res } = getMiddlewareMocks(mockedGroupBody);
            const nextMock = jest.fn();
            await updateGroup(req, res, nextMock);
            expect(res._getJSONData()).toEqual({
                message: 'Group with id existedGroupId updated'
            });
        });
        it('should call next middleware without arguments when can update', async () => {
            const mockedGroupBody = { id: 'existedGroupId', name: 'groupName' };
            const { req, res } = getMiddlewareMocks(mockedGroupBody);
            const nextMock = jest.fn();
            await updateGroup(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith();
        });
        it('should call next() with error for unexisted group id', async () => {
            const mockedGroupBody = { id: 'unexistedGroupId', name: 'groupName' };
            const { req, res } = getMiddlewareMocks(mockedGroupBody);
            const nextMock = jest.fn();
            await updateGroup(req, res, nextMock);
            expect(nextMock).toHaveBeenCalledWith(
                populateErrorWithHandledFields(
                    new ErrorHandler(
                        404,
                        'Group with id unexistedGroupId not found. Update failed'
                    ),
                    req
                )
            );
        });
    });
});
