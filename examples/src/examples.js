
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

const transparent = 'rgba(255,255,255,0)';

colorifySvg('topLeft', {
    targetId: 'logo',
    targetConvertTo: 'clipPath',
    floatingColors: ['#FF00FF', '#00FFFF'],
    animationTransition: 1000
});

colorifySvg('topRight', {
    initialColor: transparent,
    targetId: 'circle',
    targetFill: 'none',
    targetStrokeWidth: '16px',
    gradientUseAs: 'stroke',
    gradientAngle: 90,
    floatingColors: ['#FF00FF', '#00FFFF'],
    animationDelay: 3000
});

colorifySvg('bottomLeft', {
    initialColor: transparent,
    targetId: 'circle',
    gradientAngle: 135,
    floatingColors: ['#FF00FF', '#00FFFF'],
    animationDelay: 7000
});

colorifySvg('bottomRight', {
    initialColor: transparent,
    targetId: 'logo',
    floatingColors: ['#FFFFFF', '#333333'],
    animationDelay: 10000
});

colorifySvg('bottomRight', {
    initialColor: transparent,
    targetId: 'circle',
    floatingColors: ['#FF0000', '#FF00FF', '#00FFFF', '#FF00FF'],
    gradientAngle: -180,
    animationDelay: 10000
});