"use strict";(self["webpackChunkTrendBook"]=self["webpackChunkTrendBook"]||[]).push([[391],{8384:function(t,e,o){o.d(e,{Z:function(){return w}});var n=o(6252),s=o(3577);const a=t=>((0,n.dD)("data-v-46454108"),t=t(),(0,n.Cn)(),t),l={class:"card p-4"},i=a((()=>(0,n._)("div",{class:"card-stand"},null,-1))),r={class:"font-customize-style mx-auto"},c={class:"card-stand-p mt-4 mb-2"};function d(t,e,o,a,d,g){return(0,n.wg)(),(0,n.iD)("div",l,[i,(0,n._)("div",r,[(0,n._)("p",c,(0,s.zw)(o.tagText),1)])])}var g={props:{tagText:String},data(){return{}},methods:{},mounted(){}},u=o(3744);const m=(0,u.Z)(g,[["render",d],["__scopeId","data-v-46454108"]]);var w=m},2048:function(t,e,o){o.d(e,{Z:function(){return g}});var n=o(6252),s=o(3577);const a={class:"d-flex mb-3"},l={key:0,class:"tag-block d-flex align-items-center me-3 bg-light"};function i(t,e,o,i,r,c){return(0,n.wg)(),(0,n.iD)("div",a,[o.isSinglePost?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("div",l,[(0,n._)("i",{onClick:e[0]||(e[0]=e=>t.$router.go(-1)),class:"bi bi-arrow-left-square icons-item ms-3 me-3"})])),(0,n._)("div",{class:(0,s.C_)(["tag-block d-flex align-items-center w-100 bg-light",o.isSinglePost?"justify-content-center":""])},[(0,n._)("h2",{class:(0,s.C_)(o.isSinglePost?"text-center":"ps-3")},(0,s.zw)(o.tagText),3)],2)])}var r={props:{tagText:String,isSinglePost:{type:Boolean,default:!0}},data(){return{}},methods:{},mounted(){}},c=o(3744);const d=(0,c.Z)(r,[["render",i],["__scopeId","data-v-39ef2338"]]);var g=d},2391:function(t,e,o){o.r(e),o.d(e,{default:function(){return b}});var n=o(6252),s=o(3577);const a={class:"row justify-content-center"},l={class:"col-xl-8 col-md-12"},i={key:0,class:"content"},r=["src"],c={key:1,class:"mt-1",src:"https://upload.cc/i1/2022/05/31/dVpHNT.png",alt:""},d={class:"ms-3"},g={class:"name"},u={class:"date mt-1"},m={class:"ms-auto"},w=["onClick"];function f(t,e,o,f,p,h){const k=(0,n.up)("TagView"),_=(0,n.up)("AlertView"),v=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",a,[(0,n._)("div",l,[(0,n.Wm)(k,{tagText:"我追蹤的用戶"}),p.loading?((0,n.wg)(),(0,n.j4)(_,{key:0,tagText:"資料載入中..."},null,8,["tagText"])):(0,n.kq)("",!0),p.loading||p.allFollowing.length?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(_,{key:1,tagText:"目前尚無追蹤"})),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(p.allFollowing,(t=>((0,n.wg)(),(0,n.iD)("div",{class:"following-block d-flex flex-column justify-content-center align-items-center bg-light mt-3",key:t._id},[t?((0,n.wg)(),(0,n.iD)("div",i,[(0,n.Wm)(v,{class:"ms-3",to:`/user/${t.user._id}`,href:"#"},{default:(0,n.w5)((()=>[t.user.image?((0,n.wg)(),(0,n.iD)("img",{key:0,class:"mt-1",src:t.user.image,alt:""},null,8,r)):((0,n.wg)(),(0,n.iD)("img",c))])),_:2},1032,["to"]),(0,n._)("div",d,[(0,n.Wm)(v,{to:`/user/${t.user._id}`,href:"#"},{default:(0,n.w5)((()=>[(0,n._)("p",g,(0,s.zw)(t.user.name),1)])),_:2},1032,["to"]),(0,n._)("p",u,"發文時間 "+(0,s.zw)(h.formatDate(t.createdAt)),1)]),(0,n._)("div",m,[(0,n._)("button",{class:"btn btn-primary btn-customize me-4",onClick:e=>h.unfollow(t.user),"data-bs-toggle":"modal","data-bs-target":"#exampleModal"}," 取消追蹤 ",8,w)])])):(0,n.kq)("",!0)])))),128))])])}var p=o(2048),h=o(8384),k={components:{TagView:p.Z,AlertView:h.Z},data(){return{allFollowing:[],loading:!1}},methods:{getFollowing(){this.loading=!0,this.axios.get("https://trend-book-api.herokuapp.com/users/following").then((t=>{this.allFollowing=t.data.data,this.loading=!1})).catch((t=>{alert("token過期，請先登入"),console.log(t,"error")}))},unfollow(t){this.loading=!0,this.axios.delete(`https://trend-book-api.herokuapp.com/users/${t._id}/unfollow`).then((()=>{this.getFollowing(),this.loading=!1})).catch((t=>{console.log(t,"unfollow")}))},formatDate(t){const e=new Date,o=`${e.getFullYear(t)}-${e.getMonth(t)+1}-${e.getDate(t)} ${e.getHours(t)}:${e.getMinutes(t)}:${e.getSeconds(t)}`;return o}},mounted(){this.getFollowing()}},_=o(3744);const v=(0,_.Z)(k,[["render",f],["__scopeId","data-v-101f0fcc"]]);var b=v}}]);
//# sourceMappingURL=391.c7321e65.js.map