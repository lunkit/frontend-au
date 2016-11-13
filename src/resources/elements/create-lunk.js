import {HttpClient, json} from 'aurelia-fetch-client';
import * as env from 'environment';

let httpClient = new HttpClient();

export class CreateLunk {

  constructor() {
    this.message = '';
    this.created = false;
    this.lunkId = null;
    this.baseUrl = env.default.baseUrl;
    console.log(env.default.api);
  }

  create() {
    this.created = true;
    console.log(this.message);
    this.sendLunk(this.message);
    //this.encryptMessage(this.message);
    //Send the message to the server
    //Get the response back and display the lunk created view
  }

  encryptMessage(message) {
    httpClient.fetch('package.json')
      .then(response => response.json())
      .then(data=>{
        console.log(data);
        console.log(data.description);
      });
  }

  sendLunk(lunk) {
    let lunkIt = {
      lunk: lunk,
      expire: 10080,
      views: 1
    };
    httpClient.fetch(`${env.default.api}/lunk`, {
      method: 'post',
      body: json(lunkIt)
    }).then(response => response.json())
    .then(data =>{
      if (data.status === 'success') {
        this.lunkId = data.lunkId;
      }
      console.log(data);
    });
  }

}
