

export class Svg {

    constructor (svg) {

        if (!svg) {
            throw new Error('SVG element is null or undefined.');
        }

        this.svg = svg;

        const viewBox = svg.getAttribute('viewBox');
        if (!viewBox) {
            throw new Error('viewBox is undefined on svg');
        }

        let viewBoxBounds = viewBox.trim().split(' ');
        if (viewBoxBounds.length !== 4) {
            throw new Error('Invalid viewBox parameter. Must have the following pattern: "x y width height".');
        }

        this.x = viewBoxBounds[0] * 1.0;
        this.y = viewBoxBounds[1] * 1.0;
        this.width = viewBoxBounds[2] * 1.0;
        this.height = viewBoxBounds[3] * 1.0;

        const elements = svg.getElementsByTagName('defs');
        this.defs = elements.length > 0 ? elements[0] : this.prependElementTo(svg, 'defs');

    }

    uniqueId () {
        while (true) {
            const uniqueId = 'uid' + Math.ceil(Math.random() * 1000000.0);
            if (!document.getElementById(uniqueId) && !this.svg.getElementById(uniqueId)) {
                return uniqueId;
            }
        }
    }

    resolveTarget (targetId, targetConvertTo) {

        let target = targetId ? this.svg.getElementById(targetId) : null;
        if (!target && targetId) {
            throw new Error('Target not found by id: ' + targetId);
        }

        if (targetConvertTo) {
            if (targetConvertTo === 'clipPath') {
                target = this.convertToClipPath(target);
            } else {
                throw new Error('Unknown target element converter: ' + targetConvertTo);
            }
        } else if (!target) {
            target = this.createRect();
            this.prependTo(this.svg, target);
        }

        if (!target) {
            throw new Error('Target element is undefined');
        }

        return target;
    }

    createRect (attributes = {}) {
        return this.createElement('rect', Object.assign({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }, attributes))
    }

    convertToClipPath (target) {

        const toMove = []

        if (target) {
            toMove.push(target);
        } else {

            // adding all content of svg
            for (let child of this.svg.children) {
                if (child !== this.defs) {
                    toMove.push(child);
                }
           }
        }

        const clipPath = this.appendElementTo(this.defs, 'clipPath', {
            id: this.uniqueId()
        });


        if (toMove.length === 0) {
            throw new Error('Elements not found to create clipPath');
        }

        const newTarget = this.createRect({
            'clip-path': `url(#${clipPath.id})`
        });

        this.insertBefore(toMove[toMove.length - 1], newTarget);

        for (let child of toMove) {
            toMove.parentElement.removeChild(child);
            clipPath.appendChild(child);
        }

        return newTarget;
    }

    createElement (tagName, attributes = {}) {

        const el = document.createElementNS(this.svg.namespaceURI, tagName);

        for (let key in attributes) {
            el.setAttribute(key, attributes[key]);
        }

        return el;
    }

    appendElementTo (parentElement, tagName, attributes) {
        const el = this.createElement(tagName, attributes);
        parentElement.appendChild(el);
        return el;
    }

    prependElementTo (parentElement, tagName, attributes) {

        if (parentElement.children.length === 0) {
            return this.appendElementTo(parentElement, tagName, attributes);
        }

        const el = this.createElement(tagName, attributes);
        parentElement.insertBefore(el, parentElement.firstChild);
        return el;
    }

    prependTo (parentElement, element) {

        if (parentElement.children.length === 0) {
            parentElement.appendChild(element);
            return element;
        }

        parentElement.insertBefore(element, parentElement.firstChild);
        return element;
    }

    insertBefore (nextElement, element) {
        nextElement.parentElement.insertBefore(element, nextElement);
        return element;
    }

}
