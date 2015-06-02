# grunt-convert-language-json

> This Grunt plugin converts the structure of a language.json

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-convert-language-json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-convert-language-json');
```

## The "convertLanguageJson" task

### Overview
In your project's Gruntfile, add a section named `convertLanguageJson` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  convertLanguageJson: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.prefix
Type: `String`
Default value: `''`

A string value that is prepended to the language key.

#### options.suffix
Type: `String`
Default value: `''`

A string value that is appended to the language key.

#### options.checkIntegrity
Type: `Boolean`
Default value: `true`

Checks, that every key is mentioned in every language.

### Usage Examples

In this example, there are 3 different options defined. The first option converts the language.json file into multiple language files in one folder (1 json file for each language). The second example converts the language.json into one language file. The destType has to be configured to `file`. The third example shows a configurable prefix and suffix for each language key. Be aware, that only 1 input file is allowed for every task.

```js
grunt.initConfig({
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
				suffix: '.suffix'
			},
			files: [{
				src: 'test/language.json',
				dest: 'tmp/folder_prefix'
			}]
		}
});
```

#### Language.json structure
The language.json needs to have exactly the following structure:
```js
{
  "test_key1": {
    "en": "This is a test key.",
    "de": "Dies ist ein Test-Schlüssel"
  },
  "test_key2": {
    "en": "This is also a test key.",
    "de": "Dies ist auch ein Test-Schlüssel"
  },
  "test_key3": {
    "en": "Even this is a test key.",
    "de": "Auch das ist ein Test-Schlüssel"
  }
}
```

The file will then be converted to one or multiple language files (according to the configuration), which look like this:
```js
{
  "en": {
    "test_key1": "This is a test key.",
    "test_key2": "This is also a test key.",
    "test_key3": "Even this is a test key."
  },
  "de": {
    "test_key1": "Dies ist ein Test-Schlüssel",
    "test_key2": "Dies ist auch ein Test-Schlüssel",
    "test_key3": "Auch das ist ein Test-Schlüssel"
  }
}
```

## Release History
- `0.1.1`: Rename to convertLanguageJson
- `0.1.0`: Initial Release
