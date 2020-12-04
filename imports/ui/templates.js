import { Template } from 'meteor/templating';
import { Wines } from '../api/collections.js';

import './templates.html';

import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';

import './body.html';

//////////////////////////
// DATE DISPLAY HELPERS //
//////////////////////////

//Session.set("current_date", new Date())
/*
Meteor.setInterval(function(){
    Session.set("current_date", new Date());
}, 1000);
*/
//new Date().toLocaleTimeString(); // 11:18:48 AM
//new Date().toLocaleDateString(); // 11/16/2015
//new Date().toLocaleString(); // 11/16/2015, 11:18:48 PM
//toDateString()
//toUTCString()
//toISOString()
/*
Template.date_display.helpers({
    
    'current_date': function(){
        return Session.get("current_date");
    },
    
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "User List";
        }
    },
});
*/

///////////////////
// USERS HELPERS //
///////////////////

Template.listAll.helpers({
    user: function(){
        return Meteor.users.find();
    },
    
    "userEmail": function() {  
        return this.emails[0].address; 
    },
});

////////////////////
// MENU THUMBNAIL //
////////////////////

Template.wineList.onCreated(function wineMenuOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('wines');
});

Template.wineList.events({
    
    'click .js-rate-wine':function(event){
        console.log('you have clicked a star');
        var rating = $(event.currentTarget).data("userrating");
        console.log(rating);
        var wine_id = this.id;
        console.log(wine_id);
        
        Wines.update({_id:wine_id}, {$set: {rating:rating}});
    },
}); 

//////////////////
// WINE HELPERS //
//////////////////

Template.wine.helpers({
    
    isOwner() {
        return this.owner === Meteor.userId();
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
    
    userCount() {
        if(Meteor.user()){
            return Wines.find({createdBy:Meteor.user()._id}).count();
        }
        else{
            return "Please log in";
        }
    },  
    
    createdAt:function(){
        var w_date = this.createdAt;
        return w_date.toLocaleString();
    },
});

// WINE EVENTS

Template.wine.events({
    
    'click .toggle-private'() {
        Meteor.call('wines.setPrivate', this._id, !this.private);
    },
    
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Meteor.call('wines.setChecked', this._id, !this.checked);
    },
    
    'click .delete'() {
        //console.log(this._id);
        var wine_id = this._id;
        $("#"+wine_id).hide('slow', function(){
        Meteor.call('wines.remove', wine_id);
        })
    },
    
    'click .js-set-wine-filter':function(event){
        Session.set("userFilter",this.createdBy);
        //console.log(this.createdBy);
    },    
});    

///////////////////////////
// HEADER SINGLE HELPERS //
///////////////////////////

Template.headerSingle.helpers({
    
    getFilterUser:function(){
        //we remove filter
        if(Session.get("selectedUser")){
        var user = Meteor.users.findOne({_id:Session.get("selectedUser")});    
            return user.username;
        }
        else{
            return false;
        }
    },
    
    users:function(){
        return Meteor.users.find({});
    },
    
    username:function(){
        if(Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "Please log in";
        }
    },
}); 
   
////////////////////////
// SINGLE EDIT HELPERS//
////////////////////////
    
Template.singleEdit.helpers({
    
    isOwner() {
        return this.owner === Meteor.userId();
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
    
    userCount() {
        if(Meteor.user()){
            return Wines.find({createdBy:Meteor.user()._id}).count();
        }
        else{
            return "Please log in";
        }
    },  
    
    createdAt:function(){
        var w_date = this.createdAt;
        return w_date.toLocaleString();
    },
});

// SINGLE EDIT EVENTS

Template.singleEdit.events({
    
    'click .toggle-private'() {
        Meteor.call('wines.setPrivate', this._id, !this.private);
    },
    
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Meteor.call('wines.setChecked', this._id, !this.checked);
    },
    
    'click .delete'() {
        console.log(this._id);
        var wine_id = this._id;
        $("#"+wine_id).hide('slow', function(){
        Meteor.call('wines.remove', wine_id);
        })
    },
    
    'click .js-set-wine-filter':function(event){
        Session.set("userFilter",this.createdBy);
        //console.log(this.createdBy);
    },    
});    

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        