const axios = require("axios");
const { io } = require('socket.io-client');

class ChatBc {
    constructor({ url, tokenClient}) {
        this.url = url;
        this.tokenClient = tokenClient; 
        
        this.customer = {};    
        this.user = {};    
        this.channelsData = [];
    }

    async getMessagesByChannel({username , channel}) {
        try {
            const { data } = await axios({
                url: `${this.url}/api/messages-by-channel`,
                method: "get",
                params: {
                    username,
                    channel,
                    tokenClient: this.tokenClient
                }
            });

            this.customer = data.customer;
            this.user = data.user;

            if(this.channelsData.findIndex(item => item.channel === channel) === -1) {
                this.channelsData.push(data.channel);
            }
            
            return data;
        } catch (error) {
            return error;
        }
    }


    async sendMessages({ message, channel }) {
        console.log({ message, channel }, 'sendMessages');
        const channelId = this.channelsData.find(item => item.channel === channel)?._id || null;
        const customerId = this.customer._id || null;
        try {
            const { data } = await axios({
                url: `${this.url}/api/send-messages`,
                method: "post",
                data: {
                    message,
                    tokenClient: this.tokenClient,
                    channelId: channelId,
                    customerId: customerId,
                }
            });
            return data;
        }catch (error) {
            return error;
        }
    }

    onMessages(channel, callback) {
        const socket = io(this.url, 
            {
                transports: ['websocket']
            }
        );

        socket.on('connect', () => {
            console.log('Conectado');
        });

        const channelId = this.channelsData.find(item => item.channel === channel)._id || null;
        console.log('Conectado al canal:', `channel_message_${channelId}`);
        socket.on(`channel_message_${channelId}`, (data) => {
            callback(data);
        });

        socket.on('disconnect', () => {
            console.log('Desconectado');
        });

        socket.on('error', (error) => {
            console.error(error);
        });
    }

    getDataConversation() {
        return {
            customer: this.customer,
            user: this.user,
            channelsData: this.channelsData,
            tokenClient: this.tokenClient || "not token client",
            url: this.url
        }
    }
  }
  
  module.exports = ChatBc;
  