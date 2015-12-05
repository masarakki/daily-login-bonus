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
    lambda_package: {
      default: {
        options: {
          package_folder: "./lambda"
        }
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*", "lambda/**/*"],
        tasks: ["browserify", "lambda_package"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-aws-lambda");
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", ["browserify", "lambda_package"]);
};
