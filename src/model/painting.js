var IDSEQ = 0;
if (localStorage.getItem('IDSEQ') !== null) {
    IDSEQ = parseInt(localStorage.getItem('IDSEQ'));
}
const nextSeq = () => {
    IDSEQ++;
    localStorage.setItem('IDSEQ', IDSEQ);
    return IDSEQ;
}

export class Painting {

    constructor(obj) {
        if(obj) {
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
        let ctx = canvas.getContext("2d");
        this.strokes.forEach(s => {
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            
            s.points.forEach((p, i) => {
                if(i == 0) {
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
        this.points.push(point);
    }
}