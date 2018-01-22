
var someJSON = {};
var tokenLayers = {
    "feet":[],
    "legs":[],
    "waist":[],
    "torso":[],
    "arms":[],
    "head":[]
};
var feetMenu = document.getElementById("feetMenu");
var legsMenu = document.getElementById("legsMenu");
var waistMenu = document.getElementById("waistMenu");
var torsoMenu = document.getElementById("torsoMenu");
var armsMenu = document.getElementById("armsMenu");
var headMenu = document.getElementById("headMenu");
var tokenCanvas = document.getElementById("tokenCanvas");
var ctx = tokenCanvas.getContext("2d");

var newImg = new Image();



function getJSON() {
var request = new XMLHttpRequest();

console.log("something's cookin!");

request.open("GET", "http://localhost:3000/shit", true);

	request.onreadystatechange = function() {
   		 if (request.readyState === 4 && request.status === 200) {
    		try {
    			var response = JSON.parse(request.responseText);
                // console.log(response);
    			someJSON = response;
                setupMenus();
                drawToken();
    		}//end try
    		catch (except) {
    			alert("something's fucked:"+except);
    		}//end catch
    	}//end if 4 & 200
	};//end onreadystatechange
	request.send();
}//end getJSON

function addItem(theIndex, useColorBool, theColor) {
    console.log("in addItem "+theIndex);
    console.log("useColorBool: "+useColorBool);
    console.log("theColor: "+theColor);
    var newItemIndex;
    switch (someJSON.items[theIndex].PartLayer){
        case "feet":
            newItemIndex = tokenLayers.feet.push(someJSON.items[theIndex]);
            tokenLayers.feet[newItemIndex-1].UseColor = useColorBool;
            tokenLayers.feet[newItemIndex-1].Color = theColor;            
        break;
        case "legs":
            newItemIndex = tokenLayers.legs.push(someJSON.items[theIndex]);
            tokenLayers.legs[newItemIndex-1].UseColor = useColorBool;
            tokenLayers.legs[newItemIndex-1].Color = theColor; 
        break;
        case "waist":
            newItemIndex = tokenLayers.waist.push(someJSON.items[theIndex]);
            tokenLayers.waist[newItemIndex-1].UseColor = useColorBool;
            tokenLayers.waist[newItemIndex-1].Color = theColor; 
        break;
        case "torso":
            newItemIndex = tokenLayers.torso.push(someJSON.items[theIndex]);
            tokenLayers.torso[newItemIndex-1].UseColor = useColorBool;
            tokenLayers.torso[newItemIndex-1].Color = theColor; 
        break;
        case "arms":
            newItemIndex = tokenLayers.arms.push(someJSON.items[theIndex]);
            tokenLayers.arms[newItemIndex-1].UseColor = useColorBool;
            tokenLayers.arms[newItemIndex-1].Color = theColor; 
        break;
        case "head":
            newItemIndex = tokenLayers.head.push(someJSON.items[theIndex]);
            tokenLayers.head[newItemIndex-1].UseColor = useColorBool;
            tokenLayers.head[newItemIndex-1].Color = theColor; 
        break;
    }//end switch
}//end addItem

function removeItem(theIndex) {
    console.log("in removeItem "+theIndex);
    switch (someJSON.items[theIndex].PartLayer){
        case "feet":
        var targetIndex = tokenLayers.feet.findIndex(i => i.ItemId === someJSON.items[theIndex].ItemId);
        console.log("located at: "+targetIndex);
        tokenLayers.feet.splice(targetIndex,1);
        break;
        case "legs":
        var targetIndex = tokenLayers.legs.findIndex(i => i.ItemId === someJSON.items[theIndex].ItemId);
        console.log("located at: "+targetIndex);
        tokenLayers.legs.splice(targetIndex,1);
        //tokenLayers.legs.push(someJSON.items[theIndex]);
        break;
        case "waist":
        var targetIndex = tokenLayers.waist.findIndex(i => i.ItemId === someJSON.items[theIndex].ItemId);
        console.log("located at: "+targetIndex);
        tokenLayers.waist.splice(targetIndex,1);
        //tokenLayers.waist.push(someJSON.items[theIndex]);
        break;
        case "torso":
        var targetIndex = tokenLayers.torso.findIndex(i => i.ItemId === someJSON.items[theIndex].ItemId);
        console.log("located at: "+targetIndex);
        tokenLayers.torso.splice(targetIndex,1);
        //tokenLayers.torso.push(someJSON.items[theIndex]);
        break;
        case "arms":
        var targetIndex = tokenLayers.arms.findIndex(i => i.ItemId === someJSON.items[theIndex].ItemId);
        console.log("located at: "+targetIndex);
        tokenLayers.arms.splice(targetIndex,1);
        //tokenLayers.arms.push(someJSON.items[theIndex]);
        break;
        case "head":
        var targetIndex = tokenLayers.head.findIndex(i => i.ItemId === someJSON.items[theIndex].ItemId);
        console.log("located at: "+targetIndex);
        tokenLayers.head.splice(targetIndex,1);
        //tokenLayers.head.push(someJSON.items[theIndex]);
        break;
    }//end switch
}//end removeItem

