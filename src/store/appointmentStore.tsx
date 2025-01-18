'use client';

import { create } from 'zustand';

type SummaryEntry = {
  serviceHair: string;
  agent: string;
  slot: string;
  totalPrice: number;
};

type AppointmentState = {
  summary: SummaryEntry[];
  agent: string;
  serviceHair: string;
  slot: string;
  price: number;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  addSummary: () => void;
  addAgent: (agent: string) => void;
  addServiceHair: (service: string) => void;
  addSlot: (slot: string) => void;
  addPrice: (price: number) => void;
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
  summary: [],
  agent: '',
  serviceHair: '',
  slot: '',
  price: 0,
  totalPrice: 0,
  setTotalPrice: (price) => set({ totalPrice: price }),
  addSummary: () =>
    set((state) => ({
      summary: [
        ...state.summary,
        {
          serviceHair: state.serviceHair,
          agent: state.agent,
          slot: state.slot,
          totalPrice: state.price,
        },
      ],
      //reset after adding to summary
      serviceHair: '', 
      agent: '', 
      slot: '', 
      price: 0, 
    })),

  addAgent: (agent) => set(() => ({ agent })),
  addServiceHair: (service) => set(() => ({ serviceHair: service })),
  addSlot: (slot) => set(() => ({ slot })),
  addPrice: (price) => set(() => ({ price })),
}));
