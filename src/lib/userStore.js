import { create } from "zustand";
import { data_base } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const useuserStore = create((set) => ({
  currentuser: null,
  isloading: true,
  fetchuserinfo: async (uid) => {
    if (!uid) return set({ currentuser: null, isloading: false });
    try {
      const docRef = doc(data_base, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentuser: docSnap.data(), isloading: false });
      } else {
        set({ currentuser: null, isloading: false });
      }
    } catch (err) {
      console.log(err);
      return set({ currentuser: null, isloading: false });
    }
  },
}));
