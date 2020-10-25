export const getByIdMock = jest.fn((id) => {
    if (id === 'existedUserId') {
        return 'user';
    }
});

export const deleteMock = jest.fn();
export const updateMock = jest.fn();
export const createMock = jest.fn((user) => {
    if (user.id === 'restrictedUserId') {
        throw new Error('Cannot create user, invalid id');
    }
    return user;
});

export default class UserService {
    getById = getByIdMock;
    delete = deleteMock;
    update = updateMock;
    create = createMock;
}
