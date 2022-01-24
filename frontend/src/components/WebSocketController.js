import React from 'react';
import Sockette from 'sockette';
import throttle from 'lodash/throttle';
import { withSnackbar } from 'notistack';

import { addAccessTokenParameter } from '../authentication';
import { extractEventValue } from '.';

const WebSocketMessageType = {
  ID : "id",
  PAYLOAD : "payload"
}

export function webSocketController(wsUrl, wsThrottle, WebSocketController) {
  return withSnackbar(
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          ws: new Sockette(addAccessTokenParameter(wsUrl), {
            onmessage: this.onMessage,
            onopen: this.onOpen,
            onclose: this.onClose,
          }),
          connected: false
        }
      }

      componentWillUnmount() {
        this.state.ws.close();
      }

      onMessage = (event) => {
        const rawData = event.data;
        if (typeof rawData === 'string' || rawData instanceof String) {
          this.handleMessage(JSON.parse(rawData));
        }
      }

      handleMessage = (message) => {
        switch (message.type) {
          case WebSocketMessageType.ID:
            this.setState({ clientId: message.id });
            break;
          case WebSocketMessageType.PAYLOAD:
            const { clientId, data } = this.state;
            if (clientId && (!data || clientId !== message.origin_id)) {
              this.setState(
                { data: message.payload }
              );
            }
            break;
        }
      }

      onOpen = () => {
        this.setState({ connected: true });
      }

      onClose = () => {
        this.setState({ connected: false, clientId: undefined, data: undefined });
      }

      setData = (data, callback) => {
        this.setState({ data }, callback);
      }

      saveData = throttle(() => {
        const { ws, connected, data } = this.state;
        if (connected) {
          ws.json(data);
        }
      }, wsThrottle);

      saveDataAndClear = throttle(() => {
        const { ws, connected, data } = this.state;
        if (connected) {
          this.setState({
            data: undefined
          }, () => ws.json(data));
        }
      }, wsThrottle);

      handleValueChange = (name) => (event) => {
        const data = { ...this.state.data, [name]: extractEventValue(event) };
        this.setState({ data });
      }

      render() {
        return <WebSocketController
          {...this.props}
          handleValueChange={this.handleValueChange}
          setData={this.setData}
          saveData={this.saveData}
          saveDataAndClear={this.saveDataAndClear}
          connected={this.state.connected}
          data={this.state.data}
        />;
      }
    });
}
