export function outerWidth(el) {
    if(el) {
        var width = el.getBoundingClientRect().width;
        var style = getComputedStyle(el);

        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
    }
    return 0;
}

export function innerWidth(el) {
    if(el) {
        return el.getBoundingClientRect().width;
    }
    return 0;
}

export function isLandscape(width, height) {
    if(width && height) {
        return width > height;
    }
    return window.screen.orientation.type.startsWith('landscape');
}