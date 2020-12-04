import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Wines = new Mongo.Collection('wines');

if (Meteor.isClient) {
 Meteor.subscribe('allUsers');
}

if (Meteor.isServer) {
 Meteor.publish('allUsers', function() {
   return Meteor.users.find({}, {fields:{username:1,emails:1}});
 })
}

// PUBLICATIONS

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('wines', function winesPublication() {
        return Wines.find({
        $or: [
          { private: { $ne: true } },
          { owner: this.userId },
        ],
      });
    });
    
    Meteor.publish("userList", function () {
           return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
    });
}
 
// METHODS

Meteor.methods({
    
    'wines.insert'(w_img, w_name, w_producer, w_vintage, w_price, w_do, w_variety, w_text, createdAt, w_type, w_country, w_region, w_cost, w_supplier, w_abv, w_cl, w_qty, w_ref) {
        check(w_img, String);
        check(w_name, String);  
        check(w_producer, String);
        check(w_vintage, Number);
        check(w_price, Number);
        check(w_do, String);
        check(w_variety, String);
        check(w_text, String);
        check(w_type, String);
        check(w_country, String); 
        check(w_region, String);
        check(w_cost, Number); 
        check(w_supplier, String);
        check(w_abv, Number); 
        check(w_cl, Number);
        check(w_ref, Number);    
        check(w_qty, Number); 
      
    // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }
 
        Wines.insert({
            w_img,
            w_name, 
            w_producer,  
            w_vintage,
            w_price,  
            w_do,
            w_variety,  
            w_text,  
            //createdAt: new Date(), // current time
            //createdBy: Meteor.user()._id,
            //owner: Meteor.userId(),
            //username: Meteor.user().username,      
            w_type,  
            w_country,  
            w_region,
            w_cost,  
            w_supplier,
            w_abv,  
            w_cl,
            w_ref, 
            w_qty,   
    
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
            createdBy: Meteor.user()._id,
        });
    },
    
    'wines.remove'(wineId) {
        check(wineId, String);
        /*
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        */
        const wine = Wines.findOne(wineId);
        if (wine.private || wine.owner !== this.userId) {
        // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        
        Wines.remove(wineId);
    },
    
    'wines.setChecked'(wineId, setChecked) {
        check(wineId, String);
        check(setChecked, Boolean);
        
        const wine = Wines.findOne(wineId);
        if (wine.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
 
        Wines.update(wineId, { $set: { checked: setChecked } });
    },
    
    'wines.setPrivate'(wineId, setToPrivate) {
        check(wineId, String);
        check(setToPrivate, Boolean);
    
        const wine = Wines.findOne(wineId);
    
        // Make sure only the task owner can make a task private
        if (wine.owner !== this.userId) {
          throw new Meteor.Error('not-authorized');
        }
    
        Wines.update(wineId, { $set: { private: setToPrivate } });
    },
});

