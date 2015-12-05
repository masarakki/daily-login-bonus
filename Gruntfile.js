module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", { presets: ["es2015", "react"] }]
          ]
        },
        files: {
          "./dist/bundle.js": ["src/index.jsx"]
        }
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.js", "src/**/*.jsx"],
        tasks: ["browserify"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", ["browserify"]);
};
