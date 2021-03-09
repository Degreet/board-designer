import makeRender from './parts/render.js';
import save from './parts/save.js';

const ctx = canv.getContext('2d');

const radius = 15;
const lineWidth = 5;
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

function removePoint(x, y) {
	const i = findPoint(x, y);

	if (i != -1) {
		points.splice(i, 1);

		for (let j = 0; j < lines.length; j++) {
			if (lines[j].includes(i)) {
				lines.splice(j, 1);
				j--;
			}
		}

		lines.forEach((line) => {
			if (line[0] > i) line[0]--;
			if (line[1] > i) line[1]--;
		});

		activePoint = null;
		render(activePoint);
	}
}

function addPoint(x, y) {
	points.push({ x, y });
	render();
}

function selectPoint(i) {
	activePoint = i;
	render(activePoint);
}

function unselectPoint() {
	activePoint = null;
	render();
}

function toggleLine(a, b) {
	const i = lines.findIndex((line) => line[0] == a && line[1] == b);

	if (i != -1) lines.splice(i, 1);
	else lines.push([a, b]);
}

window.onload = window.onresize = () => {
	const width = innerWidth / 1.2;
	const height = innerHeight / 1.2;

	canv.width = width;
	canv.height = height;
	render();
};

canv.onclick = (e) => {
	const { offsetX: x, offsetY: y } = e;

	if (e.altKey) {
		removePoint(x, y);
	} else if (isFree(x, y)) {
		addPoint(x, y);
	} else {
		const i = findPoint(x, y);

		if (i != -1) {
			if (activePoint == null) {
				selectPoint(i);
			} else {
				if (i != activePoint) toggleLine(activePoint, i);
				unselectPoint();
			}
		}
	}
};

onkeydown = (e) => {
	if (e.ctrlKey && e.key == 's') {
		e.preventDefault();
		save({ points, lines });
	}
};
