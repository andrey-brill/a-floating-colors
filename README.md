
<img src='https://andrey-brill.github.io/a-floating-colors/svg/logo.0.svg' width="100%" alt='Floating Colors'/>

__JavaScript library for creating floating colors inside SVG-images via SMIL animations.__

## Examples

<a target='_blank' href='https://andrey-brill.github.io/a-floating-colors/'>Show me example!</a>

## Usage

### Install

```bash
npm install a-floating-colors --save
```

### Import

As module in __modern__ web-project

```js

import { colorify } from 'a-floating-colors';


const svgEl = document.getElementById('svg');

const { pause, unpause, isPaused } = colorify(svgEl, {
    floatingColors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000']
});

svgEl.addEventListener('click', function () {
    (isPaused() ? unpause : pause)();
});

```

### Options

```js

    let {
        initialColor,  // color that will not be included to infinite repeat
        floatingColors,  // required

        targetId,  // if null - whole svg
        targetConvertTo,  // null or clipPath

        targetFill, // set fill
        targetStroke, // set stroke
        targetStrokeWidth, // set width

        gradientAngle = 0,  // degree
        gradientUseAs = 'fill',  // fill or stroke

        animationDelay = 0,  // delay before animation will run
        animationTransition = 3000  // ms to switch from one color to another
     } = options;

```

### NB! targetConvertTo: clipPath

Be careful making this step - not all tags can be placed into `clipPath` tag.
