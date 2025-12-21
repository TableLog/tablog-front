import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

import { showToast } from '@/utils/functions';

interface UseStompProps {
  brokerURL: string;
  publishDestination: string;
  subsribeDestination: string;
  onMessageReceived?: (message: string) => void;
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
          onMessageReceived?.(message.body);
        });
      },
      onWebSocketError: () => {
        showToast({ message: '웹 소켓 연결 실패', type: 'error' });
      },
    });

    clientRef.current.activate();

    return () => {
      if (!clientRef.current) return;
      clientRef.current.deactivate();
      clientRef.current = null;
    };
  }, []);

  const publishMessage = (data: unknown) => {
    if (!clientRef.current) return;
    clientRef.current.publish({
      destination: publishDestination,
      body: JSON.stringify(data),
    });
  };

  return { isConnected, publishMessage };
}

export default useStomp;
