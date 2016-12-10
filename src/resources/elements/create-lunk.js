import {HttpClient, json} from 'aurelia-fetch-client';
import * as env from 'environment';
import openpgp from 'openpgp';

let httpClient = new HttpClient();

export class CreateLunk {

  constructor() {
    this.message = '';
    this.created = false;
    this.lunkId = null;
    this.baseUrl = env.default.baseUrl;
    this.password = '';
    console.log(env.default.api);
  }

  create() {
    this.created = true;
    console.log(this.message);
    this.password = this.randomString(64);
    this.encryptMessage(this.message, this.password).then( (encrypted) => {
      this.sendLunk(encrypted);
    });
    //this.sendLunk(this.message);
  }

  encryptMessage(message, password) {
    let options = {
      data: message, // input as String
      passwords: password // multiple passwords possible
    };

    return openpgp.encrypt(options).then(function(ciphertext) {
      let encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
      return encrypted;
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

  randomString(length) {
    let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let i;
    let result = '';
    if (window.crypto && window.crypto.getRandomValues) {
      let values = new Uint32Array(length);
      window.crypto.getRandomValues(values);
      for (i = 0; i < length; i++) {
        result += charset[values[i] % charset.length];
      }
      return result;
    }
  }

}
