let gl_lFT=!1,productDetail={slideProduct:function(){let t=$("#sticky-image").find(".slide-step");if(!t.length)return;let e,i=null,o=t.find(".slide-lager"),n=o.find(".swiper-container"),a=t.find(".slide-thumb"),r=a.find(".swiper-container"),l=a.find(".thumb-item"),s=function(){image_active=e.activeIndex,i.slideTo(e.activeIndex),l.removeClass("is-active"),a.find('.thumb-item[data-target="'+e.activeIndex+'"]').addClass("is-active")};i=new Swiper(r,{navigation:{nextEl:a.find(".swiper-button-next"),prevEl:a.find(".swiper-button-prev")},preloadImages:!1,slidesPerView:4,spaceBetween:6,direction:"vertical",height:290,slideToClickedSlide:!0}),e=new Swiper(n,{preloadImages:!1,slidesPerView:1,spaceBetween:30,onTransitionStart:function(){s()}}),s(),a.on("click",".thumb-item",function(t){t.preventDefault(),e.slideTo($(this).data("target")),s()}),o.on("touchend",function(t){t.preventDefault(),i.slideTo(e.activeIndex),s()})},loadGallery:function(){if(gl_lFT){let t=$(".fotorama").on("fotorama:ready fotorama:show fotorama:showend fotorama:load fotorama:error fotorama:startautoplay fotorama:stopautoplay fotorama:fullscreenenter fotorama:fullscreenexit fotorama:loadvideo fotorama:unloadvideo",function(t,e,i){"fotorama:fullscreenexit"==t.type&&e.destroy()}).fotorama({click:!1,allowfullscreen:!0}).data("fotorama"),e=[];$(".lager-item").each(function(){e.push({img:$(this).data("max"),thumb:$(this).data("thumb")})}),console.log(e),t.load(e),t.show(image_active),t.requestFullScreen()}else $.getScript(base_url+"desktop/js/fotorama.js").done(function(){gl_lFT=!0,productDetail.loadGallery()})},stickyImage:function(){$("#sticky-image").sticky({topSpacing:5,zIndex:25,bottomSpacing:$("body").height()-$(".product-detail").height()-257})},stickyZoneBuy:function(){$(".product-detail").find("#zone-buy").sticky({topSpacing:0,zIndex:25,bottomSpacing:$("body").height()-$(".product-detail").height()-257})},loadSticky:function(){productDetail.stickyImage(),productDetail.stickyZoneBuy()},scrollProduct:function(){$('.product-nav a[href^="#"]').on("click",function(t){let e=$(this.getAttribute("href"));e.length&&($(".scroll-nav a").removeClass("active"),$(this).addClass("active"),t.preventDefault(),$("html, body").stop().animate({scrollTop:e.offset().top-120},300),console.log(e.offset().top-120))})},viewHistory:function(){new Swiper("#swiper-history",{slidesPerView:6,spaceBetween:0,slidesPerGroup:6,navigation:{nextEl:".history-next",prevEl:".history-prev"},on:{init:function(){console.log("swiper initialized History")}}})},logHistoryView:function(t){$.ajax({url:base_url+"customer/history/add",type:"POST",data:{product_id:t,_token:_token},dataType:"json",success:function(t){},error:function(t,e,i){console.log(i+"\r\n"+t.statusText+"\r\n"+t.responseText)}})},productSimilar:function(){$.ajax({url:base_url+"product/similar",type:"post",data:{_token:_token,product_id:product_id,vendor:vendor,brand:brand},dataType:"json",success:function(t){""!=t.html?($("#zone-bought").html(t.html),$(".elm_similar").show(),productDetail.viewSimilar(),Vnit.lazyLoader()):$(".elm_similar").hide()},error:function(t,e,i){console.log(i+"\r\n"+t.statusText+"\r\n"+t.responseText)}})},viewSimilar:function(){new Swiper("#swiper-similar",{slidesPerView:4,spaceBetween:0,slidesPerGroup:4,navigation:{nextEl:".similar-next",prevEl:".similar-prev"},on:{init:function(){console.log("swiper initialized Similar")}}})},Init:function(){productDetail.productSimilar(),productDetail.slideProduct(),productDetail.loadSticky(),productDetail.scrollProduct(),productDetail.viewHistory(),productDetail.logHistoryView(product_id),Vnit.showMoreContent("#js-description"),Vnit.lazyLoader()}};$(document).ready(function(){productDetail.Init(),$("#js-description img").each(function(){$(this).removeClass().addClass("img-fluid lazy")}),$(".share-control").hover(function(){$(".share-content").show()},function(){$(".share-content").hide()})}),$(document).ready(function(){$('[data-toggle="tooltip"]').tooltip(),$(document).on("click",".lager-inner",function(){productDetail.loadGallery()})});