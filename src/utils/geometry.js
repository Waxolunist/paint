/**
@license
Copyright (C) 2018  Christian Sterzl <christian.sterzl@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
*/
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