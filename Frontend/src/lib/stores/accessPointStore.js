import { writable } from 'svelte/store';

export const accessPointStore = writable([]);

export const updateLocationList = (newAccessPoint) => {
    accessPointStore.update(accessPointList => [...accessPointList, newAccessPoint]);
};