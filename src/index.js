
import { Svg } from "./svg/Svg";


export function colorify (svgEl, options = {}) {

    const svg = new Svg(svgEl);

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

    if (!floatingColors || floatingColors.length < 2) {
        throw new Error('At least two colors should be defined');
    }

    if (floatingColors[0] !== floatingColors[floatingColors.length - 1]) {
        floatingColors.push(floatingColors[0]); // closing colors to make possible infinite animation
    }

    const target = svg.resolveTarget(targetId, targetConvertTo);

    const anglePI = (gradientAngle - 270) * (Math.PI / 180);

    const linearGradient = svg.appendElementTo(svg.defs, 'linearGradient', {
        id: svg.uniqueId(),
        'x1': Math.round(50 + Math.sin(anglePI) * 50) + '%',
        'y1': Math.round(50 + Math.cos(anglePI) * 50) + '%',
        'x2': Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%',
        'y2': Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%'
    });

    let begin = animationDelay + 'ms';

    const fromStop = svg.appendElementTo(linearGradient, 'stop', {
        offset: '0%',
        'stop-opacity': 1,
        'stop-color': initialColor || floatingColors[0]
    });

    const toStop = svg.appendElementTo(linearGradient, 'stop', {
        offset: '100%',
        'stop-opacity': 1,
        'stop-color': initialColor || floatingColors[0]
    });

    if (initialColor) {

        const initialColors = [initialColor, floatingColors[0]];
        svg.appendElementTo(fromStop, 'animate', {
            attributeName: 'stop-color',
            values: colorsToStopValue(initialColors, true),
            dur: animationDuration(initialColors, animationTransition),
            begin
        });

        const toInitialAnimation = svg.appendElementTo(toStop, 'animate', {
            id: svg.uniqueId(),
            attributeName: 'stop-color',
            values: colorsToStopValue(initialColors, false),
            dur: animationDuration(initialColors, animationTransition),
            begin
        });

        begin = toInitialAnimation.id + '.end';

    }

    svg.appendElementTo(fromStop, 'animate', {
        attributeName: 'stop-color',
        values: colorsToStopValue(floatingColors, true),
        dur: animationDuration(floatingColors, animationTransition),
        repeatCount: 'indefinite',
        begin
    });

    svg.appendElementTo(toStop, 'animate', {
        attributeName: 'stop-color',
        values: colorsToStopValue(floatingColors, false),
        dur: animationDuration(floatingColors, animationTransition) ,
        repeatCount: 'indefinite',
        begin
    });

    if (gradientUseAs === 'fill') {
        targetFill = `url(#${linearGradient.id})`;
    } else if (gradientUseAs === 'stroke') {
        targetStroke = `url(#${linearGradient.id})`;
    } else {
        throw new Error('Unknown gradientUseAs: ' + gradientUseAs);
    }

    if (targetFill) {
        target.setAttribute('fill', targetFill);
    }

    if (targetStroke) {
        target.setAttribute('stroke', targetStroke);
    }

    if (targetStrokeWidth) {
        target.setAttribute('stroke-width', targetStrokeWidth);
    }

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