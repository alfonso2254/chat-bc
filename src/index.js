const axios = require("axios");
const SocketConnection = require("./config/socketConnection");

class ChatBc {
  constructor({ url, tokenClient }) {
    this.url = url;
    this.tokenClient = tokenClient;

    this.customer = {};
    this.user = {};
    this.channelsData = [];

    this.socketConnection = new SocketConnection(url);
    this.socket = this.socketConnection.socket;
  }

  async getMessagesByChannel({ username, channel }) {
    try {
      const { data } = await axios({
        url: `${this.url}/api/messages-by-channel`,
        method: "get",
        params: {
          username,
          channel,
          tokenClient: this.tokenClient,
        },
      });

      this.customer = data.customer;
      this.user = data.user;

      if (
        this.channelsData.findIndex((item) => item.channel === channel) === -1
      ) {
        this.channelsData.push(data.channel);
      }

      return data;
    } catch (error) {
      return error;
    }
  }

  async sendMessages({ message, channel }) {
    console.log({ message, channel }, "sendMessages");
    const channelId =
      this.channelsData.find((item) => item.channel === channel)?._id || null;
    const customerId = this.customer._id || null;
    try {
      const { data } = await axios({
        url: `${this.url}/api/send-messages`,
        method: "post",
        data: {
          message,
          userId: this.user._id,
          channelId: channelId,
          customerId: customerId,
        },
        headers: {
          socketId: this.socketConnection.socket.id,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  onMessages(channel, callback) {
    const channelId = this.channelsData.find(item => item.channel === channel)?._id || null;
    if (!channelId) {
      console.error("ID de canal no encontrado");
      return;
    }

    console.log("Conectado al canal:", `channel_message_${channelId}`);
    this.socket.on(`channel_message_${channelId}`, callback);
  }

  getDataConversation() {
    return {
      customer: this.customer,
      user: this.user,
      channelsData: this.channelsData,
      tokenClient: this.tokenClient || "not token client",
      url: this.url,
    };
  }
}

module.exports = ChatBc;
