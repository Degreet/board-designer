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
	return () => {
		ctx.clearRect(0, 0, canv.width, canv.height);

		ctx.strokeStyle = color2;
		ctx.lineWidth = lineWidth;

		lines.forEach(([i1, i2]) => {
			const [x1, y1] = points[i1];
			const [x2, y2] = points[i2];

			ctx.moveTo(x1, y1);
			ctx.beginPath();
			ctx.lineTo(x2, y2);
			ctx.stroke();
		});

		points.forEach((point) => {
			drawEllipse(ctx, point.x, point.y, radius, color1);
		});
	};
}
