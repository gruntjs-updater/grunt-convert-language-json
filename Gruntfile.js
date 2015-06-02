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
		convertLanguageJson: {
			outputInFolder: {
				files: [{
					src: 'test/language.json',
					dest: 'tmp/folder'
				}]
			},
			outputAsSingleFile: {
				files: [{
					src: 'test/language.json',
					dest: 'tmp/file/lang.json',
					destType: 'file'
				}]
			},
			outputInFolderWithPrefixSuffix: {
				options: {
					prefix: 'prefix.',
					suffix: '.suffix',
				},
				files: [{
					src: 'test/language.json',
					dest: 'tmp/folder-prefix'
				}]
			}

		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Register the default task which starts the conversion
	grunt.registerTask('default', ['clean', 'convertLanguageJson']);

};
