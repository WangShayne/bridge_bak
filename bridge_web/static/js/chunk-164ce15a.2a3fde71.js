(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-164ce15a"],{"129f":function(n,t){n.exports=Object.is||function(n,t){return n===t?0!==n||1/n===1/t:n!=n&&t!=t}},"841c":function(n,t,e){"use strict";var r=e("d784"),a=e("825a"),c=e("1d80"),i=e("129f"),o=e("14c3");r("search",1,(function(n,t,e){return[function(t){var e=c(this),r=void 0==t?void 0:t[n];return void 0!==r?r.call(t,e):new RegExp(t)[n](String(e))},function(n){var r=e(t,n,this);if(r.done)return r.value;var c=a(n),u=String(this),d=c.lastIndex;i(d,0)||(c.lastIndex=0);var l=o(c,u);return i(c.lastIndex,d)||(c.lastIndex=d),null===l?-1:l.index}]}))},b829:function(n,t,e){"use strict";e.r(t);e("fb6a"),e("841c"),e("ac1f");var r,a,c={name:"AuthRedirect",created:function(){var n=window.location.search.slice(1);window.localStorage&&(window.localStorage.setItem("x-admin-oauth-code",n),window.close())},render:function(n){return n()}},i=c,o=e("2877"),u=Object(o["a"])(i,r,a,!1,null,null,null);t["default"]=u.exports}}]);