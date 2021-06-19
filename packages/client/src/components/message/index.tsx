import React, { FC } from 'react';

interface MessageConfig {
  type: 'error' | 'success' | 'warn' | 'info';
  content: string;
}

function MessageDom() {
  
}

function Message({ type, content }: MessageConfig) {

}

Message.prototype.success = function (msg: string) {
  new Message({ type: 'success', content: msg });
}

Message.prototype.error = function (msg: string) {
  new Message({ type: 'error', content: msg });
}

export default Message;
