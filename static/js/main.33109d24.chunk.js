(this["webpackJsonpcas-cra"]=this["webpackJsonpcas-cra"]||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),c=n(7),s=n.n(c),o=(n(12),n(5)),i=n(1),u=n.n(i),d=n(4),l=n(3),p=(n(14),{LOSS:10,ADD:3,TRADE:10,ID:"598360399619874816",WEEKS:14}),h=n(0),j="https://api.sleeper.app/v1";function f(){return b.apply(this,arguments)}function b(){return(b=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(j,"/league/").concat(p.ID)).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return m.apply(this,arguments)}function m(){return(m=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(j,"/league/").concat(p.ID,"/rosters")).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return v.apply(this,arguments)}function v(){return(v=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(j,"/league/").concat(p.ID,"/users")).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){return _.apply(this,arguments)}function _(){return(_=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(j,"/league/").concat(p.ID,"/transactions/").concat(t)).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e){return g.apply(this,arguments)}function g(){return(g=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(j,"/league/").concat(p.ID,"/matchups/").concat(t)).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){return S.apply(this,arguments)}function S(){return(S=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(j,"/state/nfl")).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var D="trade",E="waiver",I="free_agent";var N=function(){var e=Object(r.useState)({}),t=Object(d.a)(e,2),n=(t[0],t[1]),a=Object(r.useState)([]),c=Object(d.a)(a,2),s=c[0],i=c[1],j=Object(r.useState)([]),b=Object(d.a)(j,2),m=b[0],v=b[1],_=Object(r.useState)({}),g=Object(d.a)(_,2),S=(g[0],g[1]),N=Object(r.useState)({}),T=Object(d.a)(N,2),L=T[0],A=T[1];function C(){return(C=Object(l.a)(u.a.mark((function e(t){var n,r,a,c,s,l,p;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target.value,!Number.isNaN(+n)){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,Promise.all([w(n),y(n)]);case 5:r=e.sent,a=Object(d.a)(r,2),c=a[0],s=a[1],l=s.reduce((function(e,t){var n=t.matchup_id,r=t.points,a=t.roster_id,c=e[n];return c&&c.points!==r?e[n]=c.points<r?c:{roster_id:a,points:r}:c?delete e[n]:e[n]={roster_id:a,points:r},e}),{}),i(Object.values(l)),p=c.reduce((function(e,t){var n=t.adds,r=t.status,a=t.type;if("complete"!==r||!n)return e;switch(a){case E:case I:Object.values(n).forEach((function(t){var n,r=null!==(n=e[t])&&void 0!==n?n:{adds:0,trades:0};e[t]=Object(o.a)(Object(o.a)({},r),{},{adds:r.adds?r.adds+1:1})}));break;case D:Object.values(n).forEach((function(t){var n,r=null!==(n=e[t])&&void 0!==n?n:{adds:0,trades:0};e[t]=Object(o.a)(Object(o.a)({},r),{},{trades:r.trades?r.trades+1:1})}))}return e}),{}),A(p);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useEffect)((function(){Object(l.a)(u.a.mark((function e(){var t,r,a,c,s,o,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([f(),O(),x(),k()]);case 2:t=e.sent,r=Object(d.a)(t,4),a=r[0],c=r[1],s=r[2],o=r[3],n(a),S(o),i=s.map((function(e){var t=e.user_id,n=e.display_name,r=e.metadata.team_name,a=c.find((function(e){return e.owner_id===t})),s=a.roster_id,o=a.settings,i=o.wins,u=o.losses,d=o.ties;return{user_id:t,roster_id:s,display_name:n,team_name:r,wins:i,losses:u,ties:d}})),v(i.sort((function(e,t){return e.roster_id-t.roster_id})));case 12:case"end":return e.stop()}}),e)})))()}),[]),Object(h.jsx)("div",{className:"container",children:Object(h.jsxs)("div",{className:"content",children:[Object(h.jsxs)("div",{className:"select-wrapper",children:[Object(h.jsx)("label",{htmlFor:"leg",children:"Week: "}),Object(h.jsxs)("select",{name:"leg",onChange:function(e){return C.apply(this,arguments)},children:[Object(h.jsx)("option",{disabled:!0,selected:!0,value:"placeholder",children:"Select a Week"},"placeholder"),new Array(p.WEEKS).fill(0).map((function(e,t){return Object(h.jsx)("option",{value:t+1,children:t+1},t+1)}))]})]}),Object(h.jsxs)("table",{children:[Object(h.jsxs)("caption",{children:[Object(h.jsx)("strong",{className:"caption-heading",children:"Weekly Costs Summary:"}),Object(h.jsx)("br",{}),Object(h.jsx)("span",{className:"caption-summary",children:"The Loss column is calculated based on the current state of the weeks matchup. Check back after the week has ended for the most accurate results."})]}),Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Team"}),Object(h.jsx)("th",{children:"Record"}),Object(h.jsx)("th",{children:"Adds ($3/ea)"}),Object(h.jsx)("th",{children:"Trades ($10/ea)"}),Object(h.jsx)("th",{children:"Loss"}),Object(h.jsx)("th",{children:"Total"})]})}),Object(h.jsx)("tbody",{children:(console.log(s),m.map((function(e){var t,n=e.roster_id,r=e.display_name,a=e.team_name,c=e.wins,o=e.losses,i=e.ties,u=null!==(t=L[n])&&void 0!==t?t:{adds:0,trades:0},d=u.adds,l=u.trades,h=d*p.ADD,j=l*p.TRADE,f=s.find((function(e){return n===e.roster_id}))?1:0;return{header:null!==a&&void 0!==a?a:r,loss:f,record:"".concat(c,"-").concat(o,"-").concat(i),adds:d,adds_total:h,trades:l,trades_total:j,total:h+j+f*p.LOSS}}))).map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{scope:"row",children:e.header}),Object(h.jsx)("td",{children:e.record}),Object(h.jsxs)("td",{children:["$",e.adds_total," (",e.adds,")"]}),Object(h.jsxs)("td",{children:["$",e.trades_total," (",e.trades,")"]}),Object(h.jsxs)("td",{children:["$",e.loss*p.LOSS]}),Object(h.jsxs)("td",{children:["$",e.total]})]},e.roster_id)}))})]})]})})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};s.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(N,{})}),document.getElementById("root")),T()}},[[16,1,2]]]);
//# sourceMappingURL=main.33109d24.chunk.js.map