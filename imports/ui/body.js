import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Wines } from '../api/collections.js';
import './body.html';
import './templates.html';
import './templates.js';

///////////////////
// SUBSCRIPTIONS //
///////////////////

Template.Menu.onCreated(function MenuOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('wines');
});

Template.fullMenu.onCreated(function fullMenuOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('wines');
});

Template.wineFull.onCreated(function wineFullOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('wines');
});

Template.userDisplay.onCreated(function userDisplayOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('wines');
});

Template.wineDisplay.onCreated(function wineDisplayOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('wines');
    
    Meteor.subscribe("userList");
});

Template.wineInv.onCreated(function wineInvOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('wines');
});

////////////////////
// NAVBAR HELPERS //
////////////////////

Template.navbar.helpers({
    
    winesCount() {
        return Wines.find({}).count();
    },
    
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "User List";
        }
    },
    
    email:function(){
        //console.log(Meteor.user().emails[0].address);
        if(Meteor.user()){
            return Meteor.user().emails[0].address;
        }
        else{
            return "Please log in";
        }
    },
});

// NAVBAR EVENTS

Template.navbar.events({
    
    'click .js-show-image-form':function(event){
        $("#image_add_form").modal('show');
    },
    
    'submit .new-wine'(event) {
          // Prevent default browser form submit
          event.preventDefault();
          var w_img, w_name, w_producer, w_vintage, w_price, w_do, w_variety, w_text, createdAt, w_type, w_country, w_region, w_cost, w_supplier, w_abv, w_cl, w_qty, w_ref;
          // Get value from form element
          w_img = event.target.w_img.value;
          w_name = event.target.w_name.value;
          w_producer = event.target.w_producer.value;
          w_vintage = parseInt(event.target.w_vintage.value); 
          w_price = parseFloat(event.target.w_price.value);  
          w_do = event.target.w_do.value;  
          w_variety = event.target.w_variety.value;  
          w_text = event.target.w_text.value; 

          createdAt = new Date();

          w_type = event.target.w_type.value;    
          w_country = event.target.w_country.value;
          w_region = event.target.w_region.value;
          w_cost = parseFloat(event.target.w_cost.value);
          w_supplier = event.target.w_supplier.value; 
          w_abv = parseFloat(event.target.w_abv.value);  
          w_cl = parseInt(event.target.w_cl.value);  
          w_ref = parseInt(event.target.w_ref.value);  
          w_qty = parseInt(event.target.w_qty.value);  
      
            Meteor.call('wines.insert', w_img, w_name, w_producer, w_vintage, w_price, w_do, w_variety, w_text, createdAt, w_type, w_country, w_region, w_cost, w_supplier, w_abv, w_cl, w_qty, w_ref);
       
              event.target.w_img.value = '';  
              event.target.w_name.value = '';
              event.target.w_producer.value = '';  
              event.target.w_vintage.value = '';
              event.target.w_price.value = '';  
              event.target.w_do.value = '';   
              event.target.w_variety.value = '';  
              event.target.w_text.value = '';

              event.target.w_type.value = '';   
              event.target.w_country.value = ''; 
              event.target.w_region.value = '';   
              event.target.w_cost.value = '';
              event.target.w_supplier.value = '';  
              event.target.w_abv.value = '';
              event.target.w_cl.value = '';  
              event.target.w_ref.value = '';  
              event.target.w_qty.value = '';  

              $("#image_add_form").modal('hide');  
        },
});

//////////////////
// MENU HELPERS //
//////////////////

