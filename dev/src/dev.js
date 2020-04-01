

import { colorify } from '../../src/index.js';


const svg = document.getElementById('svg');

colorify(svg, {
    floatingColors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000']
})
