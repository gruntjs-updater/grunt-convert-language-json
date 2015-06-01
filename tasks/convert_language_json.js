/*
 * grunt-convert-language-json
 * https://github.com/ssc-hrep3/grunt-convert-language-json
 *
 * Copyright (c) 2015 Sebastian Schrepfer
 * Licensed under the Apache, 2.0 licenses.
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('convert_language_json', 'This Grunt plugin converts the structure of a language.json', function() {

		var options = this.options({
			prefix: "",
			suffix: "",
			checkIntegrity: true
		})

		if(this.files.length !== 1 || this.files[0].src.length !== 1) {
			grunt.fatal("Only a single input file can be used.");
		}

		function objectLength(object) {
			var i=0;
			if(typeof object === "object") {
				for(var key in object) {
					if(object.hasOwnProperty(key)) {
						i++;
					}
				}
			}
			return i;
		}

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			var finalJson = {};
			var initialJson;

			f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				initialJson = grunt.file.readJSON(filepath);
				for(var key in initialJson) {
					if(initialJson.hasOwnProperty(key)) {
						for(var language in initialJson[key]) {
							if(initialJson[key].hasOwnProperty(language)) {
								finalJson[language] = finalJson[language] || {};
								finalJson[language][key] = initialJson[key][language];
							}
						}
					}
				}
			});

			if(options.checkIntegrity) {
				var integrityError = "You need to have every key in every specified language!";

				var languages = [];
				for(var language in finalJson) {
					if(finalJson.hasOwnProperty(language)) {
						languages.push(language);
					}
				}

				for(var key in initialJson) {
					if(initialJson.hasOwnProperty(key)) {
						// count the languages, which occur anywhere and compare to the number of languages for this key
						if(objectLength(initialJson[key]) !== languages.length) {
							grunt.fail.warn(integrityError);
						}
					}
				}
			}

			// adds a prefix or suffix to the keys
			if(options.prefix !== "" || options.suffix !== "") {
				var finalJsonTemp = {};
				for(var language in finalJson) {
					if(finalJson.hasOwnProperty(language)) {
						finalJsonTemp[language] = {};
						for(var key in finalJson[language]) {
							if(finalJson[language].hasOwnProperty(key)) {
								finalJsonTemp[language][options.prefix + key + options.suffix] = finalJson[language][key];
							}
						}
					}
				}
				finalJson = finalJsonTemp;
			}

			// write the file
			if(typeof f.destType !== "undefined" && f.destType === 'file') {
				grunt.file.write(f.dest, JSON.stringify(finalJson));
			}
			else { // destType === 'folder'
				for(var language in finalJson) {
					if(finalJson.hasOwnProperty(language)) {
						if(f.dest.slice(-1) !== "/" && f.dest.slice(-1) !== "\\") {
							if(f.dest.indexOf("\\") !== -1) {
								f.dest = f.dest + "\\";
							}
							else {
								f.dest = f.dest + "/";
							}
						}
						grunt.file.write(f.dest + language + ".json", JSON.stringify(finalJson[language]));
					}
				}
			}
		});
	});

};