Template.Menu.helpers({
    
    wines() {
        if(Session.get('selectedUser') && Session.get('selectedType') && Session.get('selectedDO') && Session.get('selectedCountry')){
            return Wines.find({ createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_do: Session.get('selectedDO'), w_country: Session.get('selectedCountry'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedUser') && Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({ createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedUser') && Session.get('selectedType') && Session.get('selectedCountry')){
            return Wines.find({ createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_country: Session.get('selectedCountry'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedUser') && Session.get('selectedCountry') && Session.get('selectedDO')){
            return Wines.find({ createdBy: Session.get('selectedUser'), w_country: Session.get("selectedCountry"), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedCountry') && Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({ w_country: Session.get('selectedCountry'), w_type: Session.get("selectedType"), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedUser') && Session.get('selectedType')){
            return Wines.find({ createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedUser') && Session.get('selectedDO')){
            return Wines.find({ createdBy: Session.get('selectedUser'), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({ w_type: Session.get("selectedType"), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedUser') && Session.get('selectedCountry')){
            return Wines.find({ createdBy: Session.get('selectedUser'), w_country: Session.get("selectedCountry"), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedType') && Session.get('selectedCountry')){
            return Wines.find({ w_type: Session.get("selectedType"), w_country: Session.get('selectedCountry'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedCountry') && Session.get('selectedDO')){
            return Wines.find({ w_country: Session.get("selectedCountry"), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedUser')){
            return Wines.find({ createdBy: Session.get('selectedUser'), checked: { $ne: true } }, { sort: { w_type: 1, createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
        }    
        
        if(Session.get('selectedType')){
            return Wines.find({ w_type: Session.get("selectedType"), checked: { $ne: true } }, { sort: { w_type: 1, createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({ w_country: Session.get("selectedCountry"), checked: { $ne: true } }, { sort: { w_type: 1, createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({ w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
        }
        
        else{
            return Wines.find({  checked: { $ne: true } }, { sort: { w_type: 1, createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
        }
    },
    
    loggedusername:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
        
    getFilterUser:function(){
        if(Session.get("selectedUser")){
        var user = Meteor.users.findOne({_id:Session.get("selectedUser")});    
            return user.username;
        }
        else{
            return "Wine";
        }
    },
    
    getFilterType:function(){
        var w_type = Session.get("selectedType");    
        
        if(Session.get("selectedType")&&(w_type == "Copas")){
            return "By the Glass";
        }
        if(Session.get("selectedType")&&(w_type == "Generoso")){
            return "Fortified";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso")){
            return "Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso Rosado")){
            return "Rose Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Blanco")){
            return "White";
        }
        if(Session.get("selectedType")&&(w_type == "Rosado")){
            return "Rose";
        }
        if(Session.get("selectedType")&&(w_type == "Tinto")){
            return "Red";
        }
        if(Session.get("selectedType")&&(w_type == "Dulce")){
            return "Sweet";
        }
        else{
            return "All";
        }
    },    
    
    getFilterCountry:function(){
        var w_country = Session.get("selectedCountry");    
        
        if(Session.get("selectedCountry")&&(w_country == "España")){
            return "Spain";
        }
        if(Session.get("selectedCountry")&&(w_country == "Francia")){
            return "France";
        }
        if(Session.get("selectedCountry")&&(w_country == "Italia")){
            return "Italy";
        }
        if(Session.get("selectedCountry")&&(w_country == "Alemania")){
            return "Germany";
        }
        if(Session.get("selectedCountry")&&(w_country == "Portugal")){
            return "Portugal";
        }
        else{
            return "All";
        }
    },    
    
    getFilterDO:function(){
        var w_do = Session.get("selectedDO"); 
        if(Session.get("selectedDO")){
           return w_do;
        }
        else{
            return "All";
        }
    },
    
    filtering_users:function(){
        if(Session.get("selectedUser")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_country:function(){
        if(Session.get("selectedCountry")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_DO:function(){
        if(Session.get("selectedDO")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
// MENU COUNTERS
    
    userCount() {
        if(Session.get("selectedUser")){
            return Wines.find({createdBy: Session.get("selectedUser")}).count() - Wines.find({createdBy: Session.get("selectedUser"), checked: true}).count();
        }
        else{
            return Wines.find({}).count()-Wines.find({checked: true}).count();
        }
    },
    
    filterTypeCount() {
        if(Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count() - Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
                
        if(Session.get("selectedType")){
            return Wines.find({ w_type: Session.get("selectedType")}).count() - Wines.find({ w_type: Session.get("selectedType"), checked: true}).count();
        }
        else{
            return Wines.find({}).count() - Wines.find({ checked: true}).count();
        }
    }, 
    
    filterCountryCount() {
        if(Session.get("selectedType") && Session.get("selectedUser") && Session.get("selectedCountry")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        if(Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser") && Session.get("selectedCountry")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_country: Session.get("selectedCountry")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        if(Session.get("selectedType") && Session.get("selectedCountry")){
            return Wines.find({w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry")}).count() - Wines.find({w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count() - Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
                
        if(Session.get("selectedType")){
            return Wines.find({ w_type: Session.get("selectedType")}).count() - Wines.find({ w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedCountry")){
            return Wines.find({ w_country: Session.get("selectedCountry")}).count() - Wines.find({ w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        else{
            return Wines.find({}).count() - Wines.find({ checked: true}).count();
        }
    }, 
    
    filterDOCount() {
        if(Session.get("selectedDO") && Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedType")){
            return Wines.find({w_do:Session.get("selectedDO"), w_type: Session.get("selectedType")}).count() - Wines.find({w_do: Session.get("selectedDO"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser") && Session.get("selectedType")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count() - Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
        
        if(Session.get("selectedType")){
            return Wines.find({w_type:Session.get("selectedType")}).count() - Wines.find({w_type:Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedDO")){
            return Wines.find({w_do: Session.get("selectedDO")}).count() - Wines.find({w_do: Session.get("selectedDO"), checked: true}).count();
        }
        else{
            return Wines.find({}).count() - Wines.find({checked: true}).count();
        }
    },     
});

// MENU EVENTS

Template.Menu.events({
    
});

/////////////////////
// SIDENAV HELPERS //
/////////////////////

Template.sidenav.helpers({
    /*
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Menu";
        }
    },
    */
    
    user: function(){
        return Meteor.users.find();
    },
    
    loggedusername:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
    
    getFilterUser:function(){
        if(Session.get("selectedUser")){
        var user = Meteor.users.findOne({_id:Session.get("selectedUser")});    
            return user.username;
        }
        else{
            return "Full";
        }
    },
    
    getFilterType:function(){
        var w_type = Session.get("selectedType");    
        
        if(Session.get("selectedType")&&(w_type == "Copas")){
            return "By the Glass";
        }
        if(Session.get("selectedType")&&(w_type == "Generoso")){
            return "Fortified";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso")){
            return "Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso Rosado")){
            return "Rose Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Blanco")){
            return "White";
        }
        if(Session.get("selectedType")&&(w_type == "Rosado")){
            return "Rose";
        }
        if(Session.get("selectedType")&&(w_type == "Tinto")){
            return "Red";
        }
        if(Session.get("selectedType")&&(w_type == "Dulce")){
            return "Sweet";
        }
        else{
            return "All";
        }
    },
    
    getFilterDO:function(){
        var w_do = Session.get("selectedDO"); 
        if(Session.get("selectedDO")){
           return w_do;
        }
        else{
            return "All";
        }
    },
    
    filtering_users:function(){
        if(Session.get("selectedUser")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
 
// SIDENAV COUNTERS    

    userCount() {
        if(Session.get("selectedUser")){
            return Wines.find({createdBy: Session.get("selectedUser")}).count() - Wines.find({createdBy: Session.get("selectedUser"), checked: true}).count();
        }
        else{
            return Wines.find({}).count()-Wines.find({checked: true}).count();
        }
    },
    
    filterTypeCount() {
        if(Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count() - Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
                
        if(Session.get("selectedType")){
            return Wines.find({ w_type: Session.get("selectedType")}).count() - Wines.find({ w_type: Session.get("selectedType"), checked: true}).count();
        }
        else{
            return Wines.find({}).count() - Wines.find({ checked: true}).count();
        }
    }, 
    
    filterDOCount() {
        if(Session.get("selectedDO") && Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedType")){
            return Wines.find({w_do:Session.get("selectedDO"), w_type: Session.get("selectedType")}).count() - Wines.find({w_do: Session.get("selectedDO"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser") && Session.get("selectedType")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count() - Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
        
        if(Session.get("selectedType")){
            return Wines.find({w_type:Session.get("selectedType")}).count() - Wines.find({w_type:Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedDO")){
            return Wines.find({w_do: Session.get("selectedDO")}).count() - Wines.find({w_do: Session.get("selectedDO"), checked: true}).count();
        }
        else{
            return Wines.find({}).count() - Wines.find({checked: true}).count();
        }
    },     
});

// SIDENAV EVENTS

Template.sidenav.events({
    
    'click .openNav'(event) {
        $("#mySidenav").css({"width":"220px"});
        $(".wine-row").css({"margin-left":"180px"});
    },
    
    'click .closeNav'(event) {
        $("#mySidenav").css({"width":"0px"});
        $(".wine-row").css({"margin-left":"13px"});
    },
        
    'change .selectUsers': function (event) {
        var w_user = $(event.currentTarget).val();
        Session.set('selectedUser', w_user);
    },
    
    'click .unfilterUsers':function(event){
        Session.set('selectedUser', undefined);
    }, 
    
    'change .selectTypes': function (event) {
        var w_type = $(event.currentTarget).val();
        Session.set('selectedType', w_type);
    },
    
    'click .unfilterTypes':function(event){
        Session.set('selectedType', undefined);
    }, 
    
    'change .selectCountry': function (event) {
        var w_country = $(event.currentTarget).val();
        Session.set('selectedCountry', w_country);
    },
    
    'click .unfilterCountry':function(event){
        Session.set('selectedCountry', undefined);
    }, 
    
    'change .selectDO': function (event) {
        var w_do = $(event.currentTarget).val();
        Session.set('selectedDO', w_do);
    },
    
    'click .unfilterDO':function(event){
        Session.set('selectedDO', undefined);
    }, 
});

////////////////////
// MENU THUMBNAIL //
////////////////////

Template.wineFull.events({
    
    'click .js-rate-wine':function(event){
        console.log('you have clicked a star');
        var rating = $(event.currentTarget).data("userrating");
        console.log(rating);
        var wine_id = this.id;
        console.log(wine_id);
        
        Wines.update({_id:wine_id}, {$set: {rating:rating}});
    },
}); 

///////////////////////
// FULL MENU HELPERS //
///////////////////////

Template.fullMenu.helpers({
    
    wines() {
        if(Session.get('selectedType') && Session.get('selectedDO') && Session.get('selectedCountry')){
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get('selectedDO'), w_country: Session.get('selectedCountry'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }  
        
        if(Session.get('selectedType') && Session.get('selectedCountry')){
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_country: Session.get('selectedCountry'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }  
        
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }  
        
        if(Session.get('selectedCountry') && Session.get('selectedDO')){
            return Wines.find({ createdBy: Meteor.userId(), w_country: Session.get('selectedCountry'), w_do: Session.get("selectedDO"), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if(Session.get('selectedType')){
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType"), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({ createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({ createdBy: Meteor.userId(), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
            }
        
        else{
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true } }, { sort: { w_type: 1, createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
        }
    },
    
    users: function(){
      return Meteor.users.find();
    },
    
    loggedusername:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
    
    getFilterUser:function(){
        if(Session.get("selectedUser")){
        var user = Meteor.users.findOne({_id:Session.get("selectedUser")});    
            return user.username;
        }
        else{
            return false;
        }
    },
    
    getFilterType:function(){
        var w_type = Session.get("selectedType");    
        
        if(Session.get("selectedType")&&(w_type == "Copas")){
            return "By the Glass";
        }
        if(Session.get("selectedType")&&(w_type == "Generoso")){
            return "Fortified";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso")){
            return "Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso Rosado")){
            return "Rose Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Blanco")){
            return "White";
        }
        if(Session.get("selectedType")&&(w_type == "Rosado")){
            return "Rose";
        }
        if(Session.get("selectedType")&&(w_type == "Tinto")){
            return "Red";
        }
        if(Session.get("selectedType")&&(w_type == "Dulce")){
            return "Sweet";
        }
        else{
            return " ";
        }
    },
    
    getFilterCountry:function(){
        var w_country = Session.get("selectedCountry");    
        
        if(Session.get("selectedCountry")&&(w_country == "España")){
            return "Spain";
        }
        if(Session.get("selectedCountry")&&(w_country == "Francia")){
            return "France";
        }
        if(Session.get("selectedCountry")&&(w_country == "Italia")){
            return "Italy";
        }
        if(Session.get("selectedCountry")&&(w_country == "Alemania")){
            return "Germany";
        }
        if(Session.get("selectedCountry")&&(w_country == "Portugal")){
            return "Portugal";
        }
        else{
            return "All";
        }
    },    
    
    getFilterDO:function(){
        var w_do = Session.get("selectedDO"); 
        if(Session.get("selectedDO")){
           return w_do;
        }
        else{
            return "All";
        }
    },
    
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_country:function(){
        if(Session.get("selectedCountry")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_DO:function(){
        if(Session.get("selectedDO")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
// FULL MENU COUNTERS
    
    userCount() {
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
    },
    
    filterTypeCount() {
        if(Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), checked: true}).count();
        }
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    }, 
    
    filterCountryCount() {
        if(Session.get('selectedCountry') && Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry")}).count() - Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    }, 
    
    filterDOCount() {
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    },
});

// FULL MENU EVENTS

Template.fullMenu.events({
    
});

//////////////////////////
// FULL SIDENAV HELPERS //
//////////////////////////

Template.sidenavFull.helpers({
    
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Menu";
        }
    },
    
    getFilterType:function(){        
        var w_type = Session.get("selectedType");    
        //console.log(w_type);
        
        if(Session.get("selectedType")&&(w_type == "Copas")){
            return "By the Glass";
        }
        if(Session.get("selectedType")&&(w_type == "Generoso")){
            return "Fortified";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso")){
            return "Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso Rosado")){
            return "Rose Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Blanco")){
            return "White";
        }
        if(Session.get("selectedType")&&(w_type == "Rosado")){
            return "Rose";
        }
        if(Session.get("selectedType")&&(w_type == "Tinto")){
            return "Red";
        }
        if(Session.get("selectedType")&&(w_type == "Dulce")){
            return "Sweet";
        }
        else{
            return "All";
        }
    },
    
    getFilterDO:function(){
        var w_do = Session.get("selectedDO"); 
        if(Session.get("selectedDO")){
           return w_do;
        }
        else{
            return "All";
        }
    },
    
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
// FULL SIDENAV COUNTERS
    
    userCount() {
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
    },
    
    filterTypeCount() {
        if(Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    }, 
    
    filterDOCount() {
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    },
});
        
// FULL SIDENAV EVENTS

Template.sidenavFull.events({
    
    'click .openNavFull'(event) {
        $("#mySidenavFull").css({"width":"220px"});
        $(".wine-row").css({"margin-left":"180px"});
    },
    
    'click .closeNavFull'(event) {
        $("#mySidenavFull").css({"width":"0px"});
        $(".wine-row").css({"margin-left":"13px"});
    },
    
    'change .selectTypes': function (event) {
        var w_type = $(event.currentTarget).val();
        Session.set('selectedType', w_type);
    },
    
    'click .unfilterTypes':function(event){
        Session.set('selectedType', undefined);
    },
    
    'change .selectCountry': function (event) {
        var w_country = $(event.currentTarget).val();
        Session.set('selectedCountry', w_country);
    },
    
    'click .unfilterCountry':function(event){
        Session.set('selectedCountry', undefined);
    }, 
    
    'change .selectDO': function (event) {
        var w_do = $(event.currentTarget).val();
        Session.set('selectedDO', w_do);
    },
    
    'click .unfilterDO':function(event){
        Session.set('selectedDO', undefined);
    }, 
});

//////////////////
// LIST HELPERS //
//////////////////

Template.userDisplay.helpers({
    
    wines: function() {
        const instance = Template.instance();
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType") && Session.get("selectedCountry") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType") && Session.get("selectedCountry")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedCountry") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedCountry") && Session.get("selectedType") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_type: Session.get("selectedType") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedCountry")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedType") && Session.get("selectedCountry")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedCountry") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedType") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted')) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true } }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if(Session.get("selectedType")){
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }
        
        if(Session.get("selectedCountry")){
            return Wines.find({ createdBy: Meteor.userId(), w_country: Session.get("selectedCountry")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }
        
        if(Session.get("selectedDO")){
            return Wines.find({ createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}, {sort:{createdAt:-1},limit:Session.get("imageLimit")});
        }
    },
    
    users: function(){
      return Meteor.users.find();
    },
    
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
    
    getFilterUser:function(){
        if(Session.get("userFilter")){
        var user = Meteor.users.findOne({_id:Session.get("userFilter")});    
            return user.username;
        }
        else{
            return false;
        }
    },
    
    getFilterCountry:function(){
        var w_country = Session.get("selectedCountry");    
        
        if(Session.get("selectedCountry")&&(w_country == "España")){
            return "Spain";
        }
        if(Session.get("selectedCountry")&&(w_country == "Francia")){
            return "France";
        }
        if(Session.get("selectedCountry")&&(w_country == "Italia")){
            return "Italy";
        }
        if(Session.get("selectedCountry")&&(w_country == "Alemania")){
            return "Germany";
        }
        if(Session.get("selectedCountry")&&(w_country == "Portugal")){
            return "Portugal";
        }
        else{
            return "All";
        }
    },    
    
    userFilterCount() {
        return Wines.find({createdBy:Session.get("userFilter")}).count();
      },   
    
    availableWines() {
        return Wines.find({createdBy:Meteor.userId()}).count()-Wines.find({createdBy:Meteor.userId(), checked: true}).count();
    },
   
    unavailableWines() {
        return Wines.find({createdBy:Meteor.userId(), checked: true}).count();
    },
     
    userCount() {
        if(Meteor.user()){
            return Wines.find({createdBy:Meteor.userId()}).count();
        }
        else{
            return "Please log in";
        }
    },     
    
    getFilterType:function(){
        var w_type = Session.get("selectedType");    
        
        if(Session.get("selectedType")&&(w_type == "Copas")){
            return "By the Glass";
        }
        if(Session.get("selectedType")&&(w_type == "Generoso")){
            return "Fortified";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso")){
            return "Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso Rosado")){
            return "Rose Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Blanco")){
            return "White";
        }
        if(Session.get("selectedType")&&(w_type == "Rosado")){
            return "Rose";
        }
        if(Session.get("selectedType")&&(w_type == "Tinto")){
            return "Red";
        }
        if(Session.get("selectedType")&&(w_type == "Dulce")){
            return "Sweet";
        }
        else{
            return "All";
        }
    },
    
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_country:function(){
        if(Session.get("selectedCountry")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    getFilterDO:function(){
        var w_do = Session.get("selectedDO"); 
        if(Session.get("selectedDO")){
           return w_do;
        }
        else{
            return "All";
        }
    },
    
    filtering_DO:function(){
        if(Session.get("selectedDO")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
// LIST COUNTERS   
    
    totalTypeCount() {
        return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType")}).count();
    }, 
    
    typeCount() {
        return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy:Meteor.userId(), w_type: Session.get("selectedType"), checked: true}).count();
    }, 
    
    notTypeCount() {
        return Wines.find({createdBy:Meteor.userId(), w_type: Session.get("selectedType"), checked: true}).count();
    },
    
    totalCountryCount() {
        if(Session.get('selectedCountry') && Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType")}).count();
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry")}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count();
        }
    },
    
    countryCount() {
        if(Session.get('selectedCountry') && Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry")}).count() - Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    }, 
    
    notCountryCount() {
        if(Session.get('selectedCountry') && Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    },
    
    totalDoCount() {
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count();
        }
    }, 
    
    doCount() {
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    }, 
    
    notDoCount() {
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    },
});

// LIST EVENTS

Template.userDisplay.events({
    
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});

//////////////////////////
// LIST SIDENAV HELPERS //
//////////////////////////

Template.sidenavList.helpers({
    
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Wine-List";
        }
    },
    
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
});
        
// LIST SIDENAV EVENTS

Template.sidenavList.events({
    
    'click .openNav2'(event) {
        $("#mySidenav").css({"width":"220px"});
        $(".wine-row").css({"margin-left":"180px"});
        $(".containerTable").css({"margin-left":"220px"});
    },
    
    'click .closeNav2'(event) {
        $("#mySidenav").css({"width":"0px"});
        $(".wine-row").css({"margin-left":"13px"});
        $(".containerTable").css({"margin-left":"0px"});
    },
    
    'change .selectTypes': function (event) {
        var w_type = $(event.currentTarget).val();
        Session.set('selectedType', w_type);
    },
    
    'click .unfilterTypes':function(event){
        Session.set('selectedType', undefined);
    }, 
    
    'change .selectCountry': function (event) {
        var w_country = $(event.currentTarget).val();
        Session.set('selectedCountry', w_country);
    },
    
    'click .unfilterCountry':function(event){
        Session.set('selectedCountry', undefined);
    }, 
    
    'change .selectDO': function (event) {
        var w_do = $(event.currentTarget).val();
        Session.set('selectedDO', w_do);
    },
    
    'click .unfilterDO':function(event){
        Session.set('selectedDO', undefined);
    }, 
});

////////////////////
// MASTER HELPERS //
////////////////////

Template.wineDisplay.helpers({
    
    wines:function(){
        const instance = Template.instance();
        
        if(instance.state.get('hideCompleted') && Session.get('selectedUser') && Session.get('selectedType') && Session.get('selectedCountry') && Session.get('selectedDO')){
            return Wines.find({ checked: { $ne: true }, createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry"), w_do: Session.get('selectedDO'), checked: { $ne: true } }, { sort: { createdAt: -1, rating: -1 }, limit:Session.get("imageLimit") });
         }
        
        if (instance.state.get('hideCompleted') && Session.get('selectedUser') && Session.get("selectedType") && Session.get('selectedCountry')) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get('selectedUser') && Session.get("selectedType") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get('selectedUser') && Session.get("selectedDO") && Session.get('selectedCountry')) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, createdBy: Session.get('selectedUser'), w_do: Session.get("selectedDO"), w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get('selectedDO') && Session.get("selectedType") && Session.get('selectedCountry')) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, w_do: Session.get('selectedDO'), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get('selectedCountry') && Session.get('selectedUser') && Session.get("selectedType") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ w_country: Session.get("selectedCountry"), createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
    
        if (instance.state.get('hideCompleted') && Session.get('selectedUser') && Session.get("selectedType")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get('selectedUser') && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, createdBy: Session.get('selectedUser'), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }

        if (instance.state.get('hideCompleted') && Session.get("selectedType") && Session.get("selectedCountry")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }

        if (instance.state.get('hideCompleted') && Session.get("selectedCountry") && Session.get("selectedDO") ) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }

        if (Session.get('selectedUser') && instance.state.get('hideCompleted') && Session.get("selectedCountry")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Session.get('selectedUser'), checked: { $ne: true }, w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }    
            
        if (Session.get('selectedUser') && Session.get("selectedType") && Session.get("selectedCountry")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }     
            
        if (Session.get('selectedUser') && Session.get("selectedType") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }      
            
        if (Session.get("selectedType") && Session.get("selectedCountry") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        } 

        if (Session.get('selectedUser') && Session.get("selectedCountry") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Session.get('selectedUser'), w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }   

        if (instance.state.get('hideCompleted') && Session.get('selectedUser')) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, createdBy: Session.get('selectedUser') }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, w_type: Session.get("selectedType") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get('selectedUser') && Session.get("selectedType")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Session.get('selectedUser'), w_type: Session.get("selectedType") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get('selectedUser') && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ createdBy: Session.get('selectedUser'), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedType") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }

        if (instance.state.get('hideCompleted') && Session.get("selectedCountry")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ checked: { $ne: true }, w_country: Session.get("selectedCountry") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }

        if (Session.get("selectedCountry") && Session.get('selectedUser')) {
            // If hide completed is checked, filter tasks
            return Wines.find({ w_country: Session.get("selectedCountry"), createdBy: Session.get('selectedUser') }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }

        if (Session.get("selectedCountry") && Session.get("selectedType")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }

        if (Session.get("selectedCountry") && Session.get("selectedDO")) {
            // If hide completed is checked, filter tasks
            return Wines.find({ w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }

        if (instance.state.get('hideCompleted')) {
            return Wines.find({ checked: { $ne: true } }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if (Session.get('selectedUser')) {
            return Wines.find({ createdBy: Session.get('selectedUser') }, { sort: { createdAt: -1 }, limit:Session.get("imageLimit") });
        }
        
        if(Session.get("selectedType")){
            return Wines.find({ w_type: Session.get("selectedType")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }

        if(Session.get("selectedCountry")){
            return Wines.find({ w_country: Session.get("selectedCountry")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }
        
        if(Session.get("selectedDO")){
            return Wines.find({ w_do: Session.get("selectedDO")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }
        
        else{
            return Wines.find({}, {sort:{createdAt:-1},limit:Session.get("imageLimit")});
        }
    },
 
    loggedusername:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
        
    getFilterUser:function(){
        if(Session.get("selectedUser")){
        var user = Meteor.users.findOne({_id:Session.get("selectedUser")});    
            return user.username;
        }
        else{
            return "Wine";
        }
    },
    
    getFilterCountry:function(){
        var w_country = Session.get("selectedCountry");    
        
        if(Session.get("selectedCountry")&&(w_country == "España")){
            return "Spain";
        }
        if(Session.get("selectedCountry")&&(w_country == "Francia")){
            return "France";
        }
        if(Session.get("selectedCountry")&&(w_country == "Italia")){
            return "Italy";
        }
        if(Session.get("selectedCountry")&&(w_country == "Alemania")){
            return "Germany";
        }
        if(Session.get("selectedCountry")&&(w_country == "Portugal")){
            return "Portugal";
        }
        else{
            return "All";
        }
    },    
    
    getFilterType:function(){
        var w_type = Session.get("selectedType");    
        
        if(Session.get("selectedType")&&(w_type == "Copas")){
            return "By the Glass";
        }
        if(Session.get("selectedType")&&(w_type == "Generoso")){
            return "Fortified";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso")){
            return "Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso Rosado")){
            return "Rose Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Blanco")){
            return "White";
        }
        if(Session.get("selectedType")&&(w_type == "Rosado")){
            return "Rose";
        }
        if(Session.get("selectedType")&&(w_type == "Tinto")){
            return "Red";
        }
        if(Session.get("selectedType")&&(w_type == "Dulce")){
            return "Sweet";
        }
        else{
            return "All";
        }
    },    
    
    getFilterDO:function(){
        var w_do = Session.get("selectedDO"); 
        if(Session.get("selectedDO")){
           return w_do;
        }
        else{
            return "All";
        }
    },
    
    filtering_users:function(){
        if(Session.get("selectedUser")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_country:function(){
        if(Session.get("selectedCountry")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_DO:function(){
        if(Session.get("selectedDO")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    getUser:function(user_id){
        var user = Meteor.users.findOne({_id:user_id});
        if(user){
            return user.username;
        }
        else{
            return "anonymous";
        }
    },
    
    username:function(){
        //console.log(Meteor.user().username);
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
    
    email:function(){
        //console.log(Meteor.user().emails[0].address);
        if(Meteor.user()){
            return Meteor.user().emails[0].address;
        }
        else{
            return "Please log in";
        }
    },
    
    filtering_wines:function(){
        if(Session.get("userFilter")){
            return true;
        }
        else{
            return false;
        }
    }, 
    /*
    getFilterUser:function(){
        if(Session.get("userFilter")){
        var user = Meteor.users.findOne({_id:Session.get("userFilter")});    
            return user.username;
        }
        else{
            return false;
        }
    },
    */
    
// MASTER COUNTERS
    
    userFilterCount() {
        if(Session.get('selectedUser')){
            return Wines.find({createdBy:Session.get('selectedUser')}).count();
        }
        else{
            return Wines.find({}).count(); 
        }
    },   
    
    availableWines() {
        if(Session.get('selectedUser')){
            return Wines.find({createdBy:Session.get('selectedUser')}).count() - Wines.find({createdBy:Session.get('selectedUser'), checked: true}).count();
        }
        else{
            return Wines.find({}).count() - Wines.find({checked: true}).count(); 
        }
    },   
   
    unavailableWines() {
        if(Session.get('selectedUser')){
            return Wines.find({createdBy:Session.get('selectedUser'), checked: true}).count();
        }
        else{
            return Wines.find({checked: true}).count(); 
        }
    },
     
    typeCount() {
        
        if(Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType")}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count();
        }
                
        if(Session.get("selectedType")){
            return Wines.find({ w_type: Session.get("selectedType")}).count();
        }
        else{
            return Wines.find({}).count();
        }
    }, 
    
    availableTypeCount() {
        if(Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count() - Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
                
        if(Session.get("selectedType")){
            return Wines.find({ w_type: Session.get("selectedType")}).count() - Wines.find({ w_type: Session.get("selectedType"), checked: true}).count();
        }
        else{
            return Wines.find({}).count() - Wines.find({ checked: true}).count();
        }
    }, 
    
    unavailableTypeCount() {
        if(Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
                
        if(Session.get("selectedType")){
            return Wines.find({ w_type: Session.get("selectedType"), checked: true}).count();
        }
        else{
            return Wines.find({ checked: true}).count();
        }
    }, 

    countryCount() {
        if(Session.get("selectedCountry") && Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry")}).count();
        }
        
        if(Session.get("selectedCountry") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_country: Session.get("selectedCountry")}).count();
        }
        
        if(Session.get("selectedCountry") && Session.get("selectedType")){
            return Wines.find({w_country:Session.get("selectedCountry"), w_type: Session.get("selectedType")}).count();
        }
                
        if(Session.get("selectedUser") && Session.get("selectedType")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType")}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count();
        }
        
        if(Session.get("selectedType")){
            return Wines.find({w_type:Session.get("selectedType")}).count();
        }
        
        if(Session.get("selectedCountry")){
            return Wines.find({w_country: Session.get("selectedCountry")}).count();
        }
        else{
            return Wines.find({}).count();
        }
    },     
    
    availableCountryCount() {
        if(Session.get("selectedCountry") && Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry")}).count() - Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        if(Session.get("selectedCountry") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_country: Session.get("selectedCountry")}).count() - Wines.find({createdBy:Session.get("selectedUser"), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        if(Session.get("selectedCountry") && Session.get("selectedType")){
            return Wines.find({w_country:Session.get("selectedCountry"), w_type: Session.get("selectedType")}).count() - Wines.find({w_country:Session.get("selectedCountry"), w_type: Session.get("selectedType"), checked: true}).count();
        }
                
        if(Session.get("selectedUser") && Session.get("selectedType")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count() - Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
        
        if(Session.get("selectedType")){
            return Wines.find({w_type:Session.get("selectedType")}).count() - Wines.find({w_type:Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedCountry")){
            return Wines.find({w_country: Session.get("selectedCountry")}).count() - Wines.find({w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        else{
            return Wines.find({}).count() - Wines.find({ checked: true}).count();
        }
    },     
       
    unavailableCountryCount() {
        if(Session.get("selectedCountry") && Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        if(Session.get("selectedCountry") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        if(Session.get("selectedCountry") && Session.get("selectedType")){
            return Wines.find({w_country:Session.get("selectedCountry"), w_type: Session.get("selectedType"), checked: true}).count();
        }
                
        if(Session.get("selectedUser") && Session.get("selectedType")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
        
        if(Session.get("selectedType")){
            return Wines.find({w_type:Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedCountry")){
            return Wines.find({w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        else{
            return Wines.find({ checked: true}).count();
        }
    },     
    
    DOCount() {
        if(Session.get("selectedDO") && Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_do: Session.get("selectedDO")}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedType")){
            return Wines.find({w_do:Session.get("selectedDO"), w_type: Session.get("selectedType")}).count();
        }
        
        if(Session.get("selectedUser") && Session.get("selectedType")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType")}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count();
        }
        
        if(Session.get("selectedType")){
            return Wines.find({w_type:Session.get("selectedType")}).count();
        }
        
        if(Session.get("selectedDO")){
            return Wines.find({w_do: Session.get("selectedDO")}).count();
        }
        else{
            return Wines.find({}).count();
        }
    },     
    
    availableDOCount() {
        if(Session.get("selectedDO") && Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedType")){
            return Wines.find({w_do:Session.get("selectedDO"), w_type: Session.get("selectedType")}).count() - Wines.find({w_do: Session.get("selectedDO"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser") && Session.get("selectedType")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser")}).count() - Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
        
        if(Session.get("selectedType")){
            return Wines.find({w_type:Session.get("selectedType")}).count() - Wines.find({w_type:Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedDO")){
            return Wines.find({w_do: Session.get("selectedDO")}).count() - Wines.find({w_do: Session.get("selectedDO"), checked: true}).count();
        }
        else{
            return Wines.find({}).count() - Wines.find({checked: true}).count();
        }
    },     
    
    unavailableDOCount() {
        if(Session.get("selectedDO") && Session.get("selectedType") && Session.get("selectedUser")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedUser")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get("selectedDO") && Session.get("selectedType")){
            return Wines.find({w_do: Session.get("selectedDO"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser") && Session.get("selectedType")){
            return Wines.find({createdBy: Session.get("selectedUser"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedUser")){
            return Wines.find({createdBy:Session.get("selectedUser"), checked: true}).count();
        }
        
        if(Session.get("selectedType")){
            return Wines.find({w_type:Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get("selectedDO")){
            return Wines.find({w_do: Session.get("selectedDO"), checked: true}).count();
        }
        else{
            return Wines.find({checked: true}).count();
        }
    },     
    
    userCount() {
        if(Meteor.user()){
            return Wines.find({createdBy:Meteor.userId()}).count();
        }
        else{
            return "Please log in";
        }
    },   
});

// MASTER EVENTS

Template.wineDisplay.events({
    
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
    
    'click .js-unset-wine-filter':function(event){
        //console.log("clicked unfilter");
        Session.set("userFilter",undefined);
    },        
});

////////////////////////////
// MASTER SIDENAV HELPERS //
////////////////////////////

Template.sidenavMaster.helpers({
    /*
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Wine-List";
        }
    },
    */
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    user: function(){
        return Meteor.users.find();
    },
    
    loggedusername:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
    
    getFilterUser:function(){
        if(Session.get("selectedUser")){
        var user = Meteor.users.findOne({_id:Session.get("selectedUser")});    
            return user.username;
        }
        else{
            return "All";
        }
    },
    
// MASTER SIDENAV COUNTERS
    
    userCount() {
        return Wines.find({}).count();
    },
});
        
// MASTER SIDENAV EVENTS

Template.sidenavMaster.events({
    
    'click .openNav2'(event) {
        $("#mySidenav").css({"width":"220px"});
        $(".wine-row").css({"margin-left":"180px"});
    },
    
    'click .closeNav2'(event) {
        $("#mySidenav").css({"width":"0px"});
        $(".wine-row").css({"margin-left":"13px"});
    },
    
    'change .selectUsers': function (event) {
        var w_user = $(event.currentTarget).val();
        Session.set('selectedUser', w_user);
    },
    
    'click .unfilterUsers':function(event){
        Session.set('selectedUser', undefined);
    }, 
    
    'change .selectTypes': function (event) {
        var w_type = $(event.currentTarget).val();
        Session.set('selectedType', w_type);
    },
    
    'click .unfilterTypes':function(event){
        Session.set('selectedType', undefined);
    }, 
    
    'change .selectCountry': function (event) {
        var w_country = $(event.currentTarget).val();
        Session.set('selectedCountry', w_country);
    },
    
    'click .unfilterCountry':function(event){
        Session.set('selectedCountry', undefined);
    }, 
    
    'change .selectDO': function (event) {
        var w_do = $(event.currentTarget).val();
        Session.set('selectedDO', w_do);
    },
    
    'click .unfilterDO':function(event){
        Session.set('selectedDO', undefined);
    }, 
});

//////////////////////
// WINE INV HELPERS //
//////////////////////

Template.wineInv.onCreated(function() {
    
    this.sortName = new ReactiveVar(1);
    this.sortNumber = new ReactiveVar(1);
    this.sortProducer = new ReactiveVar(1);
    this.sortDate = new ReactiveVar(1);
    this.sortPrice = new ReactiveVar(1);
    this.sortDo = new ReactiveVar(1);
    this.sortVariety = new ReactiveVar(1);
    this.sortType = new ReactiveVar(1);
    this.sortCountry = new ReactiveVar(1);
    this.sortRegion = new ReactiveVar(1);
    this.sortCost = new ReactiveVar(1);
    this.sortSupplier = new ReactiveVar(1);
    this.sortCl = new ReactiveVar(1);
    this.sortQty = new ReactiveVar(1);
});

   
Template.wineInv.helpers({
    
    w_qty: function(){
        var qty = parseInt(w_qty);
        return "qty";
    },
    
    wines: function() {
        const instance = Template.instance();
        
        var self = Template.instance();
        var sortName = self.sortName.get();
        
        var self = Template.instance();
        var sortNumber = self.sortNumber.get();
        
        var self = Template.instance();
        var sortProducer = self.sortProducer.get();
        
        var self = Template.instance();
        var sortDate = self.sortDate.get();
        
        var self = Template.instance();
        var sortPrice = self.sortPrice.get();
        
        var self = Template.instance();
        var sortDo = self.sortDo.get();
        
        var self = Template.instance();
        var sortVariety = self.sortVariety.get();
        
        var self = Template.instance();
        var sortType = self.sortType.get();
        
        var self = Template.instance();
        var sortCountry = self.sortCountry.get();
        
        var self = Template.instance();
        var sortRegion = self.sortRegion.get();
        
        var self = Template.instance();
        var sortCost = self.sortCost.get();
        
        var self = Template.instance();
        var sortSupplier = self.sortSupplier.get();
        
        var self = Template.instance();
        var sortCl = self.sortCl.get();
        
        var self = Template.instance();
        var sortQty = self.sortQty.get();
        
        /*
        if (instance.state.get('hideCompleted') && Session.get("selectedType") && Session.get("selectedCountry") && Session.get("selectedDO")) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType") && Session.get("selectedCountry")) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedCountry") && Session.get("selectedDO")) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType") && Session.get("selectedDO")) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedCountry") && Session.get("selectedType") && Session.get("selectedDO")) {
            return Wines.find({ createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedType")) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_type: Session.get("selectedType") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedCountry")) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_country: Session.get("selectedCountry") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedType") && Session.get("selectedCountry")) {
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_country: Session.get("selectedCountry") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedCountry") && Session.get("selectedDO")) {
            return Wines.find({ createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_do: Session.get("selectedDO") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (Session.get("selectedType") && Session.get("selectedDO")) {
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted') && Session.get("selectedDO")) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true }, w_do: Session.get("selectedDO") }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if (instance.state.get('hideCompleted')) {
            return Wines.find({ createdBy: Meteor.userId(), checked: { $ne: true } }, {sort: {createdAt: -1}, limit:Session.get("imageLimit") });
        }
        
        if(Session.get("selectedType")){
            return Wines.find({ createdBy: Meteor.userId(), w_type: Session.get("selectedType")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }
        
        if(Session.get("selectedCountry")){
            return Wines.find({ createdBy: Meteor.userId(), w_country: Session.get("selectedCountry")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }
        
        if(Session.get("selectedDO")){
            return Wines.find({ createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}, {sort: {createdAt: -1}, limit:Session.get("imageLimit")});
        }
        
        else{     
            return Wines.find({createdBy: Meteor.userId()}, {sort:{createdAt: -1}, limit:Session.get("imageLimit")});
        }
        */
        
        if (instance.state.get('sortNumber')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_ref: sortNumber}});
        }
        
        if (instance.state.get('sortName')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_name: sortName}});
        }
        
        if (instance.state.get('sortProducer')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_producer: sortProducer}});
        }
        
        if (instance.state.get('sortDate')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{createdAt: sortDate}});
        }
        
        if (instance.state.get('sortPrice')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_price: sortPrice}});
        }
        
        if (instance.state.get('sortDo')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_do: sortDo}});
        }
        
        if (instance.state.get('sortVariety')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_variety: sortVariety}});
        }
        
        if (instance.state.get('sortType')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_type: sortType}});
        }
        
        if (instance.state.get('sortCountry')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_country: sortCountry}});
        }
        
        if (instance.state.get('sortRegion')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_region: sortRegion}});
        }
        
        if (instance.state.get('sortCost')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_cost: sortCost}});
        }
        
        if (instance.state.get('sortSupplier')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_supplier: sortSupplier}});
        }
        
        if (instance.state.get('sortCl')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_cl: sortCl}});
        }
        
        if (instance.state.get('sortQty')) {
            return Wines.find({createdBy: Meteor.userId()}, {sort:{w_qty: sortQty}});
        }
        
        else {     
            return Wines.find({createdBy: Meteor.userId()});
        }    
    },
    
    users: function(){
      return Meteor.users.find();
    },
    
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
    
    getFilterUser:function(){
        if(Session.get("userFilter")){
        var user = Meteor.users.findOne({_id:Session.get("userFilter")});    
            return user.username;
        }
        else{
            return false;
        }
    },
    
    userFilterCount() {
        return Wines.find({createdBy:Session.get("userFilter")}).count();
      },   
    
    availableWines() {
        return Wines.find({createdBy:Meteor.userId()}).count()-Wines.find({createdBy:Meteor.userId(), checked: true}).count();
    },
   
    unavailableWines() {
        return Wines.find({createdBy:Meteor.userId(), checked: true}).count();
    },
     
    userCount() {
        if(Meteor.user()){
            return Wines.find({createdBy:Meteor.userId()}).count();
        }
        else{
            return "Please log in";
        }
    },     
    
    getFilterType:function(){
        var w_type = Session.get("selectedType");    
        
        if(Session.get("selectedType")&&(w_type == "Copas")){
            return "By the Glass";
        }
        if(Session.get("selectedType")&&(w_type == "Generoso")){
            return "Fortified";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso")){
            return "Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Espumoso Rosado")){
            return "Rose Sparkling";
        }
        if(Session.get("selectedType")&&(w_type == "Blanco")){
            return "White";
        }
        if(Session.get("selectedType")&&(w_type == "Rosado")){
            return "Rose";
        }
        if(Session.get("selectedType")&&(w_type == "Tinto")){
            return "Red";
        }
        if(Session.get("selectedType")&&(w_type == "Dulce")){
            return "Sweet";
        }
        else{
            return "All";
        }
    },
    
    getFilterCountry:function(){
        var w_country = Session.get("selectedCountry");    
        
        if(Session.get("selectedCountry")&&(w_country == "España")){
            return "Spain";
        }
        if(Session.get("selectedCountry")&&(w_country == "Francia")){
            return "France";
        }
        if(Session.get("selectedCountry")&&(w_country == "Italia")){
            return "Italy";
        }
        if(Session.get("selectedCountry")&&(w_country == "Alemania")){
            return "Germany";
        }
        if(Session.get("selectedCountry")&&(w_country == "Portugal")){
            return "Portugal";
        }
        else{
            return "All";
        }
    },    
    
    getFilterDO:function(){
        var w_do = Session.get("selectedDO"); 
        if(Session.get("selectedDO")){
           return w_do;
        }
        else{
            return "All";
        }
    },
    
    filtering_types:function(){
        if(Session.get("selectedType")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    filtering_country:function(){
        if(Session.get("selectedCountry")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    
    filtering_DO:function(){
        if(Session.get("selectedDO")){
            return true;
        }
        else{
            return false;
        }
    }, 
    
    createdAt:function(){
        var w_date = this.createdAt;
        return w_date.toLocaleString();
    },
    
// WINE INV COUNTERS   
    
    totalTypeCount() {
        return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType")}).count();
    }, 
    
    typeCount() {
        return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy:Meteor.userId(), w_type: Session.get("selectedType"), checked: true}).count();
    }, 
    
    notTypeCount() {
        return Wines.find({createdBy:Meteor.userId(), w_type: Session.get("selectedType"), checked: true}).count();
    },
    
    totalCountryCount() {
        if(Session.get('selectedCountry') && Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType")}).count();
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry")}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count();
        }
    },
    
    countryCount() {
        if(Session.get('selectedCountry') && Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType")}).count() - Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry")}).count() - Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    }, 
    
    notCountryCount() {
        if(Session.get('selectedCountry') && Session.get('selectedType')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), w_type: Session.get("selectedType"), checked: true}).count();
        }
        
        if(Session.get('selectedCountry')){
            return Wines.find({createdBy: Meteor.userId(), w_country: Session.get("selectedCountry"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    },
    
    totalDoCount() {
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count();
        }
    }, 
    
    doCount() {
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO")}).count() - Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId()}).count() - Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    }, 
    
    notDoCount() {
        if(Session.get('selectedType') && Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_type: Session.get("selectedType"), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        if(Session.get('selectedDO')){
            return Wines.find({createdBy: Meteor.userId(), w_do: Session.get("selectedDO"), checked: true}).count();
        }
        
        else{
            return Wines.find({createdBy: Meteor.userId(), checked: true}).count();
        }
    },
});

// LIST EVENTS

Template.wineInv.events({
    
    'click .toggle-private'() {
        Meteor.call('wines.setPrivate', this._id, !this.private);
    },
    
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Meteor.call('wines.setChecked', this._id, !this.checked);
    },
    
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
    
    'click .js-sort-number': function(event){
        var self = Template.instance();
        self.sortNumber.set(self.sortNumber.get() * -1);  
    },
    
    'click .js-sort-name': function(event){
        var self = Template.instance();
        self.sortName.set(self.sortName.get() * -1);  
    },
    
    'click .js-sort-producer': function(event){
        var self = Template.instance();
        self.sortProducer.set(self.sortProducer.get() * -1);  
    },
    
    'click .js-sort-date': function(event){
        var self = Template.instance();
        self.sortDate.set(self.sortDate.get() * -1);  
    },
    
    'click .js-sort-price': function(event){
        var self = Template.instance();
        self.sortPrice.set(self.sortPrice.get() * -1);  
    },
    
    'click .js-sort-do': function(event){
        var self = Template.instance();
        self.sortDo.set(self.sortDo.get() * -1);  
    },
    
    'click .js-sort-variety': function(event){
        var self = Template.instance();
        self.sortVariety.set(self.sortVariety.get() * -1);  
    },
    
    'click .js-sort-type': function(event){
        var self = Template.instance();
        self.sortType.set(self.sortType.get() * -1);  
    },
    
    'click .js-sort-country': function(event){
        var self = Template.instance();
        self.sortCountry.set(self.sortCountry.get() * -1);  
    },
    
    'click .js-sort-region': function(event){
        var self = Template.instance();
        self.sortRegion.set(self.sortRegion.get() * -1);  
    },
    
    'click .js-sort-cost': function(event){
        var self = Template.instance();
        self.sortCost.set(self.sortCost.get() * -1);  
    },
    
    'click .js-sort-supplier': function(event){
        var self = Template.instance();
        self.sortSupplier.set(self.sortSupplier.get() * -1);  
    },
    
    'click .js-sort-cl': function(event){
        var self = Template.instance();
        self.sortCl.set(self.sortCl.get() * -1);  
    },
    
    'click .js-sort-qty': function(event){
        var self = Template.instance();
        self.sortQty.set(self.sortQty.get() * -1);  
    },
    
    'change .sort-number input'(event, instance) {
        //instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortNumber', event.target.checked);
    },
    
    'change .sort-name input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        //instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortName', event.target.checked);
    },
    
    'change .sort-producer input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        //instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortProducer', event.target.checked);
    },
    'change .sort-date input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        //instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortDate', event.target.checked);
    },
    
    'change .sort-price input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        //instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortPrice', event.target.checked);
    },
    
    'change .sort-do input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        //instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortDo', event.target.checked);
    },
    
    'change .sort-variety input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        //instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortVariety', event.target.checked);
    },
    
    'change .sort-type input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        //instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortType', event.target.checked);
    },
    
    'change .sort-country input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        //instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortCountry', event.target.checked);
    },
    
    'change .sort-region input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        //instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortRegion', event.target.checked);
    },
    
    'change .sort-cost input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        //instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortCost', event.target.checked);
    },
    'change .sort-supplier input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        //instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortSupplier', event.target.checked);
    },
    
    'change .sort-cl input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        //instance.state.set('sortCl', undefined);
        instance.state.set('sortQty', undefined);
        
        instance.state.set('sortCl', event.target.checked);
    },
    
    'change .sort-qty input'(event, instance) {
        instance.state.set('sortNumber', undefined);
        instance.state.set('sortName', undefined);
        instance.state.set('sortProducer', undefined);
        instance.state.set('sortDate', undefined);
        instance.state.set('sortPrice', undefined);
        instance.state.set('sortDo', undefined);
        instance.state.set('sortVariety', undefined);
        instance.state.set('sortType', undefined);
        instance.state.set('sortCountry', undefined);
        instance.state.set('sortRegion', undefined);
        instance.state.set('sortCost', undefined);
        instance.state.set('sortSupplier', undefined);
        instance.state.set('sortCl', undefined);
        //instance.state.set('sortQty', undefined);
        
        instance.state.set('sortQty', event.target.checked);
    },
    
});




