import {
  auth
} from '@/services/firebase'

export default function ({
  store,
  route,
  redirect
}) {
  return new Promise(async (resolve, reject) => {
    auth.onAuthStateChanged(async user => {
      // console.log(user);
      const homeRoute = "/";

      try {
        if (user) {
          // const userToken = await user.getIdToken();
          // store.commit("users/SET_USER", {
          //   email: user.email,
          //   uid: user.uid,
          //   // token: userToken
          // });

          // const blockedRoute = /\/dashboard\/*/g;

          if (user && route.path === homeRoute) {
            redirect("/dashboard");
          }

          resolve();

        } else {
          if (user && route.path != homeRoute) {
            redirect("/");
          }
          resolve();
        }
      } catch (error) {
        // console.log(error);
        reject();
        throw error;
      }
    })
  });
}
