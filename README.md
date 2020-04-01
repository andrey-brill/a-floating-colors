
<!-- <img src='https://andrey-brill.github.io/floating-colors/assets/logo-and-text.svg' width="100%" alt='Floating Colors'/> -->

__JavaScript library for creating floating colors inside SVG-images via SMIL animations.__

## Examples

<a target='_blank' href='https://andrey-brill.github.io/floating-colors/'>Show me example!</a>

## Usage

### Install

```bash
npm install a-floating-colors --save
```

### Import

As module in __modern__ web-project

```js
import * as AFloatingColors from 'a-floating-colors';
```

As global variable `window.FloatingColors`

```html
  <script src="dist/floating-colors.min.js"></script>
```

### Creating clipPath in SVG-image


__NB!__ Be careful making this step - not all tags can be placed into `clipPath` tag.
This is the reason why this step is _manual_.
