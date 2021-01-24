<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url] [![Stargazers][stars-shield]][stars-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">
    v-fetch
    <br>
    <a href="https://travis-ci.org/shaynekasai/v-fetch" target="_blank"><img src="https://travis-ci.org/shaynekasai/v-fetch.svg?branch=main"></a>
  </h1>

  <p align="center">
    v-fetch is a Vue directive to add AJAX to your app without the boilerplate
  </p> 
</p>

<br>

## Summary

v-fetch is a directive that adds AJAX functionality to your Vue 2 application so that you don't have to write all of the bootstrap code to call a simple API request to update a model or submit data to an end-point.

**Note**: This is a work in progress, so the code and API is likely to change quickly.


## Installation

```
npm install @shaynekasai/v-fetch --save
```

## Usage

First, import and use v-fetch:

```javascript
import VueFetch from 'v-fetch'

Vue.use(VueFetch);
```

Simple GET example:

```html
<a href="/api/endpoint" v-fetch v-on:click.prevent>click</a>
```

Simple GET example that updates a model from the AJAX return call:

```html
<span>{{ message }}</span>
<a href="/api/endpoint" v-fetch="{updateModel: 'message'}" v-on:click.prevent>click</a>
```

> **Important!** when using *updateModel*, make sure your end-point returns data using the same name. If you want to access a nested value in the json that is returned from your end-point, see the *returnField* option below

Simple POST example that updates a model from the AJAX return call:

```html
<span>{{ message }}</span>
<a href="/api/endpoint" v-fetch:post="{sendModel: 'formModel', updateModel: 'message'}" v-on:click.prevent>click</a>
```

Form example:

```html
<form method="post" action="/api/endpoint" v-fetch>
  <input type="hidden" name="foo" value="bar">
</form>
```

## API

### Methods:
  
```v-fetch:get|post|put|patch|delete```

### Options:

- `updateModel: '<string>'` - the Vue model property to update 
- `sendModel: '<string>'` - the Vue model to send over as a form, json, or query args
- `returnField: '<string>'` - gets the value from your json end-point using dot notation (arrays/more complex notation not supported yet)
- `eventType: '<string>'` - the event type to use
- `extraParams: <object>` - these get merged into `fetch`'s extra options.
- `onStart: '<string>'` - calls your method just before the ajax call
- `onComplete: '<string>'` - calls your method after ajax call is completed
- `onError: '<strong>` - calls your method if there's an error

### Examples

Here are some codepen examples where you can see how this all works:

- [Simple example](https://jsfiddle.net/shaynekasai/3vndyk4L/)
- Form examples
- More complex example

### Callbacks

```onStart```

```onComplete```

```onError```

### Events

```v-fetch:start```

```v-fetch:complete```

### Release notes

#### 1.1.0
- Official working release
- Added more options to update and set model values
- More testing coverage

#### 1.0.4
- API change: use `sendModel` to send a specific model to the end-point
- API change: renamed `model` to `updateModel`
- API change: added a new `sendAs` parameter. Set to `json` to send JSON payload. `form` to send traditional form data.
- Tests: starting to add more tests for helpers  

#### 1.0.0
- Initial release, technology implmenetation and preview


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/shaynekasai/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/shaynekasai/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shaynekasai/v-fetch.svg?style=for-the-badge
[forks-url]: https://github.com/shaynekasai/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/shaynekasai/v-fetch.svg?style=for-the-badge
[stars-url]: https://github.com/shaynekasai/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/shaynekasai/v-fetch.svg?style=for-the-badge
[issues-url]: https://github.com/shaynekasai/repo/issues
[license-shield]: https://img.shields.io/github/license/shaynekasai/v-fetch.svg?style=for-the-badge
[license-url]: https://github.com/shaynekasai/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/shayne-kasai-8115b05/