(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/countdown/countdown"],{4461:function(t,n,e){"use strict";e.r(n);var o=e("edd2"),u=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=u.a},5436:function(t,n,e){},"6bc6":function(t,n,e){"use strict";e.r(n);var o=e("d354"),u=e("4461");for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);e("8c34");var a,r=e("f0c5"),l=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=l.exports},"8c34":function(t,n,e){"use strict";var o=e("5436"),u=e.n(o);u.a},d354:function(t,n,e){"use strict";var o,u=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",function(){return u}),e.d(n,"c",function(){return i}),e.d(n,"a",function(){return o})},edd2:function(t,n,e){"use strict";var o;function u(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=(o={name:"tuiCountdown",props:{width:{type:Number,default:24},height:{type:Number,default:24},bcolor:{type:String,default:"#333"},bgcolor:{type:String,default:"#fff"},size:{type:Number,default:26},color:{type:String,default:"#333"},scale:{type:Boolean,default:!1},colonSize:{type:Number,default:28},colonColor:{type:String,default:"#333"},time:{type:Number,default:0},days:{type:Boolean,default:!1},hours:{type:Boolean,default:!0},minutes:{type:Boolean,default:!0},seconds:{type:Boolean,default:!0},isColon:{type:Boolean,default:!0}},data:function(){return{countdown:null,h:"00",i:"00",s:"00"}},watch:{time:function(t){clearInterval(this.countdown),this.doLoop()}}},u(o,"data",function(){return{countdown:null,d:"0",h:"00",i:"00",s:"00"}}),u(o,"created",function(){this.doLoop()}),u(o,"beforeDestroy",function(){clearInterval(this.countdown),this.countdown=null}),u(o,"methods",{endOfTime:function(){clearInterval(this.countdown),this.countdown=null,this.$emit("end",{})},doLoop:function(){var t=this,n=this.time||0;this.countDown(n),this.countdown=setInterval(function(){n--,n<0?t.endOfTime():t.countDown(n)},1e3)},countDown:function(t){var n=0,e=0,o=0,u=0;t>0?(n=this.days?Math.floor(t/86400):0,e=Math.floor(t/3600)-24*n,o=Math.floor(t/60)-60*e-24*n*60,u=Math.floor(t)-24*n*60*60-60*e*60-60*o):this.endOfTime(),e=e<10?"0"+e:e,o=o<10?"0"+o:o,u=u<10?"0"+u:u,this.d=n,this.h=e,this.i=o,this.s=u}}),o);n.default=i}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/countdown/countdown-create-component',
    {
        'components/countdown/countdown-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6bc6"))
        })
    },
    [['components/countdown/countdown-create-component']]
]);