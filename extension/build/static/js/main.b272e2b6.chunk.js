(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(n,e,o){n.exports=o(21)},17:function(n,e,o){},21:function(n,e,o){"use strict";o.r(e);var t,c,r=o(0),l=o.n(r),s=o(8),a=o.n(s),i=(o(17),o(2)),u=o(3),g=o(4),f=g.a.div(t||(t=Object(u.a)(["\n  \n"])));g.a.div(c||(c=Object(u.a)(["\n    border-style: solid;\n    border-width: thin;\n    border-radius: 5%;\n\n\n"])));chrome.storage.sync.get(["mode"],function(n){console.log("DA mode is currently "+n.mode)});var d=function(){var n=Object(r.useState)([]),e=Object(i.a)(n,2),o=e[0],t=e[1],c=function(n){console.log(n),t(function(e){return e.concat(n)}),console.log(o)},s=Object(r.useState)([]),a=Object(i.a)(s,2),u=a[0],g=a[1],d=function(n){g(function(e){return e.concat(n)})},m=Object(r.useState)([]),h=Object(i.a)(m,2),b=h[0],v=h[1],j=function(n){v(function(e){return e.concat(n)})};return Object(r.useEffect)(function(){chrome.storage.sync.get(["currentURL"],function(n){console.log("currentURL is "),console.log(n.currentURL);for(var e=0;e<n.currentURL.length;e++)c(n.currentURL[e]),console.log(o)}),chrome.storage.sync.get(["names"],function(n){console.log("'names' is "),console.log(n.names);for(var e=0;e<n.names.length;e++)d(n.names[e]),console.log(u)}),chrome.storage.sync.get(["icons"],function(n){console.log("'icons' is "),console.log(n.icons);for(var e=0;e<n.icons.length;e++)j(n.icons[e]),console.log(b)})},[]),l.a.createElement(f,null,function(n,e,o){for(var t=[],c=0;c<n.length;c++){var r=n[c],s=e[c],a=o[c];t.push({id:c,title:s,url:r,icon:a})}console.log(t);for(var i=[],u=0,g=t;u<g.length;u++){var f=g[u];i.push(l.a.createElement("li",{key:f.id},l.a.createElement("img",{src:f.icon,width:"20",height:"20"})," ",f.title,", ",f.url))}return i}(o,u,b))};a.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(d,null)),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.b272e2b6.chunk.js.map