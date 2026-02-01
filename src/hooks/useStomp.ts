import { useCallback, useEffect, useRef, useState } from 'react';
import { Client, messageCallbackType } from '@stomp/stompjs';

import { showToast } from '@/utils/functions';

interface UseStompProps {
  brokerURL: string;
  onConnect: (
    subscribe: (destination: string, onMessageReceived: messageCallbackType) => void,
  ) => void;
  enabled?: boolean;
}

function useStomp({ brokerURL, onConnect, enabled = true }: UseStompProps) {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const onConnectRef = useRef(onConnect);

  onConnectRef.current = onConnect;

  const subscribe = useCallback((destination: string, onMessageReceived: messageCallbackType) => {
    if (!clientRef.current) return;
    clientRef.current.subscribe(destination, onMessageReceived);
  }, []);

  const publish = useCallback((destination: string, data: unknown) => {
    if (!clientRef.current) return;
    clientRef.current.publish({
      destination,
      body: JSON.stringify(data),
    });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (clientRef.current) return;
    if (isConnected) return;

    const client = new Client({
      brokerURL,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);
        onConnectRef.current(subscribe);
      },
      onWebSocketError: (error) => {
        console.log({ error });
        showToast({ message: '웹 소켓 연결 실패', type: 'error' });
        setIsConnected(false);
        clientRef.current = null;
      },
      onDisconnect: () => {
        setIsConnected(false);
        clientRef.current = null;
      },
      debug: (log) => {
        console.log({ log });
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brokerURL, enabled, subscribe]);

  return { isConnected, subscribe, publish };
}

export default useStomp;
