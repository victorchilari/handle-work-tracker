import http from 'http';
import start from './src/start.js';
import stop from './src/stop.js';

const hostname = '127.0.0.1';
const port = 3005;

function log() {
	console.log('asd');
}

const btn_home = '<a href="/"><button>Home</button></a>';
const btn_start = '<a href="/start-work"><button>Start</button></a>';
const btn_stop = '<a href="/stop-work"><button>Stop</button></a>';

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.statusCode = 200;
	switch (req.url) {
		case '/start-work':
			start();
			res.write(btn_home);
			break;
		case '/stop-work':
			stop();
			res.write(btn_home);
			break;
		case '/':
			res.write(btn_start + '	. ' + btn_stop);
		default:
			res.statusCode = 404;
			break;
	}
	res.end();
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
