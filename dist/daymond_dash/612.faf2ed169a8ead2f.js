"use strict";(self.webpackChunkdaymond_dash=self.webpackChunkdaymond_dash||[]).push([[612],{8612:(G,c,s)=>{s.r(c),s.d(c,{AuthModule:()=>y});var a=s(177),d=s(8029),r=s(4341),u=s(8032),m=s.n(u),i=s(4438),h=s(1626),v=s(4989);let b=(()=>{class t{constructor(o,n){this.http=o,this.configService=n,this.url="",this.url=this.configService.get("HOST:API")}login(o){return this.http.post(this.configService.getApi("LOGIN_ADMIN"),o,{observe:"response"})}static{this.\u0275fac=function(n){return new(n||t)(i.KVO(h.Qq),i.KVO(v.M))}}static{this.\u0275prov=i.jDH({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var F=s(6883);const g=t=>({"is-invalid":t});function I(t,l){1&t&&(i.j41(0,"div",14),i.EFF(1," Un email valide est requis "),i.k0s())}function C(t,l){1&t&&(i.j41(0,"div",14),i.EFF(1," Mot de passe requis "),i.k0s())}function S(t,l){1&t&&(i.j41(0,"span",15),i.EFF(1,"CONFIRMER"),i.k0s())}function w(t,l){1&t&&i.nrm(0,"span",18)}function x(t,l){if(1&t&&(i.j41(0,"span",16),i.EFF(1,"Veuillez patienter... "),i.DNE(2,w,1,0,"span",17),i.k0s()),2&t){const o=i.XpG();i.R7$(2),i.Y8G("ngIf",o.loading)}}let p=(()=>{class t{constructor(o,n,e,f){this.formBuilder=o,this.authService=n,this.router=e,this.utilisService=f,this.loading=!1,this.submitted=!1,this.error=""}ngOnInit(){this.initForm()}initForm(){this.loginForm=this.formBuilder.group({email:new r.MJ("",[r.k0.required]),password:new r.MJ("",[r.k0.required])})}onSubmit(){this.submitted=!0,console.log("form submitted",this.loginForm.value),console.log("form submitted",this.loginForm.errors),this.loginForm.invalid?(m().fire({position:"center",icon:"warning",title:"Veuillez renseigner tous les champs",showConfirmButton:!1,timer:1500}),this.loading=!1):(this.loading=!0,this.signinAdmin(this.loginForm.value))}signinAdmin(o){console.log("login admin",o),this.authService.login(o).subscribe({next:n=>{console.log("=LA DATA=",n),this.utilisService.response(n,e=>{console.log(e),204==n.status?(this.loading=!1,m().fire({position:"center",icon:"warning",title:"Identifiants incorrects",showConfirmButton:!1,timer:1500})):(localStorage.setItem("user_info",JSON.stringify(e.data)),this.router.navigate(["/orders"]))})},error:n=>{this.utilisService.response(n,e=>{this.loading=!1,console.log("erreur",e?.error?.message),m().fire({position:"center",icon:"warning",title:e.error.message,showConfirmButton:!1,timer:1500})})}})}static{this.\u0275fac=function(n){return new(n||t)(i.rXU(r.ok),i.rXU(b),i.rXU(d.Ix),i.rXU(F.M))}}static{this.\u0275cmp=i.VBU({type:t,selectors:[["app-sign-in"]],decls:20,vars:12,consts:[[1,"page_entier"],["src","assets/img/profil/logo_so.png","alt","","height","30","routerLink","/",2,"margin-right","10px","position","fixed","left","50px","top","50px"],[2,"text-transform","uppercase","font-weight","bolder","color","white","text-align","center","padding-top","100px"],[1,"mb-0",2,"text-align","center","color","white"],[2,"max-width","500px","width","90%","height","400px","background-color","#d9d9ff","border","2px solid white","border-radius","10px","margin","0 auto","margin-top","30px","display","flex","flex-direction","column","align-items","center","justify-content","center","padding-left","20px","padding-right","20px",3,"ngSubmit","formGroup"],[1,"form-group",2,"width","100%"],["for","email"],["type","email","formControlName","email","id","email","placeholder","Email",1,"form-control",2,"border","1px solid black","width","100%",3,"ngClass"],["class","invalid-feedback","style","color: red",4,"ngIf"],["for","password"],["type","password","formControlName","password","id","password","placeholder","Code D'acc\xe8s",1,"form-control",2,"border","1px solid black","width","100%",3,"ngClass"],["type","submit",1,"btn",2,"margin-top","90px","background-color","#ff9500","color","white","padding-left","70px","padding-right","70px",3,"disabled"],["class","indicator-label fs-6",4,"ngIf"],["class","indicator-progress",4,"ngIf"],[1,"invalid-feedback",2,"color","red"],[1,"indicator-label","fs-6"],[1,"indicator-progress"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(n,e){1&n&&(i.j41(0,"div",0),i.nrm(1,"img",1),i.j41(2,"h1",2),i.EFF(3," Bienvenue CHEZ DAYMOND "),i.k0s(),i.j41(4,"p",3),i.EFF(5," Connectez-vous \xe0 votre compte "),i.k0s(),i.j41(6,"form",4),i.bIt("ngSubmit",function(){return e.onSubmit()}),i.j41(7,"div",5)(8,"label",6),i.EFF(9,"Entrez votre adresse mail"),i.k0s(),i.nrm(10,"input",7),i.DNE(11,I,2,0,"div",8),i.k0s(),i.j41(12,"div",5)(13,"label",9),i.EFF(14,"Entrez mot de passe"),i.k0s(),i.nrm(15,"input",10),i.DNE(16,C,2,0,"div",8),i.k0s(),i.j41(17,"button",11),i.DNE(18,S,2,0,"span",12)(19,x,3,1,"span",13),i.k0s()()()),2&n&&(i.R7$(6),i.Y8G("formGroup",e.loginForm),i.R7$(4),i.Y8G("ngClass",i.eq3(8,g,e.submitted&&e.loginForm.controls.email.errors)),i.R7$(),i.Y8G("ngIf",e.submitted&&e.loginForm.controls.email.errors),i.R7$(4),i.Y8G("ngClass",i.eq3(10,g,e.submitted&&e.loginForm.controls.password.errors)),i.R7$(),i.Y8G("ngIf",e.submitted&&e.loginForm.controls.password.errors),i.R7$(),i.Y8G("disabled",e.loading),i.R7$(),i.Y8G("ngIf",!e.loading),i.R7$(),i.Y8G("ngIf",e.loading))},dependencies:[a.YU,a.bT,d.Wk,r.qT,r.me,r.BC,r.cb,r.j4,r.JD],styles:[".page_entier[_ngcontent-%COMP%]{width:100%;height:100vh;background-color:#814e05;position:fixed;top:0;left:0;z-index:99999999}"]})}}return t})();var E=s(3887);const k=[{path:"",component:p},{path:"sign_in",component:p}];let y=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275mod=i.$C({type:t})}static{this.\u0275inj=i.G2t({imports:[a.MD,E.G,d.iI.forChild(k)]})}}return t})()}}]);