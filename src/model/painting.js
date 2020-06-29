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
let IDSEQ = 0;
if (localStorage.getItem('IDSEQ') !== null) {
  IDSEQ = parseInt(localStorage.getItem('IDSEQ'));
}
const nextSeq = () => {
  IDSEQ++;
  localStorage.setItem('IDSEQ', IDSEQ);
  return IDSEQ;
};

export class Painting {
  constructor(obj) {
    if (obj) {
      Object.assign(this, obj);
    } else {
      this.id = nextSeq();
      this.strokes = [];
      this.dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    }
  }

  addStroke(stroke) {
    this.strokes.push(stroke);
  }

  draw(canvas) {
    const ctx = canvas.getContext('2d');
    this.strokes.forEach((s) => {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 4;
      ctx.beginPath();

      s.points.forEach((p, i) => {
        if (i == 0) {
          ctx.moveTo(p.x, p.y);
          return;
        }
        ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    });
  }
}

export class Stroke {
  constructor(color) {
    this.color = color;
    this.points = [];
  }

  addPoint(point) {
    if (Array.isArray(point)) {
      this.points.push(...point);
    } else {
      this.points.push(point);
    }
  }
}
