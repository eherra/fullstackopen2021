(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{41:function(e,n,t){"use strict";t.r(n);var r=t(17),c=t.n(r),a=t(8),o=t(3),u=t(2),i=t(0),s=function(e){return Object(i.jsxs)("div",{children:["filter shown with",Object(i.jsx)("input",{value:e.value,onChange:e.handleChange})]})},d=function(e){return Object(i.jsxs)("form",{onSubmit:e.submit,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(i.jsx)("button",{type:"submit",children:"add"})]})},l=function(e){var n=e.personsToShow,t=e.handlePersonDelete;return Object(i.jsx)("div",{children:n.map((function(e){return Object(i.jsxs)("p",{children:[e.name," ",e.number," ",Object(i.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.name)}))})},b=function(e){var n=e.message,t={color:e.isError?"red":"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return null===n?null:Object(i.jsx)("div",{style:t,children:n})},h=t(4),j=t.n(h),f="/api/persons",m=function(){return j.a.get(f).then((function(e){return e.data}))},O=function(e){return j.a.post(f,e).then((function(e){return e.data}))},p=function(e,n){return j.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},x=function(e){return j.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(u.useState)(""),h=Object(o.a)(c,2),j=h[0],f=h[1],v=Object(u.useState)(""),g=Object(o.a)(v,2),w=g[0],C=g[1],S=Object(u.useState)(""),y=Object(o.a)(S,2),N=y[0],k=y[1],D=Object(u.useState)(null),E=Object(o.a)(D,2),A=E[0],P=E[1],T=Object(u.useState)(!1),B=Object(o.a)(T,2),I=B[0],J=B[1];Object(u.useEffect)((function(){m().then((function(e){r(e)}))}),[]);var L=""===N?t:t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())})),z=function(e){P(e),setTimeout((function(){P(null)}),3e3)};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(b,{message:A,isError:I}),Object(i.jsx)(s,{value:N,handleChange:function(e){k(e.target.value)}}),Object(i.jsx)("h2",{children:"Add a new"}),Object(i.jsx)(d,{submit:function(e){if(e.preventDefault(),t.some((function(e){return e.name===j}))){if(window.confirm("".concat(j," is already added to phonebook, replace the old number with new one?"))){var n=t.find((function(e){return e.name===j})),c=Object(a.a)(Object(a.a)({},n),{},{number:w});p(c.id,c).then((function(e){r(t.map((function(e){return e.name!==j?e:c}))),J(!1),z("Updated ".concat(e.name))}))}return f(""),void C("")}O({name:j,number:w}).then((function(e){r(t.concat(e)),f(""),C(""),J(!1),z("Added ".concat(e.name))})).catch((function(e){J(!0),z("".concat(e.response.data.error))}))},newName:j,newNumber:w,handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){C(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(l,{personsToShow:L,handlePersonDelete:function(e){window.confirm("Are you sure you want to delete ".concat(e.name))&&x(e.id).then((function(n){r(t.filter((function(n){return n.id!==e.id}))),J(!1),z("Deleted ".concat(e.name))})).catch((function(n){J(!0),z("Information of '".concat(e.name,"' has already been removed from server")),r(t.filter((function(n){return n.id!==e.id})))}))}})]})};c.a.render(Object(i.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.7a68fc66.chunk.js.map