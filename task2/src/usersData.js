import { v4 as uuid } from 'uuid';

import { getCompareFunctionByProperty } from './helpers';

const usersMap = {
    '111': {
        id: '111',
        login: 'cccca',
        password: 'ds-111-password',
        age: 12,
        isDeleted: false
    },
    '112': {
        id: '112',
        login: 'aaaaa',
        password: 'ds-112-password',
        age: 12,
        isDeleted: false
    },
    '113': {
        id: '113',
        login: 'dddda',
        password: 'ds-113-password',
        age: 12,
        isDeleted: false
    },
    '114': {
        id: '114',
        login: 'bbbba',
        password: 'ds-114-password',
        age: 12,
        isDeleted: false
    }
};

export function getUserById(id) {
    return usersMap[id];
}

export function createUser(user) {
    const newUserId = uuid();
    const newUser = {
        ...user,
        isDeleted: false,
        id: newUserId
    };
    usersMap[newUserId] = newUser;
    return newUser;
}

export function updateUser(user) {
    const userId = user.id;
    usersMap[userId] = user;
    return user;
}

export function deleteUser(id) {
    if (getUserById(id)) {
        usersMap[id] = {
            ...usersMap[id],
            isDeleted: true
        };
    }
}

export function getFilteredSliceOfUsers(amount, substr) {
    return Object.values(usersMap)
        .filter((el) => el.login.includes(substr))
        .sort(getCompareFunctionByProperty('login'))
        .slice(0, amount);
}
