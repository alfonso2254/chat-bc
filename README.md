# ChatBc Package

## Introducción
El paquete `ChatBc` provee una interfaz para interactuar con un servicio de chat mediante API REST y WebSockets. Permite obtener mensajes por canal, enviar mensajes y escuchar en tiempo real los mensajes de un canal específico.

## Instalación

Para instalar el paquete, utiliza el siguiente comando en tu proyecto Node.js:

```bash
npm install chatbc
```

## Uso Básico

Primero, importa el paquete y crea una instancia de `ChatBc`:

```javascript
const ChatBc = require('chatbc');

const chatClient = new ChatBc({
  url: 'https://tuapi.com',
  tokenClient: 'tuToken'
});
```

## API

### Constructor

- `new ChatBc({ url, tokenClient })`: Crea una nueva instancia.
  - `url`: URL del servidor del chat.
  - `tokenClient`: Token de autenticación del cliente.

### Métodos

- `async getMessagesByChannel({ username, channel })`: Obtiene mensajes de un canal específico.
  - `username`: Nombre de usuario.
  - `channel`: Nombre del canal.
  
- `async sendMessages({ message })`: Envía un mensaje a un canal.
  - `message`: Mensaje a enviar.

- `onMessages(channel, callback)`: Escucha en tiempo real los mensajes de un canal.
  - `channel`: Nombre del canal.
  - `callback`: Función que se ejecuta al recibir un mensaje.

- `getDataConversation()`: Devuelve la información de la conversación actual.

## Ejemplo

```javascript
// Crear una instancia de ChatBc
const chatClient = new ChatBc({
  url: 'https://tuapi.com',
  tokenClient: 'tuToken'
});

// Obtener mensajes de un canal
chatClient.getMessagesByChannel({ username: 'usuario', channel: 'general' })
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Enviar un mensaje
chatClient.sendMessages({ message: 'Hola Mundo' })
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Escuchar mensajes de un canal
chatClient.onMessages('general', (data) => {
  console.log('Nuevo mensaje:', data);
});
```
