"use client";

import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const persistedStore = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={<Loading />} persistor={persistedStore}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};

export default StoreProvider;
