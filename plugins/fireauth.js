// // // This is `@plugins/fireauth.js`
// import {
//   auth
// } from '@/services/firebase'

// export default context => {
//   const {
//     store,
//     redirect
//   } = context

//   return auth.onAuthStateChanged(async user => {
//     console.log("user", user);
//     try {
//       if (user) {
//         const userToken = await user.getIdToken();
//         store.commit("users/SET_USER", {
//           email: user.email,
//           uid: user.uid,
//           token: userToken
//         });
//         redirect('/dashboard');
//       } else {
//         store.dispatch("users/signOut");
//       }
//     } catch (err) {
//       store.dispatch("users/signOut");
//       throw err
//     }
//   });
// }
