import App from './app';

const server = new App();

process.on('uncaughtException', error => {
    console.log('Uncaught Exception!', error);
    process.exit(1);
});

process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection!', error);
    process.exit(1);
});

server.listen();