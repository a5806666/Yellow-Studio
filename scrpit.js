$(document).ready(()=>{
    opacit_y();
    opacity_nav();
    link_move();
    mouse_move();
});

// explore下滑消失
function opacit_y(){
    $(window).scroll((window_y)=>{
        if ($(window).scrollTop() <= 0){
            $(".explore").addClass("at_top")
        }else{
            $(".explore").removeClass("at_top")
        }
    })
};

// nav 透明
function opacity_nav(){
    $(window).scroll((window_y)=>{
        if ($(window).scrollTop() <= 0){
            $(".navbar.navbar-expand-sm").addClass("bg-light")
            $(".navbar.navbar-expand-sm").addClass("navbar-light")
            $(".navbar.navbar-expand-sm").removeClass("navbar-dark")
        }else{
            $(".navbar.navbar-expand-sm").removeClass("bg-light")
            $(".navbar.navbar-expand-sm").removeClass("navbar-light")
            $(".navbar.navbar-expand-sm").addClass("navbar-dark")
        }
    })
};

//緩慢滑動
function link_move(){
    $(document).on('click', 'a', function(event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
    });
}

// 黃山依照滑鼠移動
function mouse_move(){
    $(window).mousemove((evt)=>{
        let page_x = evt.pageX;
        let page_y = evt.pageY;

        var x = page_x-$("section#section_about").offset().left;
        var y = page_y-$("section#section_about").offset().top;

        $(".mountain").css("transform","translateX("+(page_x/-20+50)+"px)")
        //更新簡介中文字的飄浮位置
        $(".r1text").css("transform","translateX("+y/-5+"px)");
        $(".r2text").css("transform","translateX("+y/-10+"px)");
        $(".r3text").css("transform","translateX("+y/-12+"px)");

        //計算現在的y位置超過區域則隱藏
        if (y<0 ||　y>$("section#section_about").outerHeight())
        $("#cross").css("opacity",0);
            else
        $("#cross").css("opacity",1);

        //更動指標位置
        $("#cross").css("left",x+"px");
        $("#cross").css("top",y+"px");

        //更新三角形
        $(".tri1").css("transform",
        "translateX("+x/-5+"px) rotate(-15deg)");
        $(".tri2").css("transform",
        "translateX("+x/-10+"px) rotate(-15deg)");
        $(".tri3").css("transform",
        "translateX("+x/-12+"px) rotate(-15deg)");
        $(".tri4").css("transform",
        "translateX("+x/-14+"px) rotate(-15deg)");
        $(".tri5").css("transform",
         "translateX("+x/-16+"px) rotate(-15deg)");

         //計算貓的中心位置
        var catplace = $("#cat").offset().left +$("#cat").width()/2;
        var cattop = $("#cat").offset().top;
        
        var img_url="http://awiclass.monoame.com/catpic/";

         //左方 / 右方 / 上方
        if (page_x<catplace - 50)
        $("#cat").attr("src",img_url+"cat_left.png");
        else if (page_x>catplace  + 50)
        $("#cat").attr("src",img_url+"cat_right.png");
        else
        $("#cat").attr("src",img_url+"cat_top.png");

        //左上 / 右上
        if (page_x<catplace - 50 && page_y< cattop)
        $("#cat").attr("src",img_url+"cat_lefttop.png");
        if (page_x>catplace + 50 && page_y< cattop)
        $("#cat").attr("src",img_url+"cat_righttop.png");

        //站起來的貓咪
        // console.log(x);
        up_cat("#cat_yellow",page_x);
        up_cat("#cat_blue",page_x);
        up_cat("#cat_grey",page_x);
            })
}

//偵測進入貓咪範圍就站起來
function up_cat(cat_id,x){
    var catplace = $(cat_id).offset().left+$(cat_id).width()/2;
    if (Math.abs(x-catplace)<80)
      $(cat_id).css("bottom","0px");
    else
      $(cat_id).css("bottom","-50px");
  }
// vue.js
var vm = new Vue({
    el: "#app",
    data: {
      works: []
    },
    mounted: function(){
      var vobj=this;
      $.ajax({
        url: "https://awiclass.monoame.com/api/command.php?type=get&name=projects",
        success: function(res){
          vobj.works=JSON.parse(res)
        }
      })
    }
  })