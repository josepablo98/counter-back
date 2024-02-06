import { useState, useEffect } from 'react';
import socketIOClient, { Socket } from "socket.io-client";

const ENDPOINT = "https://counter-back.vercel.app/";

function CounterComponent() {
  const [counter, setCounter] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT, { transports: ['polling'] });
    setSocket(newSocket);

    newSocket.on('counter', (count) => {
      setCounter(count);
      setAnimationKey(prevKey => prevKey + 1); // Incrementa la clave para reiniciar la animación
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (socket) {
      socket.emit('increment');
    }
  }

  return (
    <div className="contenedor">
      <h4>Me entiendes, ¿no?</h4>
      <button className="btn btn-primary" onClick={handleClick}>+1</button>
      <h5 className={`counter animate__heartBeat ${animationKey}`} key={animationKey}>{counter}</h5>
    </div>
  )
}

export default CounterComponent;