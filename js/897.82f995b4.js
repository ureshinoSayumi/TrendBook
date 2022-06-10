"use strict";(self["webpackChunkTrendBook"]=self["webpackChunkTrendBook"]||[]).push([[897],{2048:function(a,s,e){e.d(s,{Z:function(){return c}});var t=e(6252),o=e(3577);const r={class:"d-flex mb-3"},i={key:0,class:"tag-block d-flex align-items-center me-3 bg-light"};function l(a,s,e,l,n,d){return(0,t.wg)(),(0,t.iD)("div",r,[e.isSinglePost?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("div",i,[(0,t._)("i",{onClick:s[0]||(s[0]=s=>a.$router.go(-1)),class:"bi bi-arrow-left-square icons-item ms-3 me-3"})])),(0,t._)("div",{class:(0,o.C_)(["tag-block d-flex align-items-center w-100 bg-light",e.isSinglePost?"justify-content-center":""])},[(0,t._)("h2",{class:(0,o.C_)(e.isSinglePost?"text-center":"ps-3")},(0,o.zw)(e.tagText),3)],2)])}var n={props:{tagText:String,isSinglePost:{type:Boolean,default:!0}},data(){return{}},methods:{},mounted(){}},d=e(3744);const m=(0,d.Z)(n,[["render",l],["__scopeId","data-v-39ef2338"]]);var c=m},5897:function(a,s,e){e.r(s),e.d(s,{default:function(){return J}});var t=e(6252),o=e(3577),r=e(9963);const i=a=>((0,t.dD)("data-v-14984e0c"),a=a(),(0,t.Cn)(),a),l={class:"row justify-content-center"},n={class:"col-xl-8 col-md-12"},d={class:"row-button px-3 mt-4"},m={class:"card bg-light p-4"},c={class:"ms-5 me-5"},u={class:"input-icon mt-3 mx-auto"},f={class:"user-img mx-auto"},p=["src"],h={key:1,src:"https://upload.cc/i1/2022/05/31/dVpHNT.png",alt:""},b={class:"user-icon-label mt-3"},g=(0,t.Uk)(" 上傳大頭貼 "),w={key:0,class:"spinner-border spinner-border-sm",role:"status"},y={class:"mt-2"},_=i((()=>(0,t._)("label",{class:"form-label font-customize-style",for:"name"},"暱稱",-1))),D={class:"invalid-feedback mt-2"},v={class:"mt-3"},k=i((()=>(0,t._)("label",{class:"form-label user-radio font-customize-style mb-1"},"性別",-1))),x=i((()=>(0,t._)("label",{class:"form-label font-customize-style me-3",for:"male"},"男性",-1))),P=i((()=>(0,t._)("label",{class:"form-label font-customize-style me-3",for:"female"},"女性",-1))),U=i((()=>(0,t._)("label",{class:"form-label font-customize-style me-3",for:"other"},"其他",-1))),I={class:"mt-3"},z=i((()=>(0,t._)("label",{class:"form-label user-radio mb-1"},"權限",-1))),V=i((()=>(0,t._)("label",{class:"form-label font-customize-style me-3",for:"GM"},"最高權限",-1))),L=i((()=>(0,t._)("label",{class:"form-label font-customize-style me-3",for:"user"},"訪客權限",-1))),C={class:"d-flex align-items-center justify-content-center"},$=["disabled"],T=(0,t.Uk)(" 更改資料 "),S={key:0,class:"spinner-border spinner-border-sm",role:"status"},M={class:"mt-2"},G=i((()=>(0,t._)("label",{class:"form-label font-customize-style",for:"password"},"輸入新密碼",-1))),j={class:"invalid-feedback mt-2"},q={class:"mt-2"},Z=i((()=>(0,t._)("label",{class:"form-label font-customize-style",for:"confirmPassword"},"再次輸入新密碼",-1))),B={class:"invalid-feedback mt-2"},H={class:"d-flex align-items-center justify-content-center"},R=["disabled"],A=(0,t.Uk)(" 更改暱稱 "),E={key:0,class:"spinner-border spinner-border-sm",role:"status"};function W(a,s,e,i,W,Y){const F=(0,t.up)("TagView");return(0,t.wg)(),(0,t.iD)("div",l,[(0,t._)("div",n,[(0,t.Wm)(F,{tagText:"修改個人資料"}),(0,t._)("div",d,[(0,t._)("button",{class:(0,o.C_)(["name"===W.tabsState?"active":"","px-4 pt-2 pb-2"]),onClick:s[0]||(s[0]=a=>Y.changeTabs("name"))}," 暱稱修改 ",2),(0,t._)("button",{class:(0,o.C_)(["password"===W.tabsState?"active":"","px-4 pt-2 pb-2 ms-2"]),onClick:s[1]||(s[1]=a=>Y.changeTabs("password"))}," 重設密碼 ",2)]),(0,t._)("div",m,[(0,t._)("div",c,["name"===W.tabsState?((0,t.wg)(),(0,t.iD)(t.HY,{key:0},[(0,t._)("div",u,[(0,t._)("div",f,[W.fromData.image?((0,t.wg)(),(0,t.iD)("img",{key:0,src:W.userUrl?W.userUrl:W.fromData.image,alt:""},null,8,p)):((0,t.wg)(),(0,t.iD)("img",h))]),(0,t._)("label",b,[g,W.isLoad?((0,t.wg)(),(0,t.iD)("div",w)):(0,t.kq)("",!0),W.isLoad?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("input",{key:1,ref:"fileInput",type:"file",onInput:s[2]||(s[2]=(...a)=>Y.fileReader&&Y.fileReader(...a))},null,544))])]),(0,t._)("div",y,[_,(0,t.wy)((0,t._)("input",{type:"text",class:(0,o.C_)(["form-control mt-1",W.state.name?"is-invalid":""]),id:"name",placeholder:"輸入暱稱","aria-label":"輸入暱稱","aria-describedby":"button-addon2","onUpdate:modelValue":s[3]||(s[3]=a=>W.fromData.name=a),onInput:s[4]||(s[4]=a=>Y.formatVerify())},null,34),[[r.nr,W.fromData.name]]),(0,t._)("div",D,(0,o.zw)(W.errorMessage.name),1)]),(0,t._)("div",v,[k,(0,t.wy)((0,t._)("input",{class:"me-2",id:"male",type:"radio",name:"sex",value:"male","onUpdate:modelValue":s[5]||(s[5]=a=>W.fromData.sex=a)},null,512),[[r.G2,W.fromData.sex]]),x,(0,t.wy)((0,t._)("input",{class:"me-2",id:"female",type:"radio",name:"sex",value:"female","onUpdate:modelValue":s[6]||(s[6]=a=>W.fromData.sex=a)},null,512),[[r.G2,W.fromData.sex]]),P,(0,t.wy)((0,t._)("input",{class:"me-2",id:"other",type:"radio",name:"sex",value:"other","onUpdate:modelValue":s[7]||(s[7]=a=>W.fromData.sex=a)},null,512),[[r.G2,W.fromData.sex]]),U]),(0,t._)("div",I,[z,(0,t.wy)((0,t._)("input",{class:"me-2",id:"GM",type:"radio",name:"auth",value:"1","onUpdate:modelValue":s[8]||(s[8]=a=>W.fromData.auth=a)},null,512),[[r.G2,W.fromData.auth]]),V,(0,t.wy)((0,t._)("input",{class:"me-2",id:"user",type:"radio",name:"auth",value:"","onUpdate:modelValue":s[9]||(s[9]=a=>W.fromData.auth=a)},null,512),[[r.G2,W.fromData.auth]]),L]),(0,t._)("div",C,[(0,t._)("button",{disabled:W.isLoad,class:"btn btn-primary btn-customize mt-4",onClick:s[10]||(s[10]=a=>Y.patchUserData())},[T,W.isLoad?((0,t.wg)(),(0,t.iD)("div",S)):(0,t.kq)("",!0)],8,$)])],64)):((0,t.wg)(),(0,t.iD)(t.HY,{key:1},[(0,t._)("div",M,[G,(0,t.wy)((0,t._)("input",{type:"password",class:(0,o.C_)(["form-control mt-1",W.state.password?"is-invalid":""]),id:"password",placeholder:"輸入密碼","aria-label":"輸入密碼","aria-describedby":"button-addon2","onUpdate:modelValue":s[11]||(s[11]=a=>W.fromData.password=a),onInput:s[12]||(s[12]=a=>Y.formatVerify(!0))},null,34),[[r.nr,W.fromData.password]]),(0,t._)("div",j,(0,o.zw)(W.errorMessage.password),1)]),(0,t._)("div",q,[Z,(0,t.wy)((0,t._)("input",{type:"password",class:(0,o.C_)(["form-control mt-1",W.state.confirmPassword?"is-invalid":""]),id:"confirmPassword",placeholder:"再次輸入新密碼","aria-label":"再次輸入新密碼","aria-describedby":"button-addon2","onUpdate:modelValue":s[13]||(s[13]=a=>W.fromData.confirmPassword=a),onInput:s[14]||(s[14]=a=>Y.formatVerify(!0)),onKeyup:s[15]||(s[15]=(0,r.D2)((a=>Y.changePassword()),["enter"]))},null,34),[[r.nr,W.fromData.confirmPassword]]),(0,t._)("div",B,(0,o.zw)(W.errorMessage.confirmPassword),1)]),(0,t._)("div",H,[(0,t._)("button",{disabled:W.isLoad,class:"btn btn-primary btn-customize mt-4",onClick:s[16]||(s[16]=a=>Y.changePassword())},[A,W.isLoad?((0,t.wg)(),(0,t.iD)("div",E)):(0,t.kq)("",!0)],8,R)])],64))])])])])}var Y=e(2048),F={components:{TagView:Y.Z},data(){return{isLoad:!1,tabsState:"name",userUrl:null,fromData:{name:this.$store.state.userInfo.name,sex:this.$store.state.userInfo.sex||"male",image:this.$store.state.userInfo.image,password:"",confirmPassword:"",auth:this.$store.state.userInfo.auth||""},errorMessage:{name:null,passWord:null,confirmPassword:null,changeError:null},state:{name:null,sex:null,image:null,password:null,confirmPassword:null}}},methods:{changePassword(){if(!this.formatVerify())return;this.isLoad=!0;const a=this.fromData;this.axios.post("https://trend-book-api.herokuapp.com/users/updatePassword",a).then((()=>{this.getUserData(),this.fromData={name:this.$store.state.userInfo.name,sex:this.$store.state.userInfo.sex,image:this.$store.state.userInfo.image,password:"",confirmPassword:"",auth:""},this.isLoad=!1,alert("修改成功")})).catch((a=>{this.isLoad=!1,alert("修改失敗")}))},patchUserData(){if(!this.formatVerify())return;this.isLoad=!0;const a=this.fromData;this.axios.patch("https://trend-book-api.herokuapp.com/users/updateProfile",a).then((()=>{this.getUserData(),this.fromData.password="",this.fromData.confirmPassword="",this.isLoad=!1})).catch((()=>{this.isLoad=!1,alert("修改失敗")}))},getUserData(){this.axios.get("https://trend-book-api.herokuapp.com/users/profile").then((a=>{this.$store.commit("setUserInfo",a.data.data.user)})).catch((()=>{alert("token過期，請先登入")}))},changeTabs(a){this.tabsState=a},fileReader(){if(this.isLoad=!0,"image/jpeg"!==this.$refs.fileInput.files[0].type&&"image/png"!==this.$refs.fileInput.files[0].type)return alert("僅支援 jpg、png 檔，請重新上傳！"),void(this.isLoad=!1);const a=new FormData;a.append("file-to-upload",this.$refs.fileInput.files[0]),this.axios.post("https://trend-book-api.herokuapp.com/upload",a).then((a=>{this.userUrl=a.data.imgUrl,this.fromData.image=a.data.imgUrl,this.patchUserData(),this.isLoad=!1})).catch((()=>{alert("上傳失敗")}))},formatVerify(a){const s=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,e=[];for(const t in this.state)this.state[t]=!1;return this.fromData.name.length<2&&(this.state.name=!0,this.errorMessage.name="暱稱至少 2 個字元以上",e.push("name")),!s.test(this.fromData.password)&&a&&(this.errorMessage.password="密碼需至少 8 碼以上，並中英混合",this.state.password=!0,e.push("signUpError")),this.fromData.confirmPassword===this.fromData.password&&this.fromData.confirmPassword||!a||(this.errorMessage.confirmPassword="與密碼不同",this.state.confirmPassword=!0,e.push("confirmPassword")),0===e.length}},mounted(){}},K=e(3744);const N=(0,K.Z)(F,[["render",W],["__scopeId","data-v-14984e0c"]]);var J=N}}]);
//# sourceMappingURL=897.82f995b4.js.map