function menuActions() {
    console.log("in menuActions. this.id: " + this.id)
    /*
    */
    var drawCheck = this.parentNode.parentNode.childNodes[0].childNodes[0];
    var tintCheck = this.parentNode.parentNode.childNodes[1].childNodes[0];
    var colorInput = this.parentNode.parentNode.childNodes[2].childNodes[0];

    console.log("drawCheck.id: "+ drawCheck.id)
    console.log("tintCheck.id: "+ tintCheck.id)
    console.log("colorInput.id: "+ colorInput.id)

//what is it that got clicked?
//reconfigure the UI as needed
    //if drwa was clicked, do nothing but add?
    // if tint was clicked then also check draw
    // if draw was unched then also uncheck tint??
//then just add this item to TokenLayers as usual - I think?

    if (this.name == "draw") {
        if (this.checked) {
            //if draw box being checked all we do is add to our token
            console.log(this.value + "draw is checked");
            addItem(this.value, someJSON.items[this.value].UseColor, someJSON.items[this.value].Color);
            
        } else {
            //if draw box being UNhecked then uncheck tint as well
            console.log(this.value + "draw is not UNchecked")
            removeItem(this.value);

        }//end checked or unchecked
    } else {
        if (this.checked) {
            //if tint box being checked then also check draw and add to token
            console.log(this.value + " tint is checked")
            //console.log(this.parentNode.parentNode.childNodes[0].firstChild.id + " is the draw ID?")
            drawCheck.setAttribute("checked", "checked");
//NEED to addItem ONLY if the item is not already IN TokenLayers!!!
            addItem(this.value, true, colorInput.value);
        } else {

//NEED to find the partLayer that we're in so we can replace "head" below with the correct part
//THEN lastly in that partLayer, find targetIndex and set UseColor to false!!
            console.log(this.value + "tint is UNchecked")
            var targetIndex = tokenLayers.head.findIndex(i => i.ItemId === someJSON.items[this.value].ItemId);
            console.log("tint uncheck located at: "+targetIndex);
            //tokenLayers.head.splice(targetIndex,1);
        }//end checked or unchecked
    }//end this.name

    drawToken();
}//end menuActions

