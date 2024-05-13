import { writable } from 'svelte/store';

// Initial empty array for users
export const userStore = writable([]);

// Function to update the users list
export const updateUserList = (newUser) => {
    userStore.update(usersList => [...usersList, newUser]);
};
