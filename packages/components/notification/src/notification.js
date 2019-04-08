import Vue from 'vue';
import Notification from './main.js';

const NotificationConstructor = Vue.extend(Notification)

let instance;
let instances;

const NotificationFun = function(options){
  instance = new NotificationConstructor({
    data: options
  })
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show = true
  return instance;
} 

export default NotificationFun