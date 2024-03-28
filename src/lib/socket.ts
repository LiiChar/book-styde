// import { WebSocketServer } from 'ws';

// export class SocketBase {
// 	constructor(type: 'client' | 'server', path: string, events: string[]) {
// 		if (type == 'client') {
// 			return new SocketClient(path, events);
// 		} else {
// 			return new SocketServer(path, events);
// 		}
// 	}
// }

// class SocketClient extends WebSocket {
// 	public path!: string;
// 	public events!: string[];
// 	public socket!: WebSocket;

// 	constructor(path: string, event: string[]) {
// 		super(path);
// 		this.path = path;
// 		this.events = event;
// 		this.socket = new WebSocket(path);
// 	}

// 	public on(ev: evens) {}
// }

// class SocketServer extends WebSocketServer {
// 	public path!: string;
// 	public events!: string[];
// 	constructor(path: string, event: string[]) {
// 		super({
// 			path: path,
// 		});
// 		this.path = path;
// 		this.events = event;
// 	}

// 	override on() {}
// }
