'use client'
import { create } from 'zustand';

type AppointmentState = {
  agents: string[];
  servicesHair: string[];
  slots: string[];
  prices: number[]; 
  addAgent: (agent: string) => void;
  addServiceHair: (service: string) => void;
  addSlot: (slot: string) => void;
  addPrice: (price: number) => void; 
  removeAgent: (agent: string) => void;
  removeServiceHair: (service: string) => void;
  removeSlot: (slot: string) => void;
  removePrice: (price: number) => void; 
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
  agents: [],
  servicesHair: [],
  slots: [],
  prices: [], 
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
  addServiceHair: (service) =>
    set((state) => ({ servicesHair: [...state.servicesHair, service] })),
  addSlot: (slot) => set((state) => ({ slots: [...state.slots, slot] })),
  addPrice: (price) =>
    set((state) => ({ prices: [...state.prices, price] })), 
  removeAgent: (agent) =>
    set((state) => ({ agents: state.agents.filter((a) => a !== agent) })),
  removeServiceHair: (service) =>
    set((state) => ({
      servicesHair: state.servicesHair.filter((s) => s !== service),
    })),
  removeSlot: (slot) =>
    set((state) => ({ slots: state.slots.filter((s) => s !== slot) })),
  removePrice: (price) =>
    set((state) => ({ prices: state.prices.filter((p) => p !== price) })), 
}));
