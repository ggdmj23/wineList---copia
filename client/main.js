import '../imports/ui/body.js';

import '../imports/startup/accounts-config.js';

import { Wines } from '../imports/api/collections.js';

// IRON ROUTER

// APP LAYOUT
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

// COVER
Router.route('/', function(){
    this.render("welcome", {to:"main"});
    //this.render("date_display", {to:"footer"});
});

// MENU
Router.route('/Menu', function(){
    this.render("navbar", {to:"navbar"});
    this.render("Menu", {to:"main"});
    //this.render("date_display", {to:"footer"});
});

// FULL MENU
Router.route('/fullMenu', function(){
    this.render("navbar", {to:"navbar"});
    this.render("fullMenu", {to:"main"});
    //this.render("date_display", {to:"footer"});
});

// USER LIST
Router.route('/userList', function(){
    this.render("navbar", {to:"navbar"});
    this.render("userDisplay", {to:"main"});
    //this.render("date_display", {to:"footer"});
});

// INV
Router.route('/wineInv', function(){
    this.render("navbar", {to:"navbar"});
    this.render("wineInv", {to:"main"});
    //this.render("date_display", {to:"footer"});
});

// MASTER LIST
Router.route('/wineList', function(){
    this.render("navbar", {to:"navbar"});
    this.render("wineDisplay", {to:"main"});
    //this.render("date_display", {to:"footer"});
});

// USERS INFO
Router.route('/usersInfo', function(){
    this.render("navbar", {to:"navbar"});
    this.render("usersInfo", {to:"main"});
    //this.render("date_display", {to:"footer"});
});
 
// SINGLE WINE
Router.route('/wines/:_id', function(){
    
    //console.log("you hit /wines/:_id "+this.params._id);
    
    Session.set("wineid", this.params._id);
    
    this.render("navbar", {
        to:"navbar"
    });
    this.render("headerSingle", {to:"header"});
    
    this.render("singleWine", {
        to:"main",
        data:function(){
            return Wines.findOne({_id:this.params._id});
        }
    }); 
    //this.render("date_display", {to:"footer"});
});

// EDIT WINE
Router.route('/editWine/:_id', function(){
    
    //console.log("you hit /wines/:_id "+this.params._id);
    
    Session.set("wineid", this.params._id);
    
    this.render("navbar", {
        to:"navbar"
    });
    this.render("headerSingleEdit", {to:"header"});
    
    this.render("wineEdit", {
        to:"main",
        data:function(){
            return Wines.findOne({_id:this.params._id});
        }
    }); 
    //this.render("date_display", {to:"footer"});
});

////////////////////////////////////////////////////////

// INFINITE SCROLL

// 2. set a var to limit to 8 the images to load, store itt is session
// 3. then add filter to filters in template images helpers
Session.set("imageLimit", 8);

//4. need to know when scroll down, first remember where were wein the page
lastScrollTop = 0;

//1. detect scroll event 
$(window).scroll(function(event){
    //5. test if we are near the bottom of the page either up or down
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
        //test
        //console.log(new Date());
        //6. test if we are going down only
        var scrollTop = $(this).scrollTop();
        if(scrollTop > lastScrollTop){
            //test
            //console.log("going down");
            //7. set the number of images we want to load when reaching the bottom to whatever was before + 4
           Session.set("imageLimit", Session.get("imageLimit") + 8); 
        }
        lastScrollTop = scrollTop;
    }
});





