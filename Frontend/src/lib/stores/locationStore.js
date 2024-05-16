import { writable } from 'svelte/store';

export const locationStore = writable([]);

export const updateLocationList = (newLocation) => {
    locationStore.update(locationsList => [...locationsList, newLocation]);
};