var largest = 0; //start with 0

$(".card-text").each(function(){ //loop through each card paragraph
   var findHeight = $(this).height(); //find the height
   if(findHeight > largest){ //see if this height is greater than "largest" height
      largest = findHeight; //if it is greater, set largest height to this one 
   }  
});

$(".card-text").css({"height":largest+"px"});