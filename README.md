<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">v-fetch (technology preview)</h3>

  <p align="center">
    v-fetch is a Vue 2 directive to add AJAX requests to your Vue application.
  </p>
</p>

## Summary

The intention of the v-fetch directive is to add AJAX functionality to your Vue 2 application so that you don't have to write all of the bootstrap code to call a simple API request to update a model or submit data to an end-point.

## Installation

```
npm install v-fetch --save
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
<a href="/api/endpoint" v-fetch="{model: 'message'}" v-on:click.prevent>click</a>
```

Simple POST example that updates a model from the AJAX return call:

```html
<a href="/api/endpoint" v-fetch:post="{model: 'message'}" v-on:click.prevent>click</a>
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

- `model: '<string>'` - the Vue model property to update 
- `eventType: '<string>'` - the event type to use
- `extraParams: <object>` - these get merged into `fetch`'s extra options.

Example: 
```html
v-fetch="{
  model: 'yourDataModel',
  eventType: 'click|submit|change',
  extraParams: {
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
}";
```

### Events

```v-fetch:before-complete```

```v-fetch:complete```

## Roadmap
- Add more tests and setup automated testing (high)
- Stabilize directive API (high)
- Documentation (high)
- :white_check_mark: Add event emitters (medium)
- Add support for other HTTP clients like axios (low)
- File upload (low)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/shaynekasai/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/shaynekasai/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shaynekasai/repo.svg?style=for-the-badge
[forks-url]: https://github.com/shaynekasai/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/shaynekasai/repo.svg?style=for-the-badge
[stars-url]: https://github.com/shaynekasai/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/shaynekasai/repo.svg?style=for-the-badge
[issues-url]: https://github.com/shaynekasai/repo/issues
[license-shield]: https://img.shields.io/github/license/shaynekasai/repo.svg?style=for-the-badge
[license-url]: https://github.com/shaynekasai/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/shaynekasai