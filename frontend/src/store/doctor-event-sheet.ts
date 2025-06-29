import { atom } from 'jotai';

export const isOpen = atom(false);
export const officeId = atom<string | null>(null);
export const startTime = atom<Date>(new Date(new Date().setHours(8, 0, 0, 0)));
export const endTime = atom<Date>(new Date(new Date().setHours(16, 0, 0, 0)));
