import { useEffect, useRef, useState } from 'react';
import { Client, messageCallbackType } from '@stomp/stompjs';

import { showToast } from '@/utils/functions';

interface UseStompProps {
  brokerURL: string;
  onConnect: () => void;
  enabled?: boolean;
}

function useStomp({ brokerURL, onConnect, enabled = true }: UseStompProps) {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client>(null);

  useEffect(() => {
    if (!enabled) return;
    if (clientRef.current) return;
    if (isConnected) return;

    clientRef.current = new Client({
      brokerURL,
      onConnect: () => {
        if (!clientRef.current) return;
        setIsConnected(true);
        onConnect?.();
      },
      onWebSocketError: () => {
        showToast({ message: '웹 소켓 연결 실패', type: 'error' });
        setIsConnected(false);
      },
    });

    clientRef.current.activate();

    return () => {
      if (!clientRef.current) return;
      clientRef.current.deactivate();
      clientRef.current = null;
    };
  }, [brokerURL, isConnected, onConnect, enabled]);

  const subscribe = (destination: string, onMessageReceived: messageCallbackType) => {
    if (!clientRef.current) return;
    clientRef.current.subscribe(destination, onMessageReceived);
  };

  const publish = (destination: string, data: unknown) => {
    if (!clientRef.current) return;
    clientRef.current.publish({
      destination,
      body: JSON.stringify(data),
    });
  };

  return { isConnected, subscribe, publish };
}

export default useStomp;
