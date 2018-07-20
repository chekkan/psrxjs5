import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');
let click = Observable.fromEvent(button, 'click')
	.map((e: MouseEvent) => {
		return { x: e.clientX, y: e.clientY };
	})
	.filter((value) => value.x < 500)
	.delay(300);

function load(url: string) {
	let xhr = new XMLHttpRequest();

	xhr.addEventListener('load', () => {
		let movies = JSON.parse(xhr.responseText);
		movies.forEach((m) => {
			let div = document.createElement('div');
			div.innerText = m.title;
			output.appendChild(div);
		});
	});

	xhr.open('GET', url);
	xhr.send();
}

click.subscribe((e) => load('movies.json'), (e) => console.log(`error: ${e}`), () => console.log('complete'));
