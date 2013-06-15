// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file and the JamJS
    // generated configuration file.
    deps: ["vendor/jam/require.config", "main"],

    paths: {
        // Use the underscore build of Lo-Dash to minimize incompatibilities.
        "lodash": "vendor/jam/lodash/lodash.underscore",

        // Put additional paths here.
        "bootstrap": "vendor/bootstrap",
        "moment": "vendor/moment.min",
        "handlebars": "vendor/handlebars"
    },

    map: {
        // Ensure Lo-Dash is used instead of underscore.
        "*": { "underscore": "lodash" }

        // Put additional maps here.
    },

    shim: {
        // Put shims here.
        handlebars: {
            exports: "Handlebars"
        },

        bootstrap: {
            deps: ["jquery"]
        }
    }

});
