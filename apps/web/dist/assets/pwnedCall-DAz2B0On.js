function E(r){function a(d,h){return d<<h|d>>>32-h}function u(d){let h="",A,l;for(A=7;A>=0;A--)l=d>>>A*4&15,h+=l.toString(16);return h}function x(d){d=d.replace(/\r\n/g,`
`);let h="";for(let A=0;A<d.length;A++){const l=d.charCodeAt(A);l<128?h+=String.fromCharCode(l):l>127&&l<2048?(h+=String.fromCharCode(l>>6|192),h+=String.fromCharCode(l&63|128)):(h+=String.fromCharCode(l>>12|224),h+=String.fromCharCode(l>>6&63|128),h+=String.fromCharCode(l&63|128))}return h}let m,e,p;const f=new Array(80);let H=1732584193,S=4023233417,b=2562383102,k=271733878,y=3285377520,c,t,o,n,i,s;r=x(r);const C=r.length,g=[];for(e=0;e<C-3;e+=4)p=r.charCodeAt(e)<<24|r.charCodeAt(e+1)<<16|r.charCodeAt(e+2)<<8|r.charCodeAt(e+3),g.push(p);switch(C%4){case 0:e=2147483648;break;case 1:e=r.charCodeAt(C-1)<<24|8388608;break;case 2:e=r.charCodeAt(C-2)<<24|r.charCodeAt(C-1)<<16|32768;break;case 3:e=r.charCodeAt(C-3)<<24|r.charCodeAt(C-2)<<16|r.charCodeAt(C-1)<<8|128;break}for(g.push(e);g.length%16!=14;)g.push(0);for(g.push(C>>>29),g.push(C<<3&4294967295),m=0;m<g.length;m+=16){for(e=0;e<16;e++)f[e]=g[m+e];for(e=16;e<=79;e++)f[e]=a(f[e-3]^f[e-8]^f[e-14]^f[e-16],1);for(c=H,t=S,o=b,n=k,i=y,e=0;e<=19;e++)s=a(c,5)+(t&o|~t&n)+i+f[e]+1518500249&4294967295,i=n,n=o,o=a(t,30),t=c,c=s;for(e=20;e<=39;e++)s=a(c,5)+(t^o^n)+i+f[e]+1859775393&4294967295,i=n,n=o,o=a(t,30),t=c,c=s;for(e=40;e<=59;e++)s=a(c,5)+(t&o|t&n|o&n)+i+f[e]+2400959708&4294967295,i=n,n=o,o=a(t,30),t=c,c=s;for(e=60;e<=79;e++)s=a(c,5)+(t^o^n)+i+f[e]+3395469782&4294967295,i=n,n=o,o=a(t,30),t=c,c=s;H=H+c&4294967295,S=S+t&4294967295,b=b+o&4294967295,k=k+n&4294967295,y=y+i&4294967295}return s=u(H)+u(S)+u(b)+u(k)+u(y),s.substring(0,5)}async function $(r){const a=E(r).toLocaleUpperCase();try{const m=(await(await fetch(`https://api.pwnedpasswords.com/range/${a}`,{method:"GET",mode:"cors"})).text()).split(`
`).find(e=>e.startsWith(a));if(m){const[e,p]=m.split(":");return`Hash ${e} found with: ${p} records`}else return"No records found"}catch(u){return u=="TypeError: fetch failed"?"Error: Please check your internet connection":`Unexpected error: ${u}`}}export{$ as pwnedCall};
