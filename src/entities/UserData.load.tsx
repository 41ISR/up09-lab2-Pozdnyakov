import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserData {
  id: string | null;
  addID: (settedId: string) => void;
  removeID: () => void;
}

const useUserData = create<IUserData>()(
  persist(
    (set) => ({
      id: null,
      addID: (settedId) =>
        set(() => ({
          id: settedId,
        })),
      removeID: () =>
        set(() => ({
          id: null,
        })),
    }),
    { name: "user-ID" }
  )
);

export default useUserData;
