import{j as r,T as n}from"./index-C4FCSVmk.js";import{c as o}from"./strengthCheck-Bxas1gIx.js";function c({password:t}){const e=o(t).at(0),s=e=="Very weak"?"red":e=="weak"?"#FF6F00":e=="Average"?"#E18E4A":e=="Strong"?"green":(e=="Very strong","blue");return t&&r.jsxs(n,{style:{fontSize:"17px",fontWeight:"400",fontFamily:"Red Hat Display"},children:["The password is ",r.jsx("span",{style:{color:s},children:e})]})}export{c as default};
