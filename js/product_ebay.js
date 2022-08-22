let productEbay = {};
productEbay.ebayOption = function (){
    let image_active = 0;
    let pic_select = {};
    $(".msku-sel").change(function(){
        if($(this).data('name') == 'Color' || $(this).data('name') == 'Colors'){
            pic_name_select = $(this).find(':selected').data('text');
            if(color_pic[pic_name_select]){
                pic_select = color_pic[pic_name_select];
            }else{
                pic_select = images_list;
            }

        }
        $(this).prop('selected', true);
        let cb_1 = [];
        let new_menu = [];
        let name = $(this).attr('name');
        let value = $(this).val();
        let id_menu_select = $(this).attr('id');

        for(let i = 0; i < Object.keys(menu).length; i++){
            let key = Object.keys(menu)[i];
            let item = menu[key];
            if(item['traitValuesMap'][name] == value){
                cb_1.push(key);
            }
        }

        for (k = 0; k < cb_1.length; k++) {
            for (i = 0; i < menuItemMap.length; i++) {
                item_map = menuItemMap[i];
                if(in_array(cb_1[k],item_map['matchingletiationIds'])){
                    if(!in_array(item_map.valueId, new_menu)){
                        new_menu.push(item_map.valueId);
                    }
                }
            }
        }
        let new_zone = {};
        $(".msku-sel").each(function(){
            let this_ = $(this);
            let id_menu = this_.attr('id');
            let name_menu = this_.attr('name');
            if(value == '-1'){
                this_.find('option').each(function(){
                    $(this).prop('selected', false);
                    $(this).removeAttr('disabled');
                });
            }else{
                if(id_menu_select != id_menu){
                    this_.find('option').each(function(){
                        let value = $(this).val();
                        if(value != -1){
                            if(!in_array(value, new_menu)){
                                $(this).attr('disabled','disabled');
                                $(this).prop('selected', false);
                            }else{
                                $(this).removeAttr('disabled');
                            }
                        }
                    });
                }
                if(this_.find('option:selected')){
                    if(this_.find('option:selected').val() != -1){
                        new_zone[name_menu] = parseInt(this_.find('option:selected').val());
                    }
                }
            }
            for(i = 0; i < Object.keys(menu).length; i++){
                key = Object.keys(menu)[i];
                item = menu[key];
                let sbc = equals(item['traitValuesMap'],new_zone);
                if( sbc){
                    select_menu = item;
                    console.log(select_menu);
                }
            }
        });

        // Map html
        //if(Object.keys(select_menu.length) > 0){
        let qty_available = 0;
        if(select_menu.qty && select_menu.qty > 0) {
            qty_available = select_menu.qty - select_menu.sold;
            $("#qty_available").text(qty_available);
            $("#qty_sold").text(select_menu.sold);
            $("#current_price").text(number_format(select_menu.price_convert, 0, '.', ','));
            let str_qty = '<option value="0">Số lượng</option>';
            for (i = 1; i <= qty_available; i++) {
                str_qty += '<option value="' + i + '">' + i + '</option>';
            }
            $("#qty").html(str_qty);
            if (qty_available <= 0) {
                $("#qty").prop('disabled', true);
                $(".buy-now, .add-cart").prop('disabled', true);
                $(".product-qty-warning").show();
            } else {
                $("#qty").prop('disabled', false);
                $(".buy-now, .add-cart").prop('disabled', false);
                $(".product-qty-warning").hide();
            }
        } else{
            qty_available = 0;
            $("#qty_available").text(qty_available);
            $("#qty_sold").text(select_menu.sold);
            let str_qty = '<option value="0">Số lượng</option>';
            $("#qty").html(str_qty);
            if(qty_available <= 0){
                $("#qty").prop('disabled', true);
                $(".buy-now, .add-cart").prop('disabled', true);
                $(".product-qty-warning").show();
            }else{
                $("#qty").prop('disabled', false);
                $(".buy-now, .add-cart").prop('disabled', false);
                $(".product-qty-warning").hide();
            }
        }

        if(pic_select && Object.keys(pic_select).length > 0) {

            $(".slide-lager .swiper-wrapper").html('');
            $(".slide-thumb .swiper-wrapper").html('');
            for (i = 0; i < Object.keys(pic_select).length; i++) {
                $(".slide-thumb .swiper-wrapper").append('<div class="swiper-slide"><div class="thumb-item" data-target="'+i+'"><img src="' + pic_select[i] + '" class="img-fluid owl-lazy" data-src="' + pic_select[i] + '"></div></div>');
                $(".slide-lager .swiper-wrapper").append('<div class="swiper-slide"><a href="javascript:;" class="lager-inner"><div href="' + pic_select[i] + '" class="lager-item" data-max="' + pic_select[i] + '"  data-thumb="' + pic_select[i] + '"><img src="' + pic_select[i] + '" class="img-fluid owl-lazy" data-src="' + pic_select[i] + '"></div></a></div>');
            }

            productDetail.slideProduct();
        }
    });
}
productEbay.init = function (){
    productEbay.ebayOption();
}
$(document).ready(function(){
    productEbay.Init();
})