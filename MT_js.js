var control_offset = -120;
// - 173
// + 61
var thumb_count = 0;

var selected_thumb = "";
var selected_title = "";
var selected_desc = "";

function expandMenu(){
    var bot_coor = parseInt(get_style_val("control", "bottom"));
    
    if (bot_coor == control_offset){
        document.getElementById("control").style.bottom = "0px";
    }else{
        document.getElementById("control").style.bottom = control_offset + "px";
    }
}

function changeColor(){
    if(selected_thumb != ""){
        document.getElementById(selected_title).style.color = document.getElementById("ctrl_color").value;
        document.getElementById(selected_desc).style.color = document.getElementById("ctrl_color").value
    }else{
        document.getElementById("title").style.color = document.getElementById("ctrl_color").value;
        document.getElementById("description").style.color = document.getElementById("ctrl_color").value
    }
    
}

function changeDescription(){
    if(selected_thumb != ""){
        document.getElementById(selected_desc).innerHTML = document.getElementById("desc_text").value;
    }else{
        document.getElementById("description").innerHTML = document.getElementById("desc_text").value;
    }
    
}

function changeTitle(){
    if(selected_thumb != ""){
        document.getElementById(selected_title).innerHTML = document.getElementById("title_text").value;
    }else{
        document.getElementById("title").innerHTML = document.getElementById("title_text").value;
    }
    
}

function changeBG(source_url){
    if(selected_thumb != ""){
        document.getElementById(selected_thumb).style.background = "url('"+ source_url+ "')"
    }else{
        document.getElementById("background").style.background = "url('"+ source_url+ "')"
    }
    
}

function moveBG(keyCode){
    var coor_array = get_curr_bg_coor();
    var parsed_x_coor = parseInt(coor_array[0]);
    var parsed_y_coor = parseInt(coor_array[1]);
    var curr_bg_height = parseInt(get_style_val("background", "height"));
    console.log(parsed_x_coor);
    console.log(parsed_y_coor);
    
    var ctrl_target = document.getElementById("background");
    if(selected_thumb != ""){
        ctrl_target = document.getElementById(selected_thumb);
        
    }
    if(keyCode == 38){
        parsed_y_coor -= 10;
        ctrl_target.style.backgroundPosition = parsed_x_coor + "px " + parsed_y_coor + "px";
    }else if(keyCode == 40){
        parsed_y_coor += 10;
        ctrl_target.style.backgroundPosition = parsed_x_coor + "px " + parsed_y_coor + "px";
    }else if(keyCode == 39){
        parsed_x_coor += 10;
        ctrl_target.style.backgroundPosition = parsed_x_coor + "px " + parsed_y_coor + "px";
    }else if(keyCode == 37){
             parsed_x_coor -= 10;
        ctrl_target.style.backgroundPosition = parsed_x_coor + "px " + parsed_y_coor + "px";
    }else if(keyCode == 173){
        curr_bg_height -= 10;
        ctrl_target.style.height = curr_bg_height + "px";
    }else if(keyCode == 61){
        curr_bg_height += 10;
        ctrl_target.style.height = curr_bg_height + "px";
    }
}

function get_style_val (ID, attribute){
    var result = window.getComputedStyle(document.getElementById(ID)).getPropertyValue(attribute)
    
    return result;
}

function get_curr_bg_coor(){
    var raw_coor = "";
    var split_coors = [];
    if(selected_thumb != ""){
        raw_coor = get_style_val (selected_thumb, "background-position");
        split_coors = raw_coor.split(' ');
    }else{
        raw_coor = get_style_val ("background", "background-position");
        split_coors = raw_coor.split(' ');
    }
    
    
    return split_coors
}

function check_change_bg_url(input_str){
    
    var horse_check = input_str.indexOf("horse");
    var night_check = input_str.indexOf("night");
    var mountain_check = input_str.indexOf("mountain");
    var epic_check = input_str.indexOf("epic");
    
    var check_result = true;
    if(epic_check != -1){
        changeBG("img/bg4.jpg");
        check_result = false;
    }else if(horse_check != -1){
        changeBG("img/bg1.jpg");
        check_result = false;
        
    }else if(night_check != -1){
        changeBG("img/bg2.jpg");
        check_result = false;
    }else if(mountain_check != -1){
        changeBG("img/bg3.jpg");
        check_result = false;
    }
    return check_result;    
}

function create_thumb(){
    thumb_count += 1;
    nDiv = document.createElement("div");
    nDivT = document.createElement("div");
    nDivD = document.createElement("div");
    
    nDiv.className = "thumbnail col-12 col-xm-12 col-sm-6 col-md-4 col-lg-3";
    nDivT.className = "imgTitle";
    nDivD.className = "imgDesc";
     
    nDiv.id = "thumb_img_" + thumb_count;
    nDivT.id = "thumb_title_" + thumb_count;
    nDivD.id = "thumb_Desc_" + thumb_count;
    
    var copy_img = document.getElementById("background");
    var copy_title = document.getElementById("title");
    var copty_desc = document.getElementById("description");
    
    if(selected_thumb != ""){
        copy_img = document.getElementById(selected_thumb);
        copy_title = document.getElementById(selected_title);
        copty_desc = document.getElementById(selected_desc);
    }
    
    nDiv.style.background = copy_img.style.background;
    nDivT.innerHTML = copy_title.innerHTML;
    nDivD.innerHTML = copty_desc.innerHTML;
    
    nDivT.style.color = copy_title.style.color;
    nDivD.style.color = copty_desc.style.color;
    
    nDiv.onclick = function(){change_selection(nDiv.id)};
    
    document.getElementById("display").appendChild (nDiv);
    nDiv.appendChild (nDivT);
    nDiv.appendChild (nDivD);
    
    selected_thumb = nDiv.id;
    selected_desc = nDivD.id;
    selected_title = nDivT.id;
}

function change_selection(item_id){
    selected_thumb = item_id;
}



document.getElementById("ctrl_toggle").addEventListener("click", function(){
    expandMenu();
    
});

document.getElementById("bg_url").addEventListener("keyup", function(ev){
    if(ev.keyCode == 13){
        if(check_change_bg_url(document.getElementById("bg_url").value)){
            changeBG(document.getElementById("bg_url").value);
        }
        
    }
});

document.getElementById("title_text").addEventListener("keydown", function(ev){
    changeTitle();
});

document.getElementById("title_text").addEventListener("keyup", function(ev){
    changeTitle();
});

document.getElementById("desc_text").addEventListener("keydown", function(ev){
    changeDescription();
});

document.getElementById("desc_text").addEventListener("keyup", function(ev){
    changeDescription();
});

document.getElementById("ctrl_color").addEventListener("change", function(){
    changeColor();
});

document.body.addEventListener("keydown", function(ev){
    moveBG(ev.keyCode);
    
});

document.getElementById("add_thumb_butt").addEventListener("click", function(){
    create_thumb()
        
    
});