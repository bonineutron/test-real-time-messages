import { createServer } from 'node:http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production'; // Establece si está en desarrollo
const hostname = 'localhost'; // Utiliza un nombre de host local, o lo que Vercel espera
const port = process.env.PORT || 3000; // Usa el puerto proporcionado por Vercel o 3000 para desarrollo

const app = next({ dev, hostname });
const handler = app.getRequestHandler();

app.prepare().then(() => {
   const httpServer = createServer(handler);

   const io = new Server(httpServer);

   io.on('connection', (socket) => {
      console.log('socket-id:', socket.id);

      socket.on('message', (body) => {
         socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(8)
         });
      });
   });

   httpServer
      .once('error', (err) => {
         console.error(err);
         process.exit(1);
      })
      .listen(port, () => {
         console.log(`> Ready on http://${hostname}:${port}`);
      });
});
