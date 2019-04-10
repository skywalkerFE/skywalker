import Vue from 'vue';
import Notification from './main.js';

const NotificationConstructor = Vue.extend(Notification)

let instance;
let instances = []
let seed = 1
const NotificationFun = function(options){
  if (Vue.prototype.$isServer) return;
  options = options || {};
  const userOnClose = options.onClose;
  const id = 'notification_' + seed++;
  const position = options.position || 'top-right';
  options.onClose = function() {
    Notification.close(id, userOnClose)
  }
  instance = new NotificationConstructor({
    data: options
  })
  instance.id = id
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show = true
  let verticalOffset = 0
  instances.filter(item => item.position === position).forEach(element => {
    verticalOffset += element.$el.offsetHeight + 16
  });
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  console.log()
  return instance;
} 
Notification.close = function(id, userOnClose) {
  let index = -1
  const len = instances.length
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0]
  if (!instance) return

  if (typeof userOnClose === 'function') {
    userOnClose(instance);
  }
  instances.splice(index, 1)

  if (len <= 1) return

  const position = instance.position;
  const removedHeight = instance.$el.offsetHeight
  for (let i = index; i < len - 1; i++){
    if (instances[i].position === position) {
      instances[i].$el.style[instance.verticalProperty] = parseInt(instances[i].$el.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px'
    }
  }
}

export default NotificationFun