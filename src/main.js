// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jsbase64 from 'js-base64'

Vue.config.productionTip = false

var Base64 = jsbase64.Base64;

//转码base64
window.base64Encode = function(v) {
  return Base64.encodeURI(JSON.stringify(v));
};

//解码base64
window.base64Decode = function(v) {
  return JSON.parse(Base64.decode(v));
};

//HTML转义
window.HTMLEncode = function(html) {
  var temp = document.createElement("div");
  (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
  var output = temp.innerHTML;
  temp = null;
  return output;
}

//HTML反转义
window.HTMLDecode = function(text) {
  var temp = document.createElement("div");
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})