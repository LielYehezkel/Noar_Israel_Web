import { auth } from "@/services/firebase";

export default function({ route, redirect }) {
  return new Promise(async (resolve, reject) => {
    auth.onAuthStateChanged(async user => {
      const homeRoute = "/";
      try {
        if (user) {
          const currentUserToken = await user.getIdTokenResult();
          if (currentUserToken.claims.admin && route.path === homeRoute) {
            redirect("/dashboard");
          }

          resolve();
        } else {
          if (route.path !== homeRoute) {
            redirect("/");
          }
          resolve();
        }
      } catch (error) {
        // console.log(error);
        reject();
        throw error;
      }
    });
  });
}
