export default {
    theme: {
        // ...
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
        require("tailwindcss-flip")
        // ...
    ],
    daisyui: {
        rtl: true,
    },
    content: [
          "node_modules/tailvue/dist/tailvue.es.js",
      ],
}