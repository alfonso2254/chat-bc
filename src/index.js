const axios = require("axios");


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


    sendMessages({ message }) {
      // Lógica para enviar mensajes
    }

    getDataConversation() {
        return {
            customer: this.customer,
            user: this.user,
            channelsData: this.channelsData
        }
    }
  }
  
  module.exports = ChatBc;
  