!function($){var fMask={mapearMascara:function(a,r){for(var e=Object.keys(r),t={},o=a.length,s=0;s<o;s++)t[s]=$.inArray(a[s],e)>-1;return t},limparValor:function(a,r,e){var t=[],o=fMask.mapearMascara(r,e);for(var s in o)o[s]||t.push(r[s]);return a.replace(new RegExp("["+Array.from(new Set(t)).join("")+"]","g"),"")},aplicarMascara:function(a,r,e,t){var o=fMask.limparValor(a,r,e),s="",n=fMask.mapearMascara(r,e),i=0,c;for(var l in n){if(void 0===o[i])break;n[l]?(e[r[l]].test(o[i])&&(s+=o[i]),i++):s+=r[l]}for(;(c=l+1)&&!1===n[l];)s+=r[l++];return!t&&i<o.length&&(s+=o.substring(i)),s},criarPlaceholder:function(a,r){var e="",t=fMask.mapearMascara(a,r);for(var o in t)e+=t[o]?"_":a[o];return e}},fCursor={obter:function(a){try{return a.selectionStart||0}catch(a){console.error(a)}},mover:function(a,r){try{if(a.setSelectionRange)a.setSelectionRange(r,r);else{var e=a.createTextRange();e.collapse(!0),e.moveEnd("character",r),e.moveStart("character",r),e.select()}}catch(a){console.error(a)}}};$.fn.mascara=function(mascara,opcoes){return void 0===jQuery&&console.error("[Plugin $.mascara] O jQuery ainda não foi inciado.\nPara utilizar esse plugin é necessário inicializar o jQuery antes."),$(window).on("load.__msk",function(){$("[data-mask]").each(function(){var $this=$(this),mask=$this.data("mask"),atributos,attr_data={},nome,valor;if(void 0!==mask){atributos=this.attributes;for(var attr in atributos)nome=atributos[attr].name,/^data\-/.test(nome)&&(valor=atributos[attr].value,attr_data[nome.replace(/^data\-/,"")]=eval(valor));$this.mascara(mask,attr_data)}})}),this.each(function(){var a=$(this),r="__msk",e={0:/[\d]/,A:/[A-Z]/,a:/[a-z]/,w:/[A-Za-z]/};opcoes=$.extend(!0,{limitar:!0,placeholder:!0,ignorarTeclas:[8,9,37,38,39,40]},opcoes),void 0!==opcoes.mapeamento&&(e=$.extend(!0,{},e,opcoes.mapeamento)),opcoes.placeholder&&!a.is("[placeholder]")&&a.attr("placeholder",fMask.criarPlaceholder(mascara,e)),opcoes.limitar&&a.attr("maxlength",mascara.length),a.off(".__msk").on("keyup.__msk",$.extend(!0,{},{msk:mascara,map:e},opcoes),function(a){var r=$(this),e=a.data,t=a.keyCode||a.which,o=a.metaKey||a.ctrlKey,s;!o&&$.inArray(t,e.ignorarTeclas)<0&&(s=fCursor.obter(this),r.val(fMask.aplicarMascara(r.val(),e.msk,e.map,e.limitar)),fCursor.mover(this,s+(s>=r.val().length-1)))})})}}(jQuery);