/*
 * grunt-convert-language-json
 * https://github.com/ssc-hrep3/grunt-convert-language-json
 *
 * Copyright (c) 2015 Sebastian Schrepfer
 * Licensed under the Apache, 2.0 licenses.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		// Before generating any new files, remove any previously-created files.
		clean: {
			tmp: ['tmp']
		},

		// Configuration to be run (and then tested).
		convert_language_json: {
			output_in_folder: {
				files: [{
					src: 'test/language.json',
					dest: 'tmp/folder'
				}]
			},
			output_as_single_file: {
				files: [{
					src: 'test/language.json',
					dest: 'tmp/file/lang.json',
					destType: 'file'
				}]
			},
			output_in_folder_with_prefix_suffix: {
				options: {
					prefix: 'prefix.',
					suffix: '.suffix',
				},
				files: [{
					src: 'test/language.json',
					dest: 'tmp/folder_prefix'
				}]
			}

		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Register the default task which starts the conversion
	grunt.registerTask('default', ['clean', 'convert_language_json']);

};
