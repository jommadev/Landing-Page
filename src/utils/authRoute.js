export const isAuthenticated = () => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }
  return token;
};
