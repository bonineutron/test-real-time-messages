'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/socket';

export default function page(): React.JSX.Element {
   const [messages, setMessages] = useState<any>([]);
   const [message, setMessage] = useState('');

   useEffect(() => {
      socket.on('message', receiveMessage);

      return () => {
         socket.off('message', receiveMessage);
      };
   }, []);

   const receiveMessage = (message: any) => setMessages((state: any) => [message, ...state]);

   const handleSubmit = (event: any) => {
      event.preventDefault();
      const newMessage = {
         body: message,
         from: 'Me'
      };
      setMessages((state: any) => [newMessage, ...state]);
      setMessage('');
      socket.emit('message', newMessage.body);
   };

   return (
      <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
         <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
            <h1 className='text-2xl font-bold my-2'>Chat React</h1>
            <input
               name='message'
               type='text'
               placeholder='Write your message...'
               onChange={(e) => setMessage(e.target.value)}
               className='border-2 border-zinc-500 p-2 w-full text-black'
               value={message}
               autoFocus
            />

            <ul className='h-80 overflow-y-auto'>
               {messages.map((message: any, index: any) => (
                  <li
                     key={index}
                     className={`my-2 p-2 table text-sm rounded-md ${
                        message.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black'
                     }`}>
                     <b>{message.from}</b>:{message.body}
                  </li>
               ))}
            </ul>
         </form>
      </div>
   );
}
