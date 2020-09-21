const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#ff0000",
              "@layout-body-background": "#fff",
              "@layout-header-background": "#fff",
              "@font-size-base": "16px;",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
