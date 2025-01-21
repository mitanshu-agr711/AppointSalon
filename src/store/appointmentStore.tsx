'use client';

import { create } from 'zustand';

type SummaryEntry = {
  serviceHair: string;
  agent: string;
  slot: string;
  totalPrice: number;
  price: number;
  
};

type AppointmentState = {
  summary: SummaryEntry[];
  agent: string;
  serviceHair: string;
  slot: string;
  price: number;
  totalPrice: number;
  slotCount: number; 
  removeSummary: (index: number) => void
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
  slotCount: 0,
  totalPrice: 0,
  addSlot: (slot) => set((state) => ({ 
    slot,
    slotCount: state.slotCount + 1 
  })),
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
          price: state.price,
        },
      ],
     
      serviceHair: '', 
      agent: '', 
      slot: '', 
      price: 0, 
      totalPrice: 0,
    })),

  addAgent: (agent) => set(() => ({ agent })),
  addServiceHair: (service) => set(() => ({ serviceHair: service })),
  
  addPrice: (price) => set(() => ({ price })),
  removeSummary: (index) => set((state) => ({

    summary: state.summary.filter((_, i) => i !== index),

  })),
}));
