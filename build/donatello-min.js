/**
* Donatello - A pure CSS vector drawing library.
*
* Provided under the MIT license.
* See LICENSE file for full text of the license.
* Copyright 2011 Dan Newcome.
*//**
* Donatello objects are used to represent shapes drawn
* in the scene. The scene consists of a tree of these.
*
* id - id string of an existing DOM element or a reference
* to the DOM element itself.
* x/y, w/h - position and size
*/function Donatello(e,t,n,r,i){this.properties={},this.attrMap={fill:"backgroundColor",stroke:"borderColor","stroke-style":"borderStyle",r:"borderRadius",type:null,children:null,transform:Donatello.getTransform()};if(typeof e=="string"){var s=document.getElementById(e);Donatello.createElement(t,n,r,i,s),this.dom=s}else e!=null&&(this.dom=e)}Donatello.CORRECT_FOR_STROKE=!0,Donatello.getTransform=function(){var e,t=document.createElement("div");return Donatello.transform==undefined?(typeof t.style.transform!="undefined"?e="transform":typeof t.style.webkitTransform!="undefined"?e="webkitTransform":typeof t.style.MozTransform!="undefined"?e="MozTransform":typeof t.style.msTransform!="undefined"?e="msTransform":typeof t.style.OTransform!="undefined"?e="OTransform":e=null,console.log("css transform: "+e),Donatello.transform=e):e=Donatello.transform,e},Donatello.merge=function(e,t){for(var n in e)t[n]=e[n];return t},Donatello.prototype.draw=function(){},Donatello.paper=function(e,t,n,r,i,s){return new Donatello(e,t,n,r,i,s)},Donatello.createLinearGradient=function(e,t,n){e=Math.floor(e/45);var r="center top, center bottom";switch(e){case 0:r="left center, right center";break;case 1:r="left bottom, right top";break;case 2:r="center bottom, center top";break;case 3:r="right bottom, left top";break;case 4:r="right center, left center";break;case 5:r="right top, left bottom";break;case 6:r="center top, center bottom";break;case 7:r="left top, right bottom";break;case 8:r="left center, right center"}var i;switch(Donatello.getTransform()){case"MozTransform":i="-moz-linear-gradient("+e*45+"deg,"+t+", "+n+")";break;case"webkitTransform":i="-webkit-gradient(linear, "+r+", from("+t+"), to("+n+"))";break;case"msTransform":var s=Math.floor(e%4/2);i="progid:DXImageTransform.Microsoft.gradient(GradientType="+s+', startColorstr="'+t+'", endColorstr="'+n+'")';break;case"OTransform":i="-o-linear-gradient("+e*45+"deg,"+t+","+n+")"}return i},Donatello.prototype.rotate=function(e){this.dom.style[Donatello.getTransform()]+="rotate("+e+"deg)"},Donatello.prototype.clear=function(){while(this.dom.hasChildNodes())this.dom.removeChild(this.dom.lastChild)},Donatello.prototype["delete"]=function(){this.dom.parentNode.removeChild(this.dom)},Donatello.prototype.node=function(){return this.dom},Donatello.prototype.parent=function(){return this._parent},Donatello.prototype.attr=function(e){if(e==undefined)return this.properties;Donatello.merge(e,this.properties);var t=this.attrMap;for(attr in e)if(t[attr]!=null)if(attr=="r"||attr=="stroke-width")this.dom.style[t[attr]]=e[attr]+"px";else if(attr=="fill")if(e.fill&&e.fill.length>7){var n=e.fill;this.dom.style.backgroundImage=Donatello.createLinearGradient(n.substr(0,2),n.substr(3,7),n.substr(11,7))}else this.dom.style[t[attr]]=e[attr];else attr!="scale"&&(this.dom.style[t[attr]]=e[attr]);else if(attr!="stroke-width"&&attr!="x"&&attr!="y"&&attr!="w"&&attr!="h"&&attr!="type"&&attr!="children")if(typeof this.styleableElements!="undefined")for(var r=0;r<this.styleableElements.length;r++)console.log("setting "+attr+" to "+e[attr]),this.styleableElements[r].style[attr]=e[attr];else this.dom.style[attr]=e[attr];return this.draw(),this},Donatello.createElement=function(e,t,n,r,i){var s;return typeof i=="string"?s=document.createElement(i):s=i,s.style.position="absolute",s.style.top=t+"px",s.style.left=e+"px",s.style.width=n+"px",s.style.height=r+"px",s},Donatello.attrDefaults=function(e){return e=e||{},e["stroke-width"]===undefined&&(e["stroke-width"]=1),e.stroke||(e.stroke="black"),e.fill||(e.fill="transparent"),e["stroke-style"]||(e["stroke-style"]="solid"),e},Donatello.prototype.rect=function(e,t,n,r,i){return this.pgram(e,t,n,r,null,i)},Donatello.Pgram=function(e,t,n,r,i,s,o){o=Donatello.attrDefaults(o);var u=Donatello.createElement(t,n,r,i,"div"),a=o["stroke-width"],f=o.stroke,l=o.fill,c=o["stroke-style"];this.properties={x:t,y:n,w:r,h:i,skew:s,"stroke-width":a,"stroke-style":c,stroke:f,fill:l},e.dom.appendChild(u),this._parent=e,this.dom=u,this.attr(o)},Donatello.Pgram.prototype=new Donatello(null),Donatello.Pgram.prototype.draw=function(){var e=this.dom,t=this.properties.skew;e.style.borderWidth=this.properties["stroke-width"]+"px",t!=null&&(console.log("setting skew "+t),e.style[Donatello.getTransform()]+="skew("+t+"deg)");if(Donatello.CORRECT_FOR_STROKE){var n=this.properties["stroke-width"];e.style.top=this.properties.y-n/2+"px",e.style.left=this.properties.x-n/2+"px",e.style.width=this.properties.w-n+"px",e.style.height=this.properties.h-n+"px"}else e.style.top=this.properties.y+"px",e.style.left=this.properties.x+"px",e.style.width=this.properties.w+"px",e.style.height=this.properties.h+"px"},Donatello.prototype.pgram=function(e,t,n,r,i,s){return new Donatello.Pgram(this,e,t,n,r,i,s)},Donatello.Circle=function(e,t,n,r,i){i=Donatello.attrDefaults(i);var s=i["stroke-width"],o=i.stroke,u=i.fill,a=i["stroke-style"];this.properties={x:t,y:n,r:r,"stroke-width":s,"stroke-style":a,stroke:o,fill:u};var f=Donatello.createElement(t-r-s,n-r-s,2*r,2*r,"div");e.dom.appendChild(f),this._parent=e,this.dom=f,this.attr(i)},Donatello.Circle.prototype=new Donatello(null),Donatello.prototype.circle=function(e,t,n,r){return new Donatello.Circle(this,e,t,n,r)},Donatello.Circle.prototype.draw=function(){var e=this.properties["stroke-width"],t=this.properties.x,n=this.properties.y,r=this.properties.r,i=this.properties.stroke,s=this.properties.fill,o=this.properties["stroke-style"],u=this.dom;u.style.borderRadius=r+e+"px",u.style.borderWidth=e+"px",u.style.borderStyle=o,u.style.bordercolor=i,u.style.backgroundColor=s,Donatello.CORRECT_FOR_STROKE?(u.style.left=t-r-e/2+"px",u.style.top=n-r-e/2+"px",u.style.width=2*r-e+"px",u.style.height=2*r-e+"px"):(u.style.left=t-r-e+"px",u.style.top=n-r-e+"px")},Donatello.Ellipse=function(e,t,n,r,i,s){s=Donatello.attrDefaults(s);var o=s["stroke-width"],u=s.stroke,a=s.fill,f=s["stroke-style"];this.properties={x:t,y:n,rx:r,ry:i,"stroke-width":o,"stroke-style":f,stroke:u,fill:a};var l=Donatello.createElement(t-r-o,n-i-o,2*r,2*i,"div");e.dom.appendChild(l),this._parent=e,this.dom=l,this.attr(s)},Donatello.Ellipse.prototype=new Donatello(null),Donatello.prototype.ellipse=function(e,t,n,r,i){return new Donatello.Ellipse(this,e,t,n,r,i)},Donatello.Ellipse.prototype.draw=function(){var e=this.properties.x,t=this.properties.y,n=this.properties.r,r=this.properties.rx,i=this.properties.ry,s=this.properties["stroke-width"],o=this.properties.stroke,u=this.properties.fill,a=this.properties["stroke-style"],f=this.dom;f.style.borderRadius=r+s+"px / "+(i+s)+"px",f.style.borderWidth=s+"px",f.style.borderStyle=a,f.style.borderColor=o,f.style.backgroundColor=u,f.style.left=e-r-s+"px",f.style.top=t-i-s+"px"},Donatello.Arc=function(e,t,n,r,i,s,o){o=Donatello.attrDefaults(o);var u=o["stroke-width"],a=o.stroke,f=o.fill,l=o["stroke-style"];this.properties={x:t,y:n,r:r,t1:i,t2:s,"stroke-width":u,"stroke-style":l,stroke:a,fill:f};var c=s,h=Donatello.createElement(t-2*r,n-2*r,2*r,2*r,"div"),p=Donatello.createElement(r-u,r-u,2*r,2*r,"div"),d=Donatello.createElement(r-u,r-u,2*r,2*r,"div"),v=Donatello.createElement(r-u,r-u,2*r,2*r,"div"),m=Donatello.createElement(r-u,r-u,2*r,2*r,"div");h.appendChild(p),h.appendChild(d),h.appendChild(v),h.appendChild(m),this.styleableElements=[p,d,v,m],h.style[Donatello.transform+"Origin"]="100% 100%",e.dom.appendChild(h),this._parent=e,this.dom=h,this.draw(s)},Donatello.Arc.prototype=new Donatello(null),Donatello.prototype.arc=function(e,t,n,r,i,s){return new Donatello.Arc(this,e,t,n,r,i,s)},Donatello.Arc.prototype.draw=function(e){function a(e,n){e.style.borderRadius=r+i+"px",e.style.borderWidth=i+"px",e.style.borderStyle=u,e.style.borderColor=s,e.style.borderBottomColor="transparent",e.style.borderLeftColor="transparent",e.style.borderRightColor="transparent",e.style.backgroundColor=o,t<90?e.style[Donatello.transform]="skew("+ -(90-t)+"deg)rotate("+(n-45)+"deg)":e.style[Donatello.transform]="rotate("+(n-45)+"deg)"}var t=e,n=this.properties.t1;t<90?(this.dom.style.overflow="hidden",this.dom.style[Donatello.transform]="rotate("+(180+n)+"deg)"+"skew("+(90-t)+"deg)"):(this.dom.style.overflow="visible",this.dom.style[Donatello.transform]="rotate("+(180+n)+"deg)"+"skew(0deg)");var r=this.properties.r,i=this.properties["stroke-width"],s=this.properties.stroke,o=this.properties.fill,u=this.properties["stroke-style"];for(var f=0;f<4;f++)a(this.dom.children[f],(t-90)*f/3)},Donatello.Line=function(e,t,n,r,i,s){s=Donatello.attrDefaults(s);var o=s["stroke-width"];this.properties={x:t,y:n,dx:r,dy:i,"stroke-width":o};var u=s.stroke,a=s.fill,f=s["stroke-style"],l=Donatello.createElement(t,n,0,0,"div");this.attrMap["stroke-width"]="borderTopWidth",this.attrMap["stroke-style"]="borderTopStyle",this.attrMap.stroke="borderTopColor",this.dom=l,this._parent=e,this.draw(s),l.style[Donatello.getTransform()+"Origin"]="0px 0px",e.dom.appendChild(l),this.attr(s)},Donatello.Line.prototype=new Donatello(null),Donatello.Line.prototype.draw=function(e){var t=this.properties.x,n=this.properties.y,r=this.properties.dx,i=this.properties.dy,s=this.properties["stroke-width"],o=Math.sqrt(r*r+i*i);this.dom.style.width=o+"px",this.dom.style.height="0px";var u=Math.asin(Math.abs(i)/o);u*=180/Math.PI,r<0&&i>=0?u=180-u:r<0&&i<0?u=180+u:r>=0&&i<0&&(u=360-u),this.dom.style[Donatello.getTransform()]="rotate("+u+"deg) translate(0px, -"+s/2+"px)",this.dom.style.borderTopWidth=s+"px",this.dom.style.left=t+"px",this.dom.style.top=n+"px"},Donatello.prototype.line=function(e,t,n,r,i){return new Donatello.Line(this,e,t,n,r,i)},Donatello.Text=function(e,t,n,r,i){i=Donatello.attrDefaults(i),this.properties={x:t,y:n,str:r};var s=Donatello.createElement(t,n,null,null,"div");this.dom=s,this.draw(),this._parent=e,e.dom.appendChild(s),this.attr(i)},Donatello.Text.prototype=new Donatello(null),Donatello.Text.prototype.draw=function(){this.dom.innerHTML=this.properties.str,this.dom.style.top=this.properties.y+"px",this.dom.style.left=this.properties.x+"px"},Donatello.prototype.text=function(e,t,n,r){return new Donatello.Text(this,e,t,n,r)};