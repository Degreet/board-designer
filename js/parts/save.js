export default function save(state) {
	const contentLink =
		'data:text/plain;charset=utf-8,' + encodeURI(JSON.stringify(state, 0, 2));
	const fileName = 'board.json';
	const a = document.createElement('a');
	a.href = contentLink;
	a.download = fileName;
	document.body.append(a);
	a.click();
	a.remove();
}
