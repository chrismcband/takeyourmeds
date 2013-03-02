var bound = false; 

function bindJavascript(){ 
	var pjs = Processing.getInstanceById('process');
	if(pjs != null) {
		pjs.bindJavascript(this);
		bound = true;
	}
	if(!bound) setTimeout(bindJavascript, 250);
}

bindJavascript();

function showNews(b) {
    
    ajaxIndex = b.floor;

    

	$.ajax({
		url: 'http://content.guardianapis.com/search?q=crossrail&format=json&api-key=ud33jsmw9jgvnhgk59ttrttz',
		dataType: "jsonp",
		success: searchCallbackGuardian
	});
}




	function searchCallbackGuardian(data) {
	 var results = data.response.results;
	 $.each(results, function(index, result) {
		
		if(index == ajaxIndex){
	 		//console.log(ajaxIndex)
	 		console.log(result.webTitle + index)
			$(".ajax-data").html('<div id="box-'+index+'"class="box tl tr bl br span-5"><div class="span-5"><h3><a target="_blank" href="'+ result.webUrl+'">' + result.webTitle + '</a></h3></div><div class="thumbnail span-5"></div>');
	 	}
	 });
}


	/*function showResultsGuardian(){		
		  $.ajax({
				url: 'http://content.guardianapis.com/search?q=crossrail&format=json&api-key=ud33jsmw9jgvnhgk59ttrttz',
		    dataType: "jsonp",
		    success: searchCallbackGuardian
		  });
	}*/






