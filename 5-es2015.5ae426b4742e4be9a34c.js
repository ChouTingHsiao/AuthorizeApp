(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{XpXM:function(t,e,n){"use strict";n.r(e),n.d(e,"MainModule",function(){return Zt});var a=n("ofXK"),o=n("3Pt+"),i=n("tyNb"),c=n("fXoL");let r=(()=>{class t{constructor(t){this.router=t}canActivate(){const t=localStorage.getItem("UserRole"),e=t&&t.length>0;return e?console.log(`Role:${t}`):(console.log("Not Login"),this.router.navigate(["/Login"])),e}}return t.\u0275fac=function(e){return new(e||t)(c.Zb(i.a))},t.\u0275prov=c.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var l=n("eIep"),s=n("lJxs"),d=n("HDdC"),m=n("d3yR"),u=n("uHsu");let b=(()=>{class t{constructor(t,e,n){this.router=t,this.menuService=e,this.groupProgramService=n}canActivate(t,e){return new d.a(t=>{let n=!1;this.menuService.getAll().pipe(Object(l.a)(t=>this.groupProgramService.getAll().pipe(Object(s.a)(e=>({menus:t,groupPrograms:e}))))).subscribe(({menus:a,groupPrograms:o})=>{const i=localStorage.getItem("UserGroup"),c=e.url.split("/")[2],r=a.filter(t=>t.linkTag===c);r[0]&&r[0].program.length>0&&(n=o.filter(t=>t.group===i&&t.program===r[0].program).length>0),n||(console.log("Not Auth"),this.router.navigate(["/401"])),t.next(n),t.complete()})})}}return t.\u0275fac=function(e){return new(e||t)(c.Zb(i.a),c.Zb(m.a),c.Zb(u.a))},t.\u0275prov=c.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var g=n("ohih"),p=n("NJLX"),h=n("Wp6s"),f=n("NFeN"),D=n("f0Cb");function y(t,e){if(1&t&&(c.Vb(0,"p"),c.Ac(1),c.Ub()),2&t){const t=e.$implicit;c.Eb(1),c.Cc(" \xa0\xa0",t.name," ")}}function C(t,e){if(1&t&&(c.Vb(0,"p"),c.Ac(1),c.Ub()),2&t){const t=e.$implicit;c.Eb(1),c.Cc(" \xa0\xa0",t.linkTag," ")}}let v=(()=>{class t{constructor(t,e,n){this.groupService=t,this.roleService=e,this.groupProgramService=n}ngOnInit(){const t=localStorage.getItem("UserRole");this.role=this.roleService.getByRoleId(t),this.groups=this.groupService.getByAuth();const e=localStorage.getItem("UserGroup");this.groupPrograms=this.groupProgramService.getByGroupId(e)}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(g.a),c.Pb(p.a),c.Pb(u.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-dashboard"]],decls:32,vars:9,consts:[[1,"container","in550-1550","theme-center"],[1,"example-card"],["mat-card-avatar",""],[1,"theme-left","container"],[4,"ngFor","ngForOf"]],template:function(t,e){if(1&t&&(c.Vb(0,"div",0),c.Vb(1,"mat-card",1),c.Vb(2,"mat-card-header"),c.Vb(3,"mat-icon",2),c.Ac(4,"assignment_ind"),c.Ub(),c.Vb(5,"mat-card-title"),c.Ac(6,"Your Role"),c.Ub(),c.Ub(),c.Qb(7,"mat-divider"),c.Vb(8,"mat-card-content",3),c.Vb(9,"p"),c.Ac(10),c.hc(11,"async"),c.Ub(),c.Ub(),c.Ub(),c.Vb(12,"mat-card",1),c.Vb(13,"mat-card-header"),c.Vb(14,"mat-icon",2),c.Ac(15,"supervisor_account"),c.Ub(),c.Vb(16,"mat-card-title"),c.Ac(17,"Your Group"),c.Ub(),c.Ub(),c.Qb(18,"mat-divider"),c.Vb(19,"mat-card-content",3),c.zc(20,y,2,1,"p",4),c.hc(21,"async"),c.Ub(),c.Ub(),c.Vb(22,"mat-card",1),c.Vb(23,"mat-card-header"),c.Vb(24,"mat-icon",2),c.Ac(25,"airplay"),c.Ub(),c.Vb(26,"mat-card-title"),c.Ac(27,"Authorize Program"),c.Ub(),c.Ub(),c.Qb(28,"mat-divider"),c.Vb(29,"mat-card-content",3),c.zc(30,C,2,1,"p",4),c.hc(31,"async"),c.Ub(),c.Ub(),c.Ub()),2&t){let t=null;c.Eb(10),c.Cc(" \xa0\xa0",null==(t=c.ic(11,3,e.role))?null:t.remark," "),c.Eb(10),c.lc("ngForOf",c.ic(21,5,e.groups)),c.Eb(10),c.lc("ngForOf",c.ic(31,7,e.groupPrograms))}},directives:[h.a,h.d,f.a,h.b,h.f,D.a,h.c,a.j],pipes:[a.b],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}@media screen and (max-width:550px){mat-card.example-card[_ngcontent-%COMP%]{width:100%}}@media screen and (min-width:550px) and (max-width:1050px){.in550-1550[_ngcontent-%COMP%]   .example-card[_ngcontent-%COMP%]{width:25%}}.example-card[_ngcontent-%COMP%]{display:inline-block;width:29%;margin-left:.1em;margin-right:.1em;vertical-align:top}.container[_ngcontent-%COMP%]{margin:3%}"]}),t})();var w=n("XpAA"),P=n("+XYJ"),O=n("UPMS"),M=n("l7P3");const k=Object(M.o)(w.a.Users),U=Object(M.o)(w.a.Roles),V=Object(M.o)(w.a.Groups),A=Object(M.o)(w.a.GroupPrograms),_=Object(M.o)(w.a.Programs),x=Object(M.o)(w.a.Buttons),E=Object(M.o)(w.a.Menus);var S=n("/t3+"),j=n("bTqV"),T=n("XhcP"),z=n("MutI");const R=function(t){return[t]};function I(t,e){if(1&t&&(c.Vb(0,"a",10),c.Ac(1),c.Ub()),2&t){const t=e.$implicit;c.mc("id",t.name),c.lc("routerLink",c.oc(3,R,t.linkTag)),c.Eb(1),c.Bc(t.name)}}const N=function(){return["Main"]};let G=(()=>{class t{constructor(t,e,n){this.router=t,this.store=e,this.menuService=n,this.title="Authorize"}ngOnInit(){this.store.dispatch(new P.k(w.a.Menus)),this.store.select(E).subscribe(t=>{this.menus=this.menuService.getAuthMenus(Object(O.b)(t))})}Logout(){localStorage.clear(),this.router.navigate(["/Login"])}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(i.a),c.Pb(M.h),c.Pb(m.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-main"]],decls:22,vars:7,consts:[[1,"toolbar-header","dark-theme"],["mat-icon-button","","aria-label","Menu",1,"dark-theme",3,"click"],[3,"routerLink"],[1,"toolbar-seprator"],["mat-icon-button","","aria-label","Logout",1,"dark-theme",3,"click"],[1,"toolbar-container"],["mode","side",1,"dark-theme"],["sideNav",""],["mat-list-item","","class","dark-theme",3,"id","routerLink",4,"ngFor","ngForOf"],[1,"theme-center","display-none"],["mat-list-item","",1,"dark-theme",3,"id","routerLink"]],template:function(t,e){if(1&t){const t=c.Wb();c.Vb(0,"mat-toolbar",0),c.Vb(1,"button",1),c.cc("click",function(){return c.tc(t),c.rc(13).toggle()}),c.Vb(2,"mat-icon"),c.Ac(3),c.Ub(),c.Ub(),c.Ac(4,"\xa0 "),c.Vb(5,"span",2),c.Ac(6),c.Ub(),c.Qb(7,"span",3),c.Vb(8,"button",4),c.cc("click",function(){return e.Logout()}),c.Vb(9,"mat-icon"),c.Ac(10,"exit_to_app"),c.Ub(),c.Ub(),c.Ub(),c.Vb(11,"mat-sidenav-container",5),c.Vb(12,"mat-sidenav",6,7),c.Vb(14,"mat-nav-list"),c.zc(15,I,2,5,"a",8),c.hc(16,"async"),c.Ub(),c.Ub(),c.Vb(17,"mat-sidenav-content"),c.Vb(18,"div",9),c.Vb(19,"span"),c.Ac(20,"Hello!!"),c.Ub(),c.Ub(),c.Qb(21,"router-outlet"),c.Ub(),c.Ub()}if(2&t){const t=c.rc(13);c.Eb(3),c.Bc(t.opened?"close":"menu"),c.Eb(2),c.lc("routerLink",c.nc(6,N)),c.Eb(1),c.Bc(e.title),c.Eb(9),c.lc("ngForOf",c.ic(16,4,e.menus))}},directives:[S.a,j.a,f.a,i.b,T.b,T.a,z.c,a.j,T.c,i.e,z.a,i.c],pipes:[a.b],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}@media screen and (max-width:900px){mat-toolbar.toolbar-header[_ngcontent-%COMP%]{height:2em}mat-sidenav-container.toolbar-container[_ngcontent-%COMP%]{margin-top:2em}}.toolbar-header[_ngcontent-%COMP%]{position:fixed;top:0;left:0;z-index:2;height:3em;box-shadow:4px 4px 12px -2px rgba(51,51,102,.5)}.toolbar-seprator[_ngcontent-%COMP%]{flex:1 1 auto}.toolbar-container[_ngcontent-%COMP%]{position:absolute;margin-top:3em;top:0;bottom:0;left:0;right:0}"]}),t})();var $=n("tfvo"),F=function(t){return t.string="string",t.input="input",t.label="label",t.select="select",t.multiselect="multiselect",t}({});let B=(()=>{class t{constructor(t,e,n,a){this.router=t,this.templateRef=e,this.viewContainer=n,this.groupProgramService=a,this.AuthorizeDictionary={}}ngOnInit(){this.viewContainer.createEmbeddedView(this.templateRef);const t=this.router.url.split("/")[2];this.groupProgramService.getByLink(t).subscribe(t=>{t.forEach(t=>{this.AuthorizeDictionary[t.name]=t.isEnable})})}ngAfterViewChecked(){for(const[t,e]of Object.entries(this.AuthorizeDictionary))e||this.templateRef.elementRef.nativeElement.ownerDocument.querySelectorAll(`button#${t}:not([disabled])`).forEach(t=>{t.disabled=!0,t.style.cssText="background-color : gray; color : white;"})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(i.a),c.Pb(c.O),c.Pb(c.S),c.Pb(u.a))},t.\u0275dir=c.Kb({type:t,selectors:[["","appAuthorize",""]]}),t})();var L=n("Dh3D"),Q=n("+0xr"),H=n("M9IT"),J=n("R0Ic");let q=(()=>{class t{constructor(t){this.viewContainerRef=t}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(c.S))},t.\u0275dir=c.Kb({type:t,selectors:[["","appDynamicHost",""]]}),t})();var W=n("kmnG"),X=n("qFsG");let K=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["app-input"]],decls:3,vars:2,consts:[["matInput","",3,"placeholder","ngModel","ngModelChange"]],template:function(t,e){1&t&&(c.Vb(0,"mat-form-field"),c.Vb(1,"input",0),c.cc("ngModelChange",function(t){return e.column.value=t}),c.Ub(),c.Ub(),c.Qb(2,"br")),2&t&&(c.Eb(1),c.mc("placeholder",e.column.columnDef),c.lc("ngModel",e.column.value))},directives:[W.b,X.b,o.c,o.j,o.l],styles:[""]}),t})(),Z=(()=>{class t{constructor(){}ngOnInit(){this.visible=this.column.visible||!0===this.column.visible?"":"none"}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["app-label"]],decls:3,vars:3,template:function(t,e){1&t&&(c.Vb(0,"label"),c.Ac(1),c.Ub(),c.Qb(2,"br")),2&t&&(c.wc("display",e.visible),c.Eb(1),c.Cc(" ",e.column.value,"\n"))},styles:[""]}),t})();var Y=n("d3UM"),tt=n("FKr1");function et(t,e){if(1&t&&(c.Vb(0,"mat-option",1),c.Ac(1),c.Ub()),2&t){const t=e.$implicit;c.lc("value",t.id),c.Eb(1),c.Cc(" ",t.name," ")}}let nt=(()=>{class t{constructor(){this.default="",this.entityToArray=t=>Object(O.b)(t)}ngOnInit(){this.source=this.column.source()}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["app-select"]],decls:9,vars:7,consts:[[3,"ngModel","name","ngModelChange","selectionChange"],[3,"value"],[3,"value",4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(c.Vb(0,"mat-form-field"),c.Vb(1,"mat-label"),c.Ac(2),c.Ub(),c.Vb(3,"mat-select",0),c.cc("ngModelChange",function(t){return e.column.value=t})("selectionChange",function(t){return e.onChanges(t)}),c.Vb(4,"mat-option",1),c.Ac(5,"--"),c.Ub(),c.zc(6,et,2,2,"mat-option",2),c.hc(7,"async"),c.Ub(),c.Ub(),c.Qb(8,"br")),2&t&&(c.Eb(2),c.Bc(e.column.columnDef),c.Eb(1),c.mc("name",e.column.columnDef),c.lc("ngModel",e.column.value),c.Eb(1),c.lc("value",e.default),c.Eb(2),c.lc("ngForOf",e.entityToArray(c.ic(7,5,e.source))))},directives:[W.b,W.e,Y.a,o.j,o.l,tt.m,a.j],pipes:[a.b],styles:[""]}),t})();function at(t,e){if(1&t&&(c.Vb(0,"mat-option",1),c.Ac(1),c.Ub()),2&t){const t=e.$implicit;c.lc("value",t.id),c.Eb(1),c.Cc(" ",t.name," ")}}let ot=(()=>{class t{constructor(){this.default="",this.entityToArray=t=>Object(O.b)(t)}ngOnInit(){this.source=this.column.source()}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["app-multiselect"]],decls:9,vars:7,consts:[["multiple","",3,"ngModel","name","ngModelChange","selectionChange"],[3,"value"],[3,"value",4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(c.Vb(0,"mat-form-field"),c.Vb(1,"mat-label"),c.Ac(2),c.Ub(),c.Vb(3,"mat-select",0),c.cc("ngModelChange",function(t){return e.column.value=t})("selectionChange",function(t){return e.onChanges(t)}),c.Vb(4,"mat-option",1),c.Ac(5,"--"),c.Ub(),c.zc(6,at,2,2,"mat-option",2),c.hc(7,"async"),c.Ub(),c.Ub(),c.Qb(8,"br")),2&t&&(c.Eb(2),c.Bc(e.column.columnDef),c.Eb(1),c.mc("name",e.column.columnDef),c.lc("ngModel",e.column.value),c.Eb(1),c.lc("value",e.default),c.Eb(2),c.lc("ngForOf",e.entityToArray(c.ic(7,5,e.source))))},directives:[W.b,W.e,Y.a,o.j,o.l,tt.m,a.j],pipes:[a.b],styles:[""]}),t})();var it=n("0IaG");const ct=["content"];let rt=(()=>{class t{constructor(t){this.componenFactoryResolver=t,this.ComponentDictionary={}}dynamicAddComponent(t){let e;switch(t.selector){case F.input:e=this.componenFactoryResolver.resolveComponentFactory(K);break;case F.select:e=this.componenFactoryResolver.resolveComponentFactory(nt);break;case F.multiselect:e=this.componenFactoryResolver.resolveComponentFactory(ot);break;default:e=this.componenFactoryResolver.resolveComponentFactory(Z)}const n=this.dynamicComponentLoader.viewContainerRef.createComponent(e),a=n.instance;a.onChanges=this.onChanges?this.onChanges:()=>{},this.ComponentDictionary[t.columnDef]=a,a.column=t,n.changeDetectorRef.detectChanges()}getData(){const t={};for(const[e,n]of Object.entries(this.ComponentDictionary))t[e]=n.column.value;return t}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(c.j))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-dialog"]],viewQuery:function(t,e){if(1&t&&(c.Dc(q,3),c.Dc(ct,1)),2&t){let t;c.qc(t=c.dc())&&(e.dynamicComponentLoader=t.first),c.qc(t=c.dc())&&(e.content=t.first)}},decls:10,vars:4,consts:[["mat-dialog-title",""],[1,"mat-typography"],["content",""],["appDynamicHost",""],["align","end"],["mat-button","","mat-dialog-close","",3,"click"],["mat-button","",3,"mat-dialog-close"]],template:function(t,e){1&t&&(c.Vb(0,"h2",0),c.Ac(1),c.Ub(),c.Vb(2,"mat-dialog-content",1,2),c.Rb(4,3),c.Ub(),c.Vb(5,"mat-dialog-actions",4),c.Vb(6,"button",5),c.cc("click",function(){return e.confirm()}),c.Ac(7),c.Ub(),c.Vb(8,"button",6),c.Ac(9),c.Ub(),c.Ub()),2&t&&(c.Eb(1),c.Bc(e.DialogData.title),c.Eb(6),c.Bc(e.DialogData.button[0]),c.Eb(1),c.lc("mat-dialog-close",!0),c.Eb(1),c.Bc(e.DialogData.button[1]))},directives:[it.f,it.d,q,it.b,j.a,it.c],styles:[""]}),t})();function lt(t){console.log(t.active),console.log(t.direction)}function st(t){console.log(t)}function dt(t){const e=t.filter(t=>!(!1===t.visible)).map(t=>t.columnDef);return["maintain"].concat(e)}function mt(t,e){return n=>{const a=t.open(rt),o=a.componentInstance;return o.DialogData=n,o.onChanges=n.onChanges,o.confirm=n.confirm,o.ColumnArray=function(t,e){return void 0!==t&&e.forEach(e=>{e.value=t[e.columnDef]}),e}(n.data,e),o.ColumnArray.forEach(t=>{o.dynamicAddComponent(t)}),a.afterClosed().subscribe(t=>{console.log(`Dialog result: ${t}`)}),o}}var ut=n("Xa2L");function bt(t,e){1&t&&c.Qb(0,"th",10)}function gt(t,e){if(1&t){const t=c.Wb();c.Vb(0,"td",11),c.Vb(1,"button",12),c.cc("click",function(n){c.tc(t);const a=e.$implicit;return c.gc().edit(a,n)}),c.Ac(2,"Edit"),c.Ub(),c.Ac(3,"\xa0 "),c.Vb(4,"button",13),c.cc("click",function(n){c.tc(t);const a=e.$implicit;return c.gc().delete(a,n)}),c.Ac(5,"Delete"),c.Ub(),c.Ub()}}function pt(t,e){if(1&t&&(c.Vb(0,"th",16),c.Ac(1),c.Ub()),2&t){const t=c.gc().$implicit;c.Eb(1),c.Bc(t.header)}}function ht(t,e){if(1&t&&(c.Vb(0,"td",11),c.Ac(1),c.Ub()),2&t){const t=e.$implicit,n=c.gc().$implicit;c.Eb(1),c.Bc(n.displayName?t[n.displayName]:t[n.columnDef])}}function ft(t,e){1&t&&(c.Tb(0,14),c.zc(1,pt,2,1,"th",15),c.zc(2,ht,2,1,"td",4),c.Sb()),2&t&&c.mc("matColumnDef",e.$implicit.columnDef)}function Dt(t,e){1&t&&c.Qb(0,"tr",17)}function yt(t,e){1&t&&c.Qb(0,"tr",18)}function Ct(t,e){1&t&&(c.Vb(0,"div",19),c.Qb(1,"mat-progress-spinner",20),c.Ub())}const vt=function(){return[5,10,20]};let wt=(()=>{class t{constructor(t){this.matDialog=t,this.openDetailDialog=new c.o,this.sortData=lt,this.pageData=st,this.isLoading=!0}ngOnInit(){this.setSource()}ngOnDestroy(){this.subscription.unsubscribe()}setSource(){this.detail.subscribe(t=>{this.subscription=t.read().subscribe(t=>{this.isLoading=!1;const e=Object(O.b)(t);this.dataSource=new Q.k(e),this.pageNation()},t=>this.isLoading=!1),this.create=t.create,this.edit=t.edit,this.delete=t.delete,this.displayedColumns=dt(t.columns),this.openDetailDialog.emit(mt(this.matDialog,t.columns))})}pageNation(){this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(it.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-detail"]],viewQuery:function(t,e){if(1&t&&(c.Dc(H.a,3),c.Dc(L.a,3)),2&t){let t;c.qc(t=c.dc())&&(e.paginator=t.first),c.qc(t=c.dc())&&(e.sort=t.first)}},inputs:{detail:"detail"},outputs:{openDetailDialog:"openDetailDialog"},decls:14,vars:15,consts:[["id","btnAdd","mat-raised-button","",1,"dark-theme",2,"font-size","1em",3,"click"],["mat-table","","matSort","",3,"matSortActive","matSortDirection","dataSource","matSortChange"],["matColumnDef","maintain"],["mat-header-cell","","style","width: 20%;",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],[3,"matColumnDef",4,"ngFor","ngForOf"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","loading",4,"ngIf"],["showFirstLastButtons","",3,"pageSizeOptions","page"],["mat-header-cell","",2,"width","20%"],["mat-cell",""],["id","btnEdit","mat-raised-button","","color","accent",3,"click"],["id","btnDelete","mat-raised-button","","color","warn",3,"click"],[3,"matColumnDef"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-header-cell","","mat-sort-header",""],["mat-header-row",""],["mat-row",""],[1,"loading"],["color","primary","mode","indeterminate"]],template:function(t,e){if(1&t&&(c.Vb(0,"button",0),c.cc("click",function(){return e.create()}),c.Ac(1,"Add"),c.Ub(),c.Vb(2,"table",1),c.cc("matSortChange",function(t){return e.sortData(t)}),c.hc(3,"async"),c.hc(4,"async"),c.Tb(5,2),c.zc(6,bt,1,0,"th",3),c.zc(7,gt,6,0,"td",4),c.Sb(),c.zc(8,ft,3,1,"ng-container",5),c.hc(9,"async"),c.zc(10,Dt,1,0,"tr",6),c.zc(11,yt,1,0,"tr",7),c.Ub(),c.zc(12,Ct,2,0,"div",8),c.Vb(13,"mat-paginator",9),c.cc("page",function(t){return e.pageData(t)}),c.Ub()),2&t){let t=null,n=null,a=null;c.Eb(2),c.mc("matSortActive",null==(t=c.ic(3,8,e.detail))?null:t.sort.active),c.mc("matSortDirection",null==(n=c.ic(4,10,e.detail))?null:n.sort.direction),c.lc("dataSource",e.dataSource),c.Eb(6),c.lc("ngForOf",null==(a=c.ic(9,12,e.detail))?null:a.columns),c.Eb(2),c.lc("matHeaderRowDef",e.displayedColumns),c.Eb(1),c.lc("matRowDefColumns",e.displayedColumns),c.Eb(1),c.lc("ngIf",e.isLoading),c.Eb(1),c.lc("pageSizeOptions",c.nc(14,vt))}},directives:[j.a,Q.j,L.a,Q.c,Q.e,Q.b,a.j,Q.g,Q.i,a.k,H.a,Q.d,Q.a,L.b,Q.f,Q.h,ut.a],pipes:[a.b],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}"]}),t})();function Pt(t,e){1&t&&c.Qb(0,"th",12)}function Ot(t,e){if(1&t){const t=c.Wb();c.Vb(0,"button",17),c.cc("click",function(){c.tc(t);const e=c.gc().$implicit,n=c.gc();return n.currentElement=n.currentElement===e?null:e}),c.Vb(1,"mat-icon"),c.Ac(2),c.Ub(),c.Ub()}if(2&t){const t=c.gc().$implicit,e=c.gc();c.Eb(2),c.Bc(t==e.currentElement?"arrow_drop_down":"arrow_right")}}function Mt(t,e){if(1&t){const t=c.Wb();c.Vb(0,"td",13),c.zc(1,Ot,3,1,"button",14),c.Vb(2,"button",15),c.cc("click",function(n){c.tc(t);const a=e.$implicit;return c.gc().edit(a,n)}),c.Ac(3,"Edit"),c.Ub(),c.Ac(4,"\xa0 "),c.Vb(5,"button",16),c.cc("click",function(n){c.tc(t);const a=e.$implicit;return c.gc().delete(a,n)}),c.Ac(6,"Delete"),c.Ub(),c.Ub()}if(2&t){const t=c.gc();c.Eb(1),c.lc("ngIf",t.isHasDetail)}}function kt(t,e){if(1&t&&(c.Vb(0,"th",20),c.Ac(1),c.Ub()),2&t){const t=c.gc().$implicit;c.Eb(1),c.Bc(t.header)}}function Ut(t,e){if(1&t&&(c.Vb(0,"td",13),c.Ac(1),c.Ub()),2&t){const t=e.$implicit,n=c.gc().$implicit;c.Eb(1),c.Bc(n.displayName?t[n.displayName]:t[n.columnDef])}}function Vt(t,e){1&t&&(c.Tb(0,18),c.zc(1,kt,2,1,"th",19),c.zc(2,Ut,2,1,"td",4),c.Sb()),2&t&&c.mc("matColumnDef",e.$implicit.columnDef)}function At(t,e){if(1&t){const t=c.Wb();c.Vb(0,"div",26),c.Vb(1,"app-detail",27),c.cc("openDetailDialog",function(e){return c.tc(t),c.gc(3).initDetailHandler(e)}),c.hc(2,"async"),c.Ub(),c.Ub()}if(2&t){const t=c.gc().$implicit,e=c.gc(2);let n=null;c.Eb(1),c.lc("detail",null==(n=c.ic(2,1,e.grid))?null:n.detail(t))}}function _t(t,e){if(1&t&&(c.Vb(0,"td",23),c.Vb(1,"div",24),c.zc(2,At,3,3,"div",25),c.Ub(),c.Ub()),2&t){const t=e.$implicit,n=c.gc(2);c.Fb("colspan",n.displayedColumns.length),c.Eb(1),c.lc("@detailExpand",t==n.currentElement?"expanded":"collapsed"),c.Eb(1),c.lc("ngIf",t==n.currentElement)}}function xt(t,e){1&t&&(c.Tb(0,21),c.zc(1,_t,3,3,"td",22),c.Sb())}function Et(t,e){1&t&&c.Qb(0,"tr",28)}function St(t,e){1&t&&c.Qb(0,"tr",29)}function jt(t,e){1&t&&c.Qb(0,"tr",30)}function Tt(t,e){1&t&&(c.Vb(0,"div",31),c.Qb(1,"mat-progress-spinner",32),c.Ub())}const zt=function(){return["expandedDetail"]},Rt=function(){return[]},It=function(){return[5,10,20]};let Nt=(()=>{class t{constructor(t){this.matDialog=t,this.openTableDialog=new c.o,this.openDetailDialog=new c.o,this.sortData=lt,this.pageData=st,this.isLoading=!0}ngOnChanges(t){t.grid&&void 0!==this.grid&&this.setSource()}ngOnDestroy(){this.subscription.unsubscribe()}setSource(){this.grid.subscribe(t=>{this.subscription=t.read().subscribe(t=>{this.isLoading=!1;const e=Object(O.b)(t);this.dataSource=new Q.k(e),this.pageNation()},t=>this.isLoading=!1),this.create=t.create,this.edit=t.edit,this.delete=t.delete,this.isHasDetail=null!=t.detail,this.tableSort=new d.a(e=>{e.next(t.sort),e.next()}),this.columns=t.columns,this.displayedColumns=dt(t.columns),this.openTableDialog.emit(mt(this.matDialog,t.columns))})}pageNation(){this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator}initDetailHandler(t){this.openDetailDialog.emit(t)}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(it.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-table"]],viewQuery:function(t,e){if(1&t&&(c.Dc(H.a,3),c.Dc(L.a,3)),2&t){let t;c.qc(t=c.dc())&&(e.paginator=t.first),c.qc(t=c.dc())&&(e.sort=t.first)}},inputs:{grid:"grid"},outputs:{openTableDialog:"openTableDialog",openDetailDialog:"openDetailDialog"},features:[c.Cb],decls:15,vars:17,consts:[["id","btnAdd","mat-raised-button","","aria-label","Add",1,"dark-theme",2,"font-size","1em",3,"click"],["mat-table","","matSort","","multiTemplateDataRows","",3,"matSortActive","matSortDirection","dataSource","matSortChange"],["matColumnDef","maintain"],["mat-header-cell","","style","width: 20%;",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],[3,"matColumnDef",4,"ngFor","ngForOf"],["matColumnDef","expandedDetail",4,"ngIf"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-row","","class","detail-row",4,"matRowDef","matRowDefColumns"],["class","loading",4,"ngIf"],["showFirstLastButtons","",3,"pageSizeOptions","page"],["mat-header-cell","",2,"width","20%"],["mat-cell",""],["mat-icon-button","","aria-label","Detail",3,"click",4,"ngIf"],["id","btnEdit","mat-raised-button","","color","accent","aria-label","Edit",3,"click"],["id","btnDelete","mat-raised-button","","color","warn","aria-label","Delete",3,"click"],["mat-icon-button","","aria-label","Detail",3,"click"],[3,"matColumnDef"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-header-cell","","mat-sort-header",""],["matColumnDef","expandedDetail"],["mat-cell","","class","detail",4,"matCellDef"],["mat-cell","",1,"detail"],[1,"detail-element"],["class","detail-table",4,"ngIf"],[1,"detail-table"],[3,"detail","openDetailDialog"],["mat-header-row",""],["mat-row",""],["mat-row","",1,"detail-row"],[1,"loading"],["color","primary","mode","indeterminate"]],template:function(t,e){if(1&t&&(c.Vb(0,"button",0),c.cc("click",function(){return e.create()}),c.Ac(1,"Add"),c.Ub(),c.Vb(2,"table",1),c.cc("matSortChange",function(t){return e.sortData(t)}),c.hc(3,"async"),c.hc(4,"async"),c.Tb(5,2),c.zc(6,Pt,1,0,"th",3),c.zc(7,Mt,7,1,"td",4),c.Sb(),c.zc(8,Vt,3,1,"ng-container",5),c.zc(9,xt,2,0,"ng-container",6),c.zc(10,Et,1,0,"tr",7),c.zc(11,St,1,0,"tr",8),c.zc(12,jt,1,0,"tr",9),c.Ub(),c.zc(13,Tt,2,0,"div",10),c.Vb(14,"mat-paginator",11),c.cc("page",function(t){return e.pageData(t)}),c.Ub()),2&t){let t=null,n=null;c.Eb(2),c.mc("matSortActive",null==(t=c.ic(3,10,e.tableSort))?null:t.active),c.mc("matSortDirection",null==(n=c.ic(4,12,e.tableSort))?null:n.direction),c.lc("dataSource",e.dataSource),c.Eb(6),c.lc("ngForOf",e.columns),c.Eb(1),c.lc("ngIf",e.isHasDetail),c.Eb(1),c.lc("matHeaderRowDef",e.displayedColumns),c.Eb(1),c.lc("matRowDefColumns",e.displayedColumns),c.Eb(1),c.lc("matRowDefColumns",e.isHasDetail?c.nc(14,zt):c.nc(15,Rt)),c.Eb(1),c.lc("ngIf",e.isLoading),c.Eb(1),c.lc("pageSizeOptions",c.nc(16,It))}},directives:[j.a,Q.j,L.a,Q.c,Q.e,Q.b,a.j,a.k,Q.g,Q.i,H.a,Q.d,Q.a,f.a,L.b,wt,Q.f,Q.h,ut.a],pipes:[a.b],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}tr.detail-row[_ngcontent-%COMP%]{height:0;background-color:rgba(0,0,0,.12)}.detail[_ngcontent-%COMP%]{border-bottom:0}.detail-element[_ngcontent-%COMP%]{overflow:hidden;display:flex;padding-left:2.4%;padding-right:2.4%}.detail-table[_ngcontent-%COMP%]{width:100%;padding:5px 5px 2.5%}"],data:{animation:[Object(J.m)("detailExpand",[Object(J.j)("collapsed",Object(J.k)({height:"0px",minHeight:"0"})),Object(J.j)("expanded",Object(J.k)({height:"*"})),Object(J.l)("expanded <=> collapsed",Object(J.e)("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))])]},changeDetection:0}),t})();function Gt(t,e){if(1&t){const t=c.Wb();c.Vb(0,"div"),c.Vb(1,"mat-card"),c.Vb(2,"app-table",1),c.cc("openTableDialog",function(e){return c.tc(t),c.gc().openTableDialog=e}),c.Ub(),c.Ub(),c.Ub()}if(2&t){const t=c.gc();c.Eb(2),c.lc("grid",t.myGrid)}}let $t=(()=>{class t{constructor(t){this.store=t}ngOnInit(){this.loadGrid()}loadGrid(){this.myGrid=new d.a(t=>{t.next({tableName:w.a.Users,sort:{active:"id",direction:"asc"},columns:[{header:"Id",columnDef:"id",type:F.string,selector:F.label,visible:!1},{header:"Name",columnDef:"name",type:F.string,selector:F.input},{header:"Password",columnDef:"password",type:F.string,selector:F.input},{header:"Role",columnDef:"role",displayName:"roleName",type:F.string,selector:F.select,source:()=>(this.store.dispatch(new P.k(w.a.Roles)),this.store.select(U))}],read:()=>(this.store.dispatch(new P.k(w.a.Users)),this.store.select(k)),create:()=>{const t=this.openTableDialog({title:"\u65b0\u589e\u9801\u9762",button:[$.a.btnCreate,$.a.btnCancel],method:$.a.create,data:{},confirm:()=>{this.store.dispatch(new P.b(w.a.Users,[],t.getData()))}})},edit:t=>{const e=this.openTableDialog({title:"\u4fee\u6539\u9801\u9762",button:[$.a.btnEdit,$.a.btnCancel],method:$.a.edit,data:t,confirm:()=>{this.store.dispatch(new P.h(w.a.Users,[],e.getData()))}})},delete:t=>{confirm("Are you sure you want to delete this?")&&this.store.dispatch(new P.e(w.a.Users,[],t))}}),t.complete()})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(M.h))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-user"]],decls:1,vars:0,consts:[[4,"appAuthorize"],[3,"grid","openTableDialog"]],template:function(t,e){1&t&&c.zc(0,Gt,3,1,"div",0)},directives:[B,h.a,Nt],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}"]}),t})();function Ft(t,e){if(1&t){const t=c.Wb();c.Vb(0,"div"),c.Vb(1,"mat-card"),c.Vb(2,"app-table",1),c.cc("openTableDialog",function(e){return c.tc(t),c.gc().openTableDialog=e}),c.Ub(),c.Ub(),c.Ub()}if(2&t){const t=c.gc();c.Eb(2),c.lc("grid",t.myGrid)}}let Bt=(()=>{class t{constructor(t){this.store=t}ngOnInit(){this.loadGrid()}loadGrid(){this.myGrid=new d.a(t=>{t.next({tableName:w.a.Roles,sort:{active:"id",direction:"asc"},columns:[{header:"Id",columnDef:"id",type:F.string,selector:F.label,visible:!1},{header:"Name",columnDef:"name",type:F.string,selector:F.input},{header:"Remark",columnDef:"remark",type:F.string,selector:F.input}],read:()=>(this.store.dispatch(new P.k(w.a.Roles)),this.store.select(U)),create:()=>{const t=this.openTableDialog({title:"\u65b0\u589e\u9801\u9762",button:[$.a.btnCreate,$.a.btnCancel],method:$.a.create,data:{},confirm:()=>{this.store.dispatch(new P.b(w.a.Roles,[],t.getData()))}})},edit:t=>{const e=this.openTableDialog({title:"\u4fee\u6539\u9801\u9762",button:[$.a.btnEdit,$.a.btnCancel],method:$.a.edit,data:t,confirm:()=>{this.store.dispatch(new P.h(w.a.Roles,[],e.getData()))}})},delete:t=>{confirm("Are you sure you want to delete this?")&&this.store.dispatch(new P.e(w.a.Roles,[],t))}}),t.complete()})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(M.h))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-role"]],decls:1,vars:0,consts:[[4,"appAuthorize"],[3,"grid","openTableDialog"]],template:function(t,e){1&t&&c.zc(0,Ft,3,1,"div",0)},directives:[B,h.a,Nt],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}"]}),t})();var Lt=n("P5D9");function Qt(t,e){if(1&t){const t=c.Wb();c.Vb(0,"div"),c.Vb(1,"mat-card"),c.Vb(2,"app-table",1),c.cc("openTableDialog",function(e){return c.tc(t),c.gc().openTableDialog=e})("openDetailDialog",function(e){return c.tc(t),c.gc().openDetailDialog=e}),c.Ub(),c.Ub(),c.Ub()}if(2&t){const t=c.gc();c.Eb(2),c.lc("grid",t.myGrid)}}function Ht(t,e){if(1&t){const t=c.Wb();c.Vb(0,"div"),c.Vb(1,"mat-card"),c.Vb(2,"app-table",1),c.cc("openTableDialog",function(e){return c.tc(t),c.gc().openTableDialog=e})("openDetailDialog",function(e){return c.tc(t),c.gc().openDetailDialog=e}),c.Ub(),c.Ub(),c.Qb(3,"div"),c.Ub()}if(2&t){const t=c.gc();c.Eb(2),c.lc("grid",t.myGrid)}}const Jt=[{path:"",component:G,canActivate:[r],children:[{path:"User",component:$t,canActivate:[b]},{path:"Role",component:Bt,canActivate:[b]},{path:"Group",component:(()=>{class t{constructor(t,e,n){this.store=t,this.roleService=e,this.programService=n}ngOnInit(){this.loadGrid()}loadGrid(){this.myGrid=new d.a(t=>{t.next({tableName:w.a.Groups,sort:{active:"id",direction:"asc"},columns:[{header:"Id",columnDef:"id",type:F.string,selector:F.label,visible:!1},{header:"Name",columnDef:"name",type:F.string,selector:F.input},{header:"Roles",columnDef:"roles",displayName:"rolesName",type:F.string,selector:F.multiselect,source:()=>(this.store.dispatch(new P.k(w.a.Roles)),this.store.select(U))}],detail:t=>new d.a(e=>{e.next({tableName:w.a.GroupPrograms,sort:{active:"id",direction:"asc"},columns:[{header:"Id",columnDef:"id",type:F.string,selector:F.label,visible:!1},{header:"Name",columnDef:"name",type:F.string,selector:F.input},{header:"Program",columnDef:"program",displayName:"programName",type:F.string,selector:F.select,source:()=>(this.store.dispatch(new P.k(w.a.Programs)),this.store.select(_))},{header:"Button",columnDef:"buttons",displayName:"buttonsName",type:F.string,selector:F.multiselect,source:()=>this.store.select(x)}],read:()=>(this.store.dispatch(new P.k(`${w.a.Groups}.${w.a.GroupPrograms}`,[],{group:t.id})),this.store.select(A)),create:()=>{const e=this.openDetailDialog({title:"\u65b0\u589e\u9801\u9762",button:[$.a.btnCreate,$.a.btnCancel],method:$.a.create,data:{},onChanges:t=>{"program"===t.source.ngControl.name&&this.store.dispatch(new P.k(`${w.a.Programs}.${w.a.Buttons}`,[],{program:t.value}))},confirm:()=>{const n=e.getData();n.group=t.id,this.store.dispatch(new P.b(w.a.GroupPrograms,[],n))}})},edit:t=>{this.store.dispatch(new P.k(`${w.a.Programs}.${w.a.Buttons}`,[],{program:t.program}));const e=this.openDetailDialog({title:"\u4fee\u6539\u9801\u9762",button:[$.a.btnEdit,$.a.btnCancel],method:$.a.edit,data:t,onChanges:t=>{"program"===t.source.ngControl.name&&this.store.dispatch(new P.k(`${w.a.Programs}.${w.a.Buttons}`,[],{program:t.value}))},confirm:()=>{this.store.dispatch(new P.h(w.a.GroupPrograms,[],e.getData()))}})},delete:t=>{confirm("Are you sure you want to delete this?")&&this.store.dispatch(new P.e(w.a.GroupPrograms,[],t))}}),e.complete()}),read:()=>(this.store.dispatch(new P.k(w.a.Groups)),this.store.select(V)),create:()=>{const t=this.openTableDialog({title:"\u65b0\u589e\u9801\u9762",button:[$.a.btnCreate,$.a.btnCancel],method:$.a.create,data:{},confirm:()=>{this.store.dispatch(new P.b(w.a.Groups,[],t.getData()))}})},edit:t=>{const e=this.openTableDialog({title:"\u4fee\u6539\u9801\u9762",button:[$.a.btnEdit,$.a.btnCancel],method:$.a.edit,data:t,confirm:()=>{this.store.dispatch(new P.h(w.a.Groups,[],e.getData()))}})},delete:t=>{confirm("Are you sure you want to delete this?")&&this.store.dispatch(new P.e(w.a.Groups,[],t))}}),t.complete()})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(M.h),c.Pb(p.a),c.Pb(Lt.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-group"]],decls:1,vars:0,consts:[[4,"appAuthorize"],[3,"grid","openTableDialog","openDetailDialog"]],template:function(t,e){1&t&&c.zc(0,Qt,3,1,"div",0)},directives:[B,h.a,Nt],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}"]}),t})(),canActivate:[b]},{path:"Program",component:(()=>{class t{constructor(t){this.store=t}ngOnInit(){this.loadGrid()}loadGrid(){this.myGrid=new d.a(t=>{t.next({tableName:w.a.Programs,sort:{active:"id",direction:"asc"},columns:[{header:"Id",columnDef:"id",type:F.string,selector:F.label,visible:!1},{header:"Name",columnDef:"name",type:F.string,selector:F.input},{header:"Remark",columnDef:"remark",type:F.string,selector:F.input},{header:"LinkTag",columnDef:"linkTag",type:F.string,selector:F.input}],detail:t=>new d.a(e=>{e.next({tableName:w.a.Buttons,sort:{active:"id",direction:"asc"},columns:[{header:"Id",columnDef:"id",type:F.string,selector:F.label,visible:!1},{header:"Name",columnDef:"name",type:F.string,selector:F.input},{header:"Remark",columnDef:"remark",type:F.string,selector:F.input}],read:()=>(this.store.dispatch(new P.k(`${w.a.Programs}.${w.a.Buttons}`,[],{program:t.id})),this.store.select(x)),create:()=>{const e=this.openDetailDialog({title:"\u65b0\u589e\u9801\u9762",button:[$.a.btnCreate,$.a.btnCancel],method:$.a.create,data:{}});e.confirm=()=>{const n=e.getData();n.program=t.id,this.store.dispatch(new P.b(w.a.Buttons,[],n))}},edit:t=>{const e=this.openDetailDialog({title:"\u4fee\u6539\u9801\u9762",button:[$.a.btnEdit,$.a.btnCancel],method:$.a.edit,data:t});e.confirm=()=>{this.store.dispatch(new P.h(w.a.Buttons,[],e.getData()))}},delete:t=>{confirm("Are you sure you want to delete this?")&&this.store.dispatch(new P.e(w.a.Buttons,[],t))}}),e.complete()}),read:()=>(this.store.dispatch(new P.k(w.a.Programs)),this.store.select(_)),create:()=>{const t=this.openTableDialog({title:"\u65b0\u589e\u9801\u9762",button:[$.a.btnCreate,$.a.btnCancel],method:$.a.create,data:{},confirm:()=>{this.store.dispatch(new P.b(w.a.Programs,[],t.getData()))}})},edit:t=>{const e=this.openTableDialog({title:"\u4fee\u6539\u9801\u9762",button:[$.a.btnEdit,$.a.btnCancel],method:$.a.edit,data:t,confirm:()=>{this.store.dispatch(new P.h(w.a.Programs,[],e.getData()))}})},delete:t=>{confirm("Are you sure you want to delete this?")&&this.store.dispatch(new P.e(w.a.Programs,[],t))}}),t.complete()})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(M.h))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-program"]],decls:1,vars:0,consts:[[4,"appAuthorize"],[3,"grid","openTableDialog","openDetailDialog"]],template:function(t,e){1&t&&c.zc(0,Ht,4,1,"div",0)},directives:[B,h.a,Nt],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}"]}),t})(),canActivate:[b]},{path:"Menu",component:(()=>{class t{constructor(t){this.store=t}ngOnInit(){this.loadGrid()}loadGrid(){this.myGrid=new d.a(t=>{t.next({tableName:w.a.Menus,sort:{active:"id",direction:"asc"},columns:[{header:"Id",columnDef:"id",type:F.string,selector:F.label,visible:!1},{header:"Name",columnDef:"name",type:F.string,selector:F.input},{header:"Program",columnDef:"program",displayName:"programName",type:F.string,selector:F.select,source:()=>(this.store.dispatch(new P.k(w.a.Programs)),this.store.select(_))}],read:()=>this.store.select(E),create:()=>{const t=this.openTableDialog({title:"\u65b0\u589e\u9801\u9762",button:[$.a.btnCreate,$.a.btnCancel],method:$.a.create,data:{},onChanges:t=>{"program"===t.source.ngControl.name&&this.store.dispatch(new P.k(`${w.a.Programs}.${w.a.Buttons}`,[],{program:t.value}))},confirm:()=>{this.store.dispatch(new P.b(w.a.Menus,[],t.getData()))}})},edit:t=>{this.store.dispatch(new P.k(`${w.a.Programs}.${w.a.Buttons}`,[],{program:t.program}));const e=this.openTableDialog({title:"\u4fee\u6539\u9801\u9762",button:[$.a.btnEdit,$.a.btnCancel],method:$.a.edit,data:t,onChanges:t=>{"program"===t.source.ngControl.name&&this.store.dispatch(new P.k(`${w.a.Programs}.${w.a.Buttons}`,[],{program:t.value}))},confirm:()=>{this.store.dispatch(new P.h(w.a.Menus,[],e.getData()))}})},delete:t=>{confirm("Are you sure you want to delete this?")&&this.store.dispatch(new P.e(w.a.Menus,[],t))}}),t.complete()})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(M.h))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-menu"]],decls:2,vars:1,consts:[[3,"grid","openTableDialog"]],template:function(t,e){1&t&&(c.Vb(0,"mat-card"),c.Vb(1,"app-table",0),c.cc("openTableDialog",function(t){return e.openTableDialog=t}),c.Ub(),c.Ub()),2&t&&(c.Eb(1),c.lc("grid",e.myGrid))},directives:[h.a,Nt],styles:[".dark-theme[_ngcontent-%COMP%]{background-color:#221b2e;color:#fff}.theme-center[_ngcontent-%COMP%]{text-align:center}.theme-left[_ngcontent-%COMP%]{text-align:left}.theme-right[_ngcontent-%COMP%]{text-align:right}.display-none[_ngcontent-%COMP%]{display:none}.loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background:#fff}table[_ngcontent-%COMP%]{width:100%}"]}),t})(),canActivate:[b]},{path:"Dashboard",component:v,canActivate:[r]},{path:"",redirectTo:"Dashboard"},{path:"**",redirectTo:"Dashboard"}]}];let qt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[i.d.forChild(Jt)],i.d]}),t})();var Wt=n("mq8K");let Xt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[a.c,o.e,o.m,Wt.a]]}),t})(),Kt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({}),t})(),Zt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[a.c,o.e,o.m,Wt.a,qt,Xt,Kt]]}),t})()}}]);