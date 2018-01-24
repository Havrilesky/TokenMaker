const theJSON = {
  "items":[

{"ItemId": 7,
  "PoseID": 1,
  "SubPoseID":1,
  "ItemName":"boots",
  "Files":{
    "Base":"Male 1 boots base.png",
    "Outline":"Male 1 boots out.png"
    },
  "UseColor":false,
  "Color":"#000000",
  "PartLayer": "feet",
  "Index": 1
},
  {"ItemId": 8,
  "PoseID": 1,
  "SubPoseID":1,
  "ItemName":"pants",
  "Files":{
    "Base":"Male 1 pants base.png",
    },
  "UseColor":false,
  "Color":"#5cf442",//green
  "PartLayer": "legs",
  "Index": 1
},
  {"ItemId": 3,
  "PoseID": 1,
  "SubPoseID":1,
  "ItemName":"bare waist",
  "Files":{
    "Base":"Male 1 waist base.png",
    "Outline":"Male 1 waist out.png"
    },
  "UseColor":false,
  "Color":"#000000",
  "PartLayer": "waist",
  "Index": 0
},
  {"ItemId": 4,
  "PoseID": 1,
  "SubPoseID":1,
  "ItemName":"bare torso",
  "Files":{
    "Base":"Male 1 torso base.png",
    "Outline":"Male 1 torso out.png"
    },
  "UseColor":false,
  "Color":"#000000",
  "PartLayer": "torso",
  "Index": 0
},
    {"ItemId": 5,
  "PoseID": 1,
  "SubPoseID":1,
  "ItemName":"bare arms",
  "Files":{
    "Base":"Male 1 arms base.png",
    "Outline":"Male 1 arms out.png"
    },
  "UseColor":false,
  "Color":"#000000",
  "PartLayer": "arms",
  "Index": 0
}
  ]
};

var express = require('express');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');

app.use(cors());
mongoose.connect('mongodb://localhost/tokens');


 var tokenSchema = mongoose.Schema;

  var tokenSetSchema = tokenSchema({
      //_id: Schema.Types.ObjectId,
      name: String,
      tokenItems: [{ type: tokenSchema.Types.ObjectId, ref: 'TokenItem' }]
  });//end tokenSetSchema
  
  var tokenItemSchema = tokenSchema({
  //"ItemId": 1,
    ItemId: Number,
  //"PoseID": 1,
    PoseID: Number,
  //"SubPoseID":1,
    SubPoseID: Number,
  //"ItemName":"bare feet",
    ItemName: String,
  //"Files":{
  //  "Base":"Male 1 feet base.png",
  //  "Outline":"Male 1 feet out.png"
  //  },
    Files: {
      Base: String,
      Outline: String
    },
  //"UseColor":false,
    UseColor: Boolean,
  //"Color":"#000000",
    Color: String,
  //"PartLayer": "feet",
    PartLayer: String,
  //"Index": 0
    Index: Number,
  });//end tokenItemSchema

  var tokenSet = mongoose.model('TokenSet', tokenSetSchema);
  var tokenItem = mongoose.model('TokenItem', tokenItemSchema);

function mongoJSON(){

  for (i = 0; i < theJSON.items.length; i++) {

    var someToken = new tokenItem(theJSON.items[i]);//end new token itm

    console.log(someToken.ItemName); // 'suck it bitch'

    someToken.save(function (err, someToken) {
        if (err) return console.error(err);
    });
  }//end for

}//end mongoJSON



var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected');

 

  //mongoJSON();



 /* var someToken = new tokenItem(  {"ItemId": 2,
  "PoseID": 1,
  "SubPoseID":1,
  "ItemName":"bare legs",
  "Files":{
    "Base":"Male 1 legs base.png",
    "Outline":"Male 1 legs out.png"
    },
  "UseColor":false,
  "Color":"#FF0000",
  "PartLayer": "legs",
  "Index": 0
});//end new token itm
*/
  //console.log(someToken.ItemName); // 'suck it bitch'

 // someToken.save(function (err, someToken) {
 //   if (err) return console.error(err);
 // });

/*
  //stuff could be made into a makenew set func?
  var someTokenItems;

  tokenItem.find(function (err, someTokenItems) {
    if (err) return console.error(err);
    console.log("1 someTokenItems: " + someTokenItems);

    var newSet = new tokenSet({
      name: "Male Fighter",
      tokenItems: someTokenItems
    });//end newSet

    newSet.save(function (err, newSet) {
      if (err) return console.error(err);
      console.log("1 newSet: " + newSet);
    });//end save newset

    console.log("2 newSet: " + newSet);

  });//end find func

  console.log("2 someTokenItems: " + someTokenItems);
*/


 // var theTokenSets;

//  tokenSet.find(function (err, theTokenSets) {
//    if (err) return console.error(err);
//    console.log("1 theTokenSets: " + theTokenSets);
//    });//end find function


});//end open func



app.use(express.static('public'));
app.get('/shit', function(req, res) {
//res.json(null);
//res.json(theJSON);
//res.status(500).json({ error: 'message' });


  var someTokenItems;

  tokenItem.find(function (err, someTokenItems) {
    if (err) return console.error(err);
    console.log("1 someTokenItems: " + someTokenItems);
    res.json(someTokenItems);

  });//end find func
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});