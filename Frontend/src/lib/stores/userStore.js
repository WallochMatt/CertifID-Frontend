import { writable } from 'svelte/store';

export const userStore = writable([]);

export const updateUserList = (newUser) => {
    userStore.update(usersList => [...usersList, newUser]);
};
