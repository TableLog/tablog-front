import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

interface UseStompProps {
  brokerURL: string;
  publishDestination: string;
  subsribeDestination: string;
  onMessageReceived: (message: string) => void;
}

function useStomp({
  brokerURL,
  publishDestination,
  subsribeDestination,
  onMessageReceived,
}: UseStompProps) {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client>(null);

  useEffect(() => {
    clientRef.current = new Client({
      brokerURL,
      onConnect: () => {
        if (!clientRef.current) return;
        setIsConnected(true);
        clientRef.current.subscribe(subsribeDestination, (message) => {
          onMessageReceived(message.body);
        });
      },
    });

    clientRef.current.activate();

    return () => {
      if (!clientRef.current) return;
      clientRef.current.deactivate();
      clientRef.current = null;
    };
  }, [brokerURL, onMessageReceived, subsribeDestination]);

  const publishMessage = <T>(data: T) => {
    if (!clientRef.current) return;

    clientRef.current.publish({
      destination: publishDestination,
      body: JSON.stringify(data),
    });
  };

  return { isConnected, publishMessage };
}

export default useStomp;
