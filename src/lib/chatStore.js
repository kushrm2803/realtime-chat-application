import { create } from "zustand";
import { data_base } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useuserStore } from "./userStore";

export const usechatStore = create((set) => ({
  chatId: null,
  user: null,
  iscurrentuserBlocked: false,
  isreceiverBlocked: false,
  changechat: (chatId, user) => {
    const currentuser = useuserStore.getState().currentuser;
    if (user.blocked.includes(currentuser.id)) {
      return set({
        chatId,
        user: null,
        iscurrentuserBlocked: true,
        isreceiverBlocked: false,
      });
    }
    else if (currentuser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        iscurrentuserBlocked: false,
        isreceiverBlocked: true,
      });
    }else{
        return set({
            chatId,
            user,
            iscurrentuserBlocked: false,
            isreceiverBlocked: false,
          }); 
    }
  },
  changeBlock: () => {
    set((state) => ({ ...state, isreceiverBlocked: !state.isReceiverBlocked }));
  },
}));
