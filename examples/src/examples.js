
import './index.css';
import logo from './svg/logo.svg';
import circle from './svg/logo-circle.svg';
import { colorify } from '../../src/index.js';


const pageTemplate = `

    <div id="header" class="header">
        ${ logo }
    </div>
    <div class="responsive">
        <div class="row">
            <div id="topLeft">${ circle }</div>
            <div id="topRight">${ circle }</div>
        </div>
        <div class="row">
            <div id="bottomLeft">${ circle }</div>
            <div id="bottomRight">${ circle }</div>
        </div>
    </div>

`;

document.getElementById('root').innerHTML = pageTemplate;

function colorifySvg (parentId, options) {
    colorify(document.getElementById(parentId).children[0], options);
}

// Github Readme Logo

colorifySvg('header', {
    targetConvertTo: 'clipPath',
    floatingColors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000']
});
