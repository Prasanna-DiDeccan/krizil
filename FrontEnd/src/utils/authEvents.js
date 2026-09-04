let logoutListeners = [];

export const onAuthLogout = (callback) => {
  logoutListeners.push(callback);

  return () => {
    logoutListeners = logoutListeners.filter(
      (listener) => listener !== callback
    );
  };
};

export const emitAuthLogout = () => {
  console.log("🚨 AUTH LOGOUT EVENT");

  logoutListeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.log(
        "AUTH LOGOUT LISTENER ERROR =>",
        error
      );
    }
  });
};