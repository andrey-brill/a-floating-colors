
import { Svg } from "./svg/Svg";


export function colorify (svgEl, options = {}) {

    const svg = new Svg(svgEl);

    let {
        initialColor,  // color that will not be included to infinite repeat
        floatingColors,  // required

        targetId,  // if null - whole svg
        targetConvertTo,  // null or clipPath

        gradientAngle = 0,  // degree
        gradientUseAs = 'fill',  // fill or stroke

        stopOpacity = 1, // default gradient stop opacity

        animationDelay = 0,  // delay before animation will run
        animationTransition = 3000  // ms to switch from one color to another
     } = options;

    if (!floatingColors || floatingColors.length < 2) {
        throw new Error('At least two colors should be defined');
    }

    if (!initialColor) {
        initialColor = floatingColors.shift();
        floatingColors.push(initialColor);
    }

    if (floatingColors[0] !== floatingColors[floatingColors.length - 1]) {
        floatingColors.push(floatingColors[0]); // closing colors to make possible infinite animation
    }

    const target = svg.resolveTarget(targetId, targetConvertTo);

    const linearGradient = svg.appendElementTo(svg.defs, 'linearGradient', {
        id: svg.uniqueId(),
        y1: '50%',
        y2: '50%',
        gradientTransform: `rotate(${gradientAngle})`
    });

    const fromStop = svg.appendElementTo(linearGradient, 'stop', {
        offset: '0%',
        'stop-opacity': stopOpacity,
        'stop-color': initialColor
    });

    const toStop = svg.appendElementTo(linearGradient, 'stop', {
        offset: '100%',
        'stop-opacity': stopOpacity,
        'stop-color': initialColor
    });

    const initialColors = [initialColor, floatingColors[0]];
    const fromInitialAnimation = svg.appendElementTo(fromStop, 'animate', {
        id: svg.uniqueId(),
        attributeName: 'stop-color',
        values: colorsToStopValue(initialColors, true),
        dur: animationDuration(initialColors, animationTransition),
        begin: animationDelay + 'ms'
    });

    const toInitialAnimation = svg.appendElementTo(toStop, 'animate', {
        id: svg.uniqueId(),
        attributeName: 'stop-color',
        values: colorsToStopValue(initialColors, false),
        dur: animationDuration(initialColors, animationTransition),
        begin: animationDelay + 'ms'
    });

    svg.appendElementTo(fromStop, 'animate', {
        attributeName: 'stop-color',
        values: colorsToStopValue(floatingColors, true),
        dur: animationDuration(floatingColors, animationTransition),
        begin: fromInitialAnimation.id + '.end',
        repeatCount: 'indefinite'
    });

    svg.appendElementTo(toStop, 'animate', {
        attributeName: 'stop-color',
        values: colorsToStopValue(floatingColors, false),
        dur: animationDuration(floatingColors, animationTransition) ,
        begin: toInitialAnimation.id + '.end',
        repeatCount: 'indefinite'
    });

    target.setAttribute(gradientUseAs, `url(#${linearGradient.id})`);

}


function colorsToStopValue (colors, isFrom) {

    const result = [];
    for (let color of colors) {
        result.push(color);
        result.push(color);
    }

    if (isFrom) {
        result.pop();
    } else {
        result.shift();
    }

    return result.join(';');
}

function animationDuration (colors, transition) {
    const countTransitions = colors.length * 2 - 2;
    return (countTransitions * transition) + 'ms';
}