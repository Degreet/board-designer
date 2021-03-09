import drawEllipse from './draw-ellipse.js';

export default function makeRender(
	ctx,
	points,
	lines,
	radius,
	lineWidth,
	color1,
	color2
) {
	return (activePoint) => {
		ctx.clearRect(0, 0, canv.width, canv.height);

		ctx.strokeStyle = color2;
		ctx.lineWidth = lineWidth;

		lines.forEach(([i1, i2]) => {
			const { x: x1, y: y1 } = points[i1];
			const { x: x2, y: y2 } = points[i2];

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		});

		points.forEach((point, i) => {
			drawEllipse(
				ctx,
				point.x,
				point.y,
				radius,
				activePoint == i ? color2 : color1
			);
		});
	};
}
