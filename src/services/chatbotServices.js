import { response } from "express";
import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED = 'https://bit.ly/3Mk4tsS'

let callSendAPI = (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v9.0/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

let getUserName =  (sender_psid) => {
    return new Promise((resolve, reject) => {
        request(
            {
              "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
              "method": "GET",
            },
            (err, res, body) => {
              if (!err) {
                body = JSON.parse(body);
                let username = `${body.first_name} ${body.last_name}`;
        
                resolve(username);
              } else {
                console.error("Unable to send message:" + err);
                reject(err);
              }
            }
          );
    })

};

let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
        let username = await getUserName(sender_psid)
        let response1 = { "text": `OK. Welcome ${username} to IU Lib System` };
        let response2 = getGetStartedTemplate();

        //  send text message
      await callSendAPI(sender_psid, response1);

        // send generic template
      await callSendAPI(sender_psid, response2);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getGetStartedTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Welcome to IU Library System",
            subtitle: "Here are some choices",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "ABOUT US",
                payload: "ABOUT",
              },
              {
                type: "postback",
                title: "ORDER",
                payload: "ORDER",
              },
              {
                type: "postback",
                title: "GUIDE TO USE BOT!",
                payload: "GUIDE TO USE",
              }
            ],
          },
        ],
      },
    },
  };
  return response;
}

let handleSendAbout = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
        
        let response1 = getAboutTemplate();

        //  send text message
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
}

let getAboutTemplate = () => {
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "ABOUT US",
            "subtitle": "This Chatbot helps you have a good experience on using Online Library System",
            "image_url": IMAGE_GET_STARTED,
            "buttons": [
              {
                "type": "postback",
                "title": "FIND SOME BOOKS",
                "payload": "FIND BOOKS",
              },
              {
                "type": "postback",
                "title": "ORDER",
                "payload": "ORDER",
              },
              
            ],
          },
          {
            title: "WORKING HOURS",
            subtitle: "MON-FRI 9AM - 10PM | SAT 7AM - 7PM | SUN 10AM - 6PM",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "ORDER",
                payload: "ORDER",
              },
            ],
          },
          {
            title: "LIBRARY SPACES",
            subtitle: "Here are some spaces for readers",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "DETAIL",
                payload: "SHOW_ROOMS",
              },
            ],
          },
        ],
      },
    },
  };
}
module.exports = {
  handleGetStarted: handleGetStarted,
  handleSendAbout: handleSendAbout,
};
