(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(1773)}])},1773:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return p},default:function(){return g}});var n=r(5893),s=r(7294),i=r(9008),a=r.n(i),l=r(7484),c=r.n(l);function o(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c()().month(),t=c()().year(),r=c()(new Date(t,e,1)).day(),n=0-r,s=[,,,,,].fill([]).map(()=>Array(7).fill(null).map(()=>(n++,c()(new Date(t,e,n)))));return s}var d=r(5434),x=r(4823);let u=()=>{let{monthIndex:e,setMonthIndex:t}=(0,s.useContext)(x.Z),r=()=>{t(e-1)},i=()=>{t(e+1)};return(0,n.jsxs)("header",{className:"px-4 py-2 flex items-center",children:[(0,n.jsx)("h1",{className:"mr-10 text-xl text-gray-500 fond-bold",children:"Calendar"}),(0,n.jsx)("button",{onClick(){},className:"border rounded py-2 px-4 mr-5",children:"Today"}),(0,n.jsx)("button",{onClick:r,children:(0,n.jsx)("span",{className:"cursor-pointer text-gray-600 mx-2",children:(0,n.jsx)(d.G1X,{})})}),(0,n.jsx)("button",{onClick:i,children:(0,n.jsx)("span",{className:"cursor-pointer text-gray-600 mx-2",children:(0,n.jsx)(d.FNi,{})})}),(0,n.jsx)("h2",{className:"ml-4 text-xl text-gray-500 font-bold",children:c()(new Date(c()().year(),e)).format("MMMM YYYY")})]})},m=e=>{let{day:t,rowIdx:r}=e;return(0,n.jsx)("div",{className:"border border-gray-200 flex flex-col",children:(0,n.jsxs)("header",{className:"flex flex-col items-center",children:[0===r&&(0,n.jsx)("p",{className:"text-sm mt-1",children:t.format("ddd")}),(0,n.jsx)("p",{className:'text-sm p-1 my-1 text-center" '.concat(t.format("DD-MM-YY")===c()().format("DD-MM-YY")?"bg-blue-600 text-white rounded-full w-7":""),children:t.format("DD")})]})})},h=e=>{let{month:t}=e;return(0,n.jsx)("div",{className:"flex-1 grid grid-cols-7 grid-rows-5",children:t.map((e,t)=>(0,n.jsx)(s.Fragment,{children:e.map((e,r)=>(0,n.jsx)(m,{day:e,rowIdx:t},r))},t))})},f="G-KWMLJ6PYMB",j=e=>e.reduce((e,t)=>e+"/"+t,"").slice(1);var p=!0;function g(e){let{events:t,month:r}=e;t.map(e=>({title:e.file.matter.title,date:e.file.matter.start.split(" ")[0],url:e.file.matter.url}));let i=t.filter(e=>new Date(e.file.matter.start)>new Date),[l,c]=s.useState(i),[d,m]=s.useState("".concat(r,"月 本日以降のライブイベント")),[p,g]=(0,s.useState)(o()),{monthIndex:v}=(0,s.useContext)(x.Z);return(0,s.useEffect)(()=>{g(o(v))},[v]),(0,n.jsxs)("div",{children:[(0,n.jsxs)(a(),{children:[(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("script",{async:!0,src:"https://www.googletagmanager.com/gtag/js?id=".concat(f)}),(0,n.jsx)("script",{dangerouslySetInnerHTML:{__html:"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n            gtag('config', '".concat(f,"');\n            ")}})]}),(0,n.jsx)("title",{children:"VTuberライブイベントまとめ | TOP"}),(0,n.jsx)("meta",{name:"description",content:"VTuberのライブイベントをまとめています。今月のライブをカレンダー形式で表示。"}),(0,n.jsx)("meta",{property:"og:title",content:"VTuberライブイベントまとめ | TOP"}),(0,n.jsx)("meta",{property:"og:type",content:"website"}),(0,n.jsx)("meta",{property:"og:url",content:"https://v-event.wedio.jp"}),(0,n.jsx)("meta",{property:"og:image",content:"https://v-event.wedio.jp/img/top.png"}),(0,n.jsx)("meta",{property:"og:site_name",content:"VTuberライブイベントまとめ"}),(0,n.jsx)("meta",{property:"og:description",content:"VTuberのライブイベントをまとめています。今月のライブをカレンダー形式で表示。"}),(0,n.jsx)("meta",{name:"twitter:card",content:"summary"})]}),(0,n.jsx)("main",{children:(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{children:"メイカーイベントまとめ"}),(0,n.jsx)(u,{}),(0,n.jsx)("div",{className:"flex flex-1",children:(0,n.jsx)(h,{month:p})}),(0,n.jsx)("div",{children:(0,n.jsx)("div",{children:(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{children:d}),(0,n.jsx)("div",{children:l.length>0?l.map(e=>(0,n.jsx)("div",{children:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{children:[e.file.matter.start,"~"]}),(0,n.jsx)("div",{children:e.file.matter.title}),(0,n.jsxs)("div",{children:["出演者: ",j(e.file.matter.actors)]}),(0,n.jsxs)("div",{children:["場所: ",j(e.file.matter.places)]})]}),(0,n.jsx)("div",{children:(0,n.jsx)("div",{children:"公式ページはこちら"})})]})},e.file.id)):(0,n.jsx)("div",{children:"予定されているイベントはないようです (T_T) "})})]})})})]})}),(0,n.jsx)("footer",{children:(0,n.jsx)("div",{children:(0,n.jsx)("a",{href:"https://forms.gle/jkD83bLYVrRbnCca6",children:(0,n.jsx)("div",{children:"お問い合わせ"})})})})]})}},9008:function(e,t,r){e.exports=r(3121)},8357:function(e,t,r){"use strict";r.d(t,{w_:function(){return c}});var n=r(7294),s={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=n.createContext&&n.createContext(s),a=function(){return(a=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)},l=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)0>t.indexOf(n[s])&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(r[n[s]]=e[n[s]]);return r};function c(e){return function(t){return n.createElement(o,a({attr:a({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,a({key:r},t.attr),e(t.child))})}(e.child))}}function o(e){var t=function(t){var r,s=e.attr,i=e.size,c=e.title,o=l(e,["attr","size","title"]),d=i||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,s,o,{className:r,style:a(a({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),c&&n.createElement("title",null,c),e.children)};return void 0!==i?n.createElement(i.Consumer,null,function(e){return t(e)}):t(s)}}},function(e){e.O(0,[228,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);