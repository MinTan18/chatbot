import { response } from "express";
import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED = 'https://bit.ly/3Mk4tsS'
const IMAGE_ABOUT_US = 'https://bit.ly/3wiHxUz'
const IMAGE_SPACES = 'https://bit.ly/3P9XvJk'
const IMAGE_WORKING_HOURS = 'https://bit.ly/3M4unRQ'
const IMAGE_DEPARTMENT = 'https://bit.ly/38ew6W6'



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
        let response2 = getStartedTemplate();

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

let getStartedTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Welcome to IU Library System",
            subtitle: "Here are some choices",
            image_url: IMAGE_ABOUT_US,
            buttons: [
              {
                type: "postback",
                title: "ABOUT US",
                payload: "A",
              },
              {
                type: "postback",
                title: "FIND_BOOKS",
                payload: "FIND_BOOKS",
              },
              {
                type: "postback",
                title: "GUIDE TO USE BOT!",
                payload: "GUIDE_TO_USE",
              }
            ],
          },
        ],
      },
    },
  };
  return response;
}

let handleSendAbout = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
        
      let response1 = getAboutTemplate();
      await callSendAPI(sender_psid, response1);
      console.log("successful");

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
}

let getAboutTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "ABOUT US",
            subtitle: "This Chatbot helps you have a good experience on using Online Library System",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "FIND SOME BOOKS",
                payload: "FIND_BOOKS",
              },
              {
                type: "postback",
                title: "ORDER",
                payload: "ORDER",
              },
              
            ],
          },
          {
            title: "WORKING HOURS",
            subtitle: "MON-FRI 9AM - 10PM | SAT 7AM - 7PM | SUN 10AM - 6PM",
            image_url: IMAGE_WORKING_HOURS,
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
            image_url: IMAGE_SPACES,
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
  return response
}

let getFindBooksTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "WHAT IS YOUR DEPARTMENT?",
            subtitle: "SWIPE TO CHOSE",
            image_url: IMAGE_DEPARTMENT,
            buttons: [
              {
                type: "postback",
                title: "Go Back",
                payload: "ORDER",
              },
              
            ],
          },
          {
            title: "BUSINESS ADMINISTRATION",
            subtitle: "BA",
            image_url: IMAGE_WORKING_HOURS,
            buttons: [
              {
                type: "postback",
                title: "GO TO",
                payload: "GO_TO_BA",
              },
            ],
          },
          {
            title: "LOGISTIC",
            subtitle: "IEM",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "GO TO",
                payload: "GO_TO_IEM",
              },
            ],
          },
          {
            title: "BIO TECHNOLOGY",
            subtitle: "BT",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "GO TO",
                payload: "GO_TO_BT",
              },
            ],
          },
          {
            title: "INFORMATION TECHNOLOGY",
            subtitle: "IT",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "GO TO",
                payload: "GO_TO_IT",
              },
            ],
          },
          {
            title: "CIVIL ENGINEERING",
            subtitle: "CE",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "GO TO",
                payload: "GO_TO_CE",
              },
            ],
          },
          {
            title: "ELECTRICAL ENGINEERING",
            subtitle: "EE",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "GO TO",
                payload: "GO_TO_EE",
              },
            ],
          },
          {
            title: "BIOMEDICAL ENGINEERING",
            subtitle: "BME",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "GO TO",
                payload: "GO_TO_BME",
              },
            ],
          },
          {
            title: "ENVIRONMENTAL ENGINEERING",
            subtitle: "EV",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "GO TO",
                payload: "GO_TO_EV",
              },
            ],
          },
        ],
      },
    },
  };
  return response
}

let handleFindBooks = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
        
      let response1 = getFindBooksTemplate();
      await callSendAPI(sender_psid, response1);
      console.log("successful");

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
}



module.exports = {
  handleGetStarted: handleGetStarted,
  handleSendAbout: handleSendAbout,
  handleFindBooks: handleFindBooks,
};
