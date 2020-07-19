let IDSEQ = 0;
if (localStorage.getItem('IDSEQ') !== null) {
  IDSEQ = parseInt(localStorage.getItem('IDSEQ'));
}
const nextSeq = () => {
  IDSEQ++;
  localStorage.setItem('IDSEQ', IDSEQ);
  return IDSEQ;
};

// eslint-disable-next-line valid-jsdoc
/**
 * Class Painting
 * @class Painting
 * @typedef Painting
 * @property {number} id
 * @property {string} dataURL
 */
export class Painting {
  constructor(obj) {
    if (obj) {
      Object.assign(this, obj);
    } else {
      this.id = nextSeq();
      this.strokes = [];
      // eslint-disable-next-line max-len
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
