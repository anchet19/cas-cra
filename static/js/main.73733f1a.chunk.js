(this["webpackJsonpcas-cra"]=this["webpackJsonpcas-cra"]||[]).push([[0],{22:function(e,t,a){},24:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a.n(n),r=a(15),s=a.n(r),i=(a(22),a(8)),o=a(16),u=a(2),l=a.n(u),d=a(6),j=a(5),p=(a(24),{LOSS:10,ADD:3,TRADE:10,ID:"741497602050265088",WEEKS:14}),b=a(28),h=a(31),f=a(30),O=a(29),m=a(32),x=a(0),v="https://api.sleeper.app/v1";function g(){return _.apply(this,arguments)}function _(){return(_=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(v,"/league/").concat(p.ID)).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return y.apply(this,arguments)}function y(){return(y=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(v,"/league/").concat(p.ID,"/rosters")).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){return N.apply(this,arguments)}function N(){return(N=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(v,"/league/").concat(p.ID,"/users")).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return D.apply(this,arguments)}function D(){return(D=Object(j.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(v,"/league/").concat(p.ID,"/transactions/").concat(t)).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(e){return T.apply(this,arguments)}function T(){return(T=Object(j.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(v,"/league/").concat(p.ID,"/matchups/").concat(t)).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(){return C.apply(this,arguments)}function C(){return(C=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(v,"/state/nfl")).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var I="trade",L="waiver",P="free_agent";var $=function(){var e=Object(n.useState)({}),t=Object(d.a)(e,2),a=(t[0],t[1]),c=Object(n.useState)([]),r=Object(d.a)(c,2),s=r[0],u=r[1],v=Object(n.useState)([]),_=Object(d.a)(v,2),y=_[0],N=_[1],D=Object(n.useState)({}),T=Object(d.a)(D,2),C=T[0],$=T[1],F=Object(n.useState)({}),W=Object(d.a)(F,2),K=W[0],R=W[1],B=Object(n.useState)(1),J=Object(d.a)(B,2),M=J[0],q=J[1],z=Object(n.useState)(new Array(5).fill(0).map((function(e,t){return t+1}))),G=Object(d.a)(z,2),H=G[0],Q=G[1];function U(){return(U=Object(j.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:q(t);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){Object(j.a)(l.a.mark((function e(){var t,n,c,r,s,i,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([g(),w(),k(),A()]);case 2:t=e.sent,n=Object(d.a)(t,4),c=n[0],r=n[1],s=n[2],i=n[3],a(c),$(i),"regular"===i.season_type&&q(i.leg),o=s.map((function(e){var t=e.user_id,a=e.display_name,n=e.metadata,c=n.team_name,s=n.avatar,i=r.find((function(e){return e.owner_id===t})),o=i.roster_id,u=i.settings,l=u.wins,d=u.losses,j=u.ties;return{user_id:t,roster_id:o,avatar:s,display_name:a,team_name:c,wins:l,losses:d,ties:j}})),N(o.sort((function(e,t){return e.roster_id-t.roster_id})));case 13:case"end":return e.stop()}}),e)})))()}),[]),Object(n.useEffect)((function(){if(C.season_start_date){var e=Object(b.a)(C.season_start_date),t=Object(O.a)(e,M-1),a={start:Object(h.a)(t),end:Object(m.a)(t)},n=[S(M)];M>1?n.push(S(M-1)):n.push(Promise.resolve([])),Object(j.a)(l.a.mark((function e(){var t,c,r,s,d,j,p;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([E(M)].concat(n));case 2:t=e.sent,c=Object(o.a)(t),r=c[0],s=c.slice(1),d=s.flat(),j=r.reduce((function(e,t){var a=t.matchup_id,n=t.points,c=t.roster_id,r=e[a];return r&&r.points!==n?e[a]=r.points<n?r:{roster_id:c,points:n}:r?delete e[a]:e[a]={roster_id:c,points:n},e}),{}),u(Object.values(j)),p=d.reduce((function(e,t){var n=t.adds,c=t.status,r=t.type,s=t.status_updated;if("complete"!==c||!n)return e;var o=new Date(s);if(!Object(f.a)(o,a))return e;switch(r){case L:case P:Object.values(n).forEach((function(t){var a,n=null!==(a=e[t])&&void 0!==a?a:{adds:0,trades:0};e[t]=Object(i.a)(Object(i.a)({},n),{},{adds:n.adds?n.adds+1:1})}));break;case I:Object.values(n).forEach((function(t){var a,n=null!==(a=e[t])&&void 0!==a?a:{adds:0,trades:0};e[t]=Object(i.a)(Object(i.a)({},n),{},{trades:n.trades?n.trades+1:1})}))}return e}),{}),R(p);case 11:case"end":return e.stop()}}),e)})))()}}),[M,C.season_start_date]),Object(x.jsxs)("div",{className:"container-fluid",children:[Object(x.jsx)("div",{className:"table-responsive",children:Object(x.jsxs)("table",{className:"table caption-top",children:[Object(x.jsxs)("caption",{children:[Object(x.jsx)("strong",{children:"Weekly Costs Summary:"}),Object(x.jsx)("br",{}),Object(x.jsx)("span",{children:"The Loss column is calculated based on the current state of the weeks matchup. Check back after the week has ended for the most accurate results."})]}),Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{className:"table-dark",children:[Object(x.jsx)("th",{className:"avatar"}),Object(x.jsx)("th",{scope:"col",children:"Team"}),Object(x.jsx)("th",{scope:"col",children:"Record"}),Object(x.jsx)("th",{scope:"col",children:"Adds ($3/ea)"}),Object(x.jsx)("th",{scope:"col",children:"Trades ($10/ea)"}),Object(x.jsx)("th",{scope:"col",children:"Loss"}),Object(x.jsx)("th",{scope:"col",children:"Total"})]})}),Object(x.jsx)("tbody",{children:y.map((function(e){var t,a=e.avatar,n=e.roster_id,c=e.display_name,r=e.team_name,i=e.wins,o=e.losses,u=e.ties,l=null!==(t=K[n])&&void 0!==t?t:{adds:0,trades:0},d=l.adds,j=l.trades,b=d*p.ADD,h=j*p.TRADE,f=s.find((function(e){return n===e.roster_id}))?1:0;return{avatar:a,header:null!==r&&void 0!==r?r:"Team ".concat(c),sub_header:"@".concat(c),roster_id:n,loss:f,record:"".concat(i,"-").concat(o,"-").concat(u),adds:d,adds_total:b,trades:j,trades_total:h,total:b+h+f*p.LOSS}})).map((function(e){return Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{className:"avatar",children:e.avatar&&Object(x.jsx)("img",{alt:"".concat(e.header," avatar"),src:e.avatar})}),Object(x.jsxs)("th",{className:"align-middle",scope:"row",children:[Object(x.jsx)("span",{children:e.header}),Object(x.jsx)("br",{}),Object(x.jsx)("span",{children:e.sub_header})]}),Object(x.jsx)("td",{className:"align-middle",children:e.record}),Object(x.jsxs)("td",{className:"align-middle",children:["$",e.adds_total," (",e.adds,")"]}),Object(x.jsxs)("td",{className:"align-middle",children:["$",e.trades_total," (",e.trades,")"]}),Object(x.jsxs)("td",{className:"align-middle",children:["$",e.loss*p.LOSS]}),Object(x.jsxs)("td",{className:"align-middle",children:["$",e.total]})]},e.roster_id)}))})]})}),Object(x.jsx)("div",{className:"content",children:Object(x.jsx)("nav",{"aria-label":"Table pagination",children:Object(x.jsxs)("ul",{className:"pagination",children:[Object(x.jsx)("li",{className:"page-item ".concat(1===H[0]?"disabled":""),children:Object(x.jsx)("button",{className:"page-link",onClick:function(){var e=H[0]-5,t=H[0]-1;Q(new Array(5).fill(0).map((function(t,a){return e+a}))),q(t)},"aria-label":"Previous",children:Object(x.jsx)("span",{"aria-hidden":"true",children:"\xab"})})}),H.map((function(e){var t={className:"page-item"};return M===e&&(t.className="".concat(t.className," active"),t["aria-current"]="page"),Object(x.jsx)("li",Object(i.a)(Object(i.a)({},t),{},{children:Object(x.jsx)("button",{className:"page-link",onClick:function(){!function(e){U.apply(this,arguments)}(e)},children:e},"page-link-".concat(e))}),"page-item-".concat(e))})),Object(x.jsx)("li",{className:"page-item ".concat(H[H.length-1]===p.WEEKS?"disabled":""),children:Object(x.jsx)("button",{className:"page-link",onClick:function(){var e="regular"===C.season.type?C.leg:p.WEEKS,t=H[H.length-1]+1;Q(new Array(5>e+1-t?e+1-t:5).fill(0).map((function(e,a){return t+a}))),q(t)},"aria-label":"Next",children:Object(x.jsx)("span",{"aria-hidden":"true",children:"\xbb"})})})]})})})]})},F=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,33)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))};a(26);s.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)($,{})}),document.getElementById("root")),F()}},[[27,1,2]]]);
//# sourceMappingURL=main.73733f1a.chunk.js.map