function setupMenus() {
    var i;

    for (i = 0; i < someJSON.items.length; i++) { 

                //create a LI
        //create a sub UL with markers off
        //create a text node with ItemName
        //make details & summary for this UL
        //assign the text node ItemName to the summary of UL

            //create a LI
            //create a checkbox - append to LI
            //create a text node with "draw"  - append to LI
            //onclick menuActions
            //append LI to UL

            //create a LI
            //create a checkbox - append to LI
            //create a text node with "tint"
            //onclick menuActions & ste color to color input
            //append LI to UL

            //create a LI
            //create a color input - append to LI
            //onclick if tint is checked then menuActions & ste color to color input
            //append LI to UL



        //create a LI
        var itemLI = document.createElement("LI");                 // Create a <li> node
        //create a sub UL with markers off - append to details
        var ItemDetails = document.createElement("DETAILS");
        var ItemSummary = document.createElement("SUMMARY");
        //create a text node with ItemName
        var itemULName = document.createTextNode(someJSON.items[i].ItemName);
        //create a sub UL with markers off - append to details item
        var ItemUL = document.createElement("UL");
        //assign the text node ItemName to the summary of details item
        ItemSummary.appendChild(itemULName);
        itemLI.appendChild(ItemDetails);//details added to LI
        ItemDetails.appendChild(ItemSummary);//summary added to details
        ItemDetails.appendChild(ItemUL);//UL added to details


            //create a LI
            var drawLI = document.createElement("LI");
            //create a checkbox - append to LI
            var drawCheck = document.createElement("input");
            drawLI.appendChild(drawCheck);
            drawCheck.setAttribute("type", "checkbox");
            drawCheck.setAttribute("value", i);
            drawCheck.setAttribute("name", "draw");
            drawCheck.setAttribute("id", "drawCheck");
            //create a text node with "draw"  - append to LI
            var drawLabel = document.createTextNode("draw");
            drawLI.appendChild(drawLabel);
            //onclick menuActions
            drawCheck.onclick = menuActions;
            //append LI to UL
            ItemUL.appendChild(drawLI);

            //create a LI
            var tintLI = document.createElement("LI");
            //create a checkbox - append to LI
            var tintCheck = document.createElement("input");
            tintLI.appendChild(tintCheck);
            tintCheck.setAttribute("type", "checkbox");
            tintCheck.setAttribute("value", i);
            tintCheck.setAttribute("name", "tint");
            tintCheck.setAttribute("id", "tintCheck");
            //create a text node with "draw"  - append to LI
            var tintLabel = document.createTextNode("tint");
            tintLI.appendChild(tintLabel);
            //onclick menuActions
            tintCheck.onclick = menuActions;
            //append LI to UL
            ItemUL.appendChild(tintLI);

            //create a LI
            var colorLI = document.createElement("LI");                 // Create a <li> node
            //create a color input - append to LI
            var colorInput = document.createElement("input");
            colorLI.appendChild(colorInput);
            colorInput.setAttribute("type", "color");
            colorInput.setAttribute("id", "colorInput");
            colorInput.setAttribute("name", "color");
            colorInput.setAttribute("value", someJSON.items[i].Color); 
            //onclick if tint is checked then menuActions & ste color to color input
            //colorInput.onclick = something;/////////////////////////////////////FIX////////////////////
            //append LI to UL
            ItemUL.appendChild(colorLI);

 




        switch (someJSON.items[i].PartLayer){
        case "feet":
        feetMenu.appendChild(itemLI);
        break;
        case "legs":
        legsMenu.appendChild(itemLI);
        break;
        case "waist":
        waistMenu.appendChild(itemLI);
        break;
        case "torso":
        torsoMenu.appendChild(itemLI);
        break;
        case "arms":
        armsMenu.appendChild(itemLI);
        break;
        case "head":
        headMenu.appendChild(itemLI);
        break;
        }//end switch
    }//end for
}//end setupMenus

function drawColor(shadeImage, aColor) {
    
    var imageData = ctx.getImageData(0,0,can.width, can.height);
    var pixels = imageData.data;
    var numPixels = pixels.length;
    
    ctx.clearRect(0, 0, can.width, can.height);
    
    for (var i = 0; i < numPixels; i++) {
        var average = (pixels[i*4] + pixels[i*4+1] + pixels[i*4+2]) /3;
        // set red green and blue pixels to the average value
        pixels[i*4] = average;
        pixels[i*4+1] = average+30;
        pixels[i*4+2] = average;
    }
    ctx.putImageData(imageData, 0, 0);
}//end func drawcolor


function recolorImage(shadeImage,aColor){

        var newRedVal = parseInt(aColor.substr(1,2), 16);
        var newGreenVal = parseInt(aColor.substr(3,2), 16);
        var newBlueVal = parseInt(aColor.substr(5,2), 16);

        var newLuminVal = 0.299 * Number(newRedVal) + 0.587 * Number(newGreenVal) + 0.114 * Number(newBlueVal);

        //console.log("aColor:"+newRedVal+", "+newGreenVal+", "+newBlueVal);
        //console.log("newLuminVal:"+newLuminVal);


        var newCan = document.createElement('canvas');
        var newTex=newCan.getContext("2d");
        var w = shadeImage.width;
        var h = shadeImage.height;

        newCan.width = w;
        newCan.height = h;

        // draw the image on the temporary canvas
        newTex.drawImage(shadeImage, 0, 0, w, h);

        // pull the entire image into an array of pixel data
        var imageData = newTex.getImageData(0, 0, w, h);
        //console.log("drew image got data...");

        // examine every pixel, 
        // change any old rgb to the new-rgb
        for (var i=0;i<imageData.data.length;i+=4)
          {
              // is this pixel the old rgb?
              if(imageData.data[i+3]!=0){//not transparent

                //break out rgb values

                var redVal = imageData.data[i];
                var greenVal = imageData.data[i+1];
                var blueVal = imageData.data[i+2];
                var alphaVal = imageData.data[i+3];

                //console.log("got data["+i+"]:"+redVal+", "+greenVal+", "+blueVal+", a:"+alphaVal);

                //var greyVal = (redVal+greenVal+blueVal)/3;
                var luminVal = 0.299 * redVal + 0.587 * greenVal + 0.114 * blueVal;

                //var redHex = redVal.toString(16);
                //var greenHex = greenVal.toString(16);
                //var blueHex = blueVal.toString(16);

                //var thisColor = "#"+redHex+greenHex+blueHex;
                var luminDiff = luminVal/newLuminVal;

                //console.log("luminVal:"+luminVal+" & newLuminVal: "+newLuminVal+", so luminDiff = "+luminDiff);

                var resultRed = Math.floor(newRedVal*luminDiff);
                var resultGreen = Math.floor(newGreenVal*luminDiff);
                var resultBlue = Math.floor(newBlueVal*luminDiff);
                // change to your new rgb
                //console.log("CHANGE TO:["+i+"]:"+resultRed+", "+resultGreen+", "+resultBlue+", a:"+alphaVal);
                imageData.data[i]=resultRed;
                imageData.data[i+1]=resultGreen;
                imageData.data[i+2]=resultBlue;
                imageData.data[i+3]=alphaVal;
              }
          }// end fro

        // put the altered data back on the canvas  
        newTex.putImageData(imageData,0,0);
        // put the re-colored image into an image and return it
 //       var newImg = new Image();
        newImg.src = newCan.toDataURL('image/png');
        console.log("newImg: "+ newImg);
        return  newImg;
}// end recolor

function recolorImage2(shadeImage,aColor){

        var newRedVal = parseInt(aColor.substr(1,2), 16);
        var newGreenVal = parseInt(aColor.substr(3,2), 16);
        var newBlueVal = parseInt(aColor.substr(5,2), 16);

        var newLuminVal = 0.299 * Number(newRedVal) + 0.587 * Number(newGreenVal) + 0.114 * Number(newBlueVal);

        //console.log("aColor:"+newRedVal+", "+newGreenVal+", "+newBlueVal);
        //console.log("newLuminVal:"+newLuminVal);


        var newCan = document.createElement('canvas');
        var newTex=newCan.getContext("2d");
        var w = shadeImage.width;
        var h = shadeImage.height;

        newCan.width = w;
        newCan.height = h;

        // draw the image on the temporary canvas
        newTex.drawImage(shadeImage, 0, 0, w, h);

        // pull the entire image into an array of pixel data
        var imageData = newTex.getImageData(0, 0, w, h);
        //console.log("drew image got data...");

        // examine every pixel, 
        // change any old rgb to the new-rgb
        for (var i=0;i<imageData.data.length;i+=4)
          {
              // is this pixel the old rgb?
              if(imageData.data[i+3]!=0){//not transparent

                //break out rgb values

                var redVal = imageData.data[i];
                var greenVal = imageData.data[i+1];
                var blueVal = imageData.data[i+2];
                var alphaVal = imageData.data[i+3];

                //console.log("got data["+i+"]:"+redVal+", "+greenVal+", "+blueVal+", a:"+alphaVal);

                var luminVal = (redVal+greenVal+blueVal)/3;
                //var luminVal = 0.299 * redVal + 0.587 * greenVal + 0.114 * blueVal;
                luminVal = Math.min(luminVal, 255);//just make sure it stays under 255
                //var redHex = redVal.toString(16);
                //var greenHex = greenVal.toString(16);
                //var blueHex = blueVal.toString(16);

                //var thisColor = "#"+redHex+greenHex+blueHex;
                var luminDiff = luminVal/newLuminVal;

                //console.log("luminVal:"+luminVal+" & newLuminVal: "+newLuminVal+", so luminDiff = "+luminDiff);

                //var resultRed = Math.floor(redVal+(newRedVal-redVal)*luminVal/255);//more new with more lumin
                //var resultGreen = Math.floor(greenVal+(newGreenVal-greenVal)*luminVal/255);
                //var resultBlue = Math.floor(blueVal+(newBlueVal-blueVal)*luminVal/255);


                //var resultRed = Math.floor(newRedVal+(redVal-newRedVal)*luminVal/255);//more old with more lumin
                //var resultGreen = Math.floor(newGreenVal+(greenVal-newGreenVal)*luminVal/255);
                //var resultBlue = Math.floor(newBlueVal+(blueVal-newBlueVal)*luminVal/255);

                var resultRed = Math.floor(redVal+(newRedVal-redVal)*(-2*Math.abs(luminVal-129)+255)/255);//more old in the middle
                var resultGreen = Math.floor(greenVal+(newGreenVal-greenVal)*(-2*Math.abs(luminVal-129)+255)/255);
                var resultBlue = Math.floor(blueVal+(newBlueVal-blueVal)*(-2*Math.abs(luminVal-129)+255)/255);

                //var resultRed = Math.floor(resultRed*luminDiff);//apply lumin diff
                //var resultGreen = Math.floor(resultGreen*luminDiff);
                //var resultBlue = Math.floor(resultBlue*luminDiff); 

                var resultRed = (resultRed+redVal+redVal)/3;//just tone down to old color
                var resultGreen = (resultGreen+greenVal+greenVal)/3;
                var resultBlue = (resultBlue+blueVal+blueVal)/3;


                // change to your new rgb
                //console.log("CHANGE TO:["+i+"]:"+resultRed+", "+resultGreen+", "+resultBlue+", a:"+alphaVal);
                imageData.data[i]=resultRed;
                imageData.data[i+1]=resultGreen;
                imageData.data[i+2]=resultBlue;
                imageData.data[i+3]=alphaVal;
              }
          }// end fro

        // put the altered data back on the canvas  
        newTex.putImageData(imageData,0,0);
        // put the re-colored image into an image and return it
 //       var newImg = new Image();
        newImg.src = newCan.toDataURL('image/png');
        console.log("newImg: "+ newImg);
        return  newImg;
}// end recolor2

