import { create } from 'zustand';


type AppointmentState = {
  agent: string | null;
  service: string | null;
  slot: string | null;
  setAgent: (agent: string | null) => void;
  setService: (service: string | null) => void;
  setSlot: (slot: string | null) => void;
};

const useAppointmentStore = create<AppointmentState>((set) => ({
  agent: null,
  service: null,
  slot: null,
  setAgent: (agent: string | null) => set({ agent }),
  setService: (service: string | null ) => set({ service }),
  setSlot: (slot: string| null ) => set({ slot }),
}));

export default useAppointmentStore;
