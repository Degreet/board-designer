import makeRender from './parts/render.js';

const ctx = canv.getContext('2d');

const radius = 20;
const lineWidth = 3;
const color1 = '#37c74b';
const color2 = '#1f9c1f';

const lines = [];
const points = [];
let activePoint;

const render = makeRender(
	ctx,
	points,
	lines,
	radius,
	lineWidth,
	color1,
	color2
);

function isFree(x, y) {
	return points.every(
		(point) => Math.hypot(x - point.x, y - point.y) > radius * 2
	);
}

function findPoint(x, y) {
	return points.findIndex(
		(point) => Math.hypot(x - point.x, y - point.y) < radius
	);
}

window.onload = window.onresize = () => {
	const width = innerWidth / 1.2;
	const height = innerHeight / 1.2;

	canv.width = width;
	canv.height = height;
};

canv.onclick = (e) => {
	const { offsetX: x, offsetY: y } = e;

	if (e.altKey) {
		const i = findPoint(x, y);

		if (i != -1) {
			points.splice(i, 1);
			render();
		}
	} else if (isFree(x, y)) {
		points.push({ x, y });
		render();
	} else {
		const i = findPoint(x, y);

		if (i != -1) {
			if (activePoint == null) {
				activePoint = i;
			} else if (activePoint) {
			}
		}
	}
};