function logImgData(theImg){
        var newCan = document.createElement('canvas');
        var newTex=newCan.getContext("2d");
        var w = theImg.width;
        var h = theImg.height;

        newCan.width = w;
        newCan.height = h;
        newTex.drawImage(theImg, 0, 0, w, h);

        // pull the entire image into an array of pixel data
        var imageData = newTex.getImageData(0, 0, w, h);
        // examine every pixel, 
        for (var i=0;i<imageData.data.length;i+=4)
          {
            console.log("log data["+i+"]:"+imageData.data[i]+", "+imageData.data[i+1]+", "+imageData.data[i+2]+", "+imageData.data[i+3]);
          }//end fro 
}//end logImgData

function drawItem(theItem) {

        if(theItem.Files["Base"]) {
            var baseImg = new Image();
            baseImg.src = theItem.Files["Base"];
            baseImg.onload = function () {
                if (theItem.UseColor == true) {
                    var colorImg = recolorImage2(baseImg,theItem.Color)
                    //colorImg = recolorImage(shadeImg,"#0000FF")
                    colorImg.onload = function () {
                        console.log("about to color draw: "+theItem.Files["Base"]);
                        ctx.drawImage(colorImg,1,1);
                    };//end onload
                }//end if useColor
                console.log("about to draw: "+theItem.Files["Base"]);
                ctx.drawImage(baseImg,1,1);
            };//end onload
        }//end if exists

        if(theItem.Files["Outline"]) {
            var outlineImg = new Image();
            outlineImg.src = theItem.Files["Outline"];
            outlineImg.onload = function () {
                console.log("about to draw: "+theItem.Files["Outline"]);
                ctx.drawImage(outlineImg,1,1);
            };//end onload
        }//end if exists

 //   ctx.moveTo(0,0);
 //   ctx.lineTo(200,100);
 //   ctx.stroke();

}//end drawItem


function drawToken() {

    ctx.clearRect(0, 0, tokenCanvas.width, tokenCanvas.height);

    for (nextLayer in tokenLayers) {
        console.log(tokenLayers[nextLayer]);
        tokenLayers[nextLayer].sort(function(a, b){return a.Index - b.Index});
        for (i = 0; i < tokenLayers[nextLayer].length; i++) { 
            drawItem(tokenLayers[nextLayer][i]);
        }//end for items of nextLayer
    }//end for nextLayer


}//end drawToken







getJSON();

