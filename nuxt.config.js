import colors from "vuetify/es5/util/colors";
require('dotenv').config();

// const routerBase = process.env.NODE_ENV === "production" ? "/Noar_Israel_Admin_Panel/" : process.env.NODE_ENV === "dev_built" ? "./" : '/';

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // "@plugins/fireauth"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa"],

  pwa: {
    manifest: {
      name: 'Noar IL',
      lang: 'he'
    }
  },

  env: {
    NUXT_ENV_API_KEY: process.env.NUXT_ENV_API_KEY,
    NUXT_ENV_AUTH_DOMAIN: process.env.NUXT_ENV_AUTH_DOMAIN,
    NUXT_ENV_DATABASE_URL: process.env.NUXT_ENV_DATABASE_URL,
    NUXT_ENV_PROJECT_ID: process.env.NUXT_ENV_PROJECT_ID,
    NUXT_ENV_STORAGE_BUCKET: process.env.NUXT_ENV_STORAGE_BUCKET,
    NUXT_ENV_MESSAGE_SENDER_ID: process.env.NUXT_ENV_MESSAGE_SENDER_ID,
    NUXT_ENV_APP_ID: process.env.NUXT_ENV_APP_ID
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    rtl: true,
    theme: {
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  // router: {
  //   middleware: ["authenticated"]
  // }
};
