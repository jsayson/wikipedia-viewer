$(document).ready(function(){
function srchAni(){
	$("#title").hide();
	$("#rand").hide();
	$("#contain").animate({left: "0",marginTop: '10px'});
};	
function loadData(){
srchAni();
document.getElementById("search").focus();
var $lists = $("#list");
$lists.text("");
		$("#showRes").html("<hr>");
		var mySrch = $("#search").val();
		/*var resRequestTimeout = setTimeout(function(){
			$("#res").html("<li class='err'><p>The page <strong><span style='color:red'>"+mySrch+"</span></strong> does not exist</p><p>There were no results matching the query.</p><li>");
		}, 8000);*/
		$.ajax({
			url: "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+mySrch+"&format=json&callback=?",
			dataType: "jsonp",
			success: function(response){
				//console.log(response.query);
				var result = response.query.search;
				$("#list").append("<h2>Topics with keyword: <strong>"+mySrch+"</strong></h3>");
				for(var i=0;i<=result.length;i++){
					$("#list").append("<li><a href='https://en.wikipedia.org/wiki/"+result[i].title+"' target='_blank'><h3 class='hyper'>"+result[i].title+"</h3><p>"+result[i].snippet+"<br><span class='time'> "+new Date(result[i].timestamp)+"</span></p></li></a><hr><br>");
					}
			},
			/*error: function(){	 
				clearTimeout(resRequestTimeout);
					}*/
		});
};
document.addEventListener("keydown",keyPush);
function keyPush(evt){
	//console.log(evt.which);
		if(evt.which == 116){
			loadData();
			return false;
		}
		if(evt.which == 13){
		//console.log(evt.which);
			loadData();
			return false;
		}
};
function getRandom(){
$.ajax({
		url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1",
		dataType: "jsonp",
		success: function(response){
			//console.log(response);
			var randRes = response.query.random;
		$("#rand").html("<a href='https://en.wikipedia.org/wiki/"+response.query.random[0]['title']+"' target='blank'><button type='submit' class='btn btn-success'><span class='fa fa-search'></span> Random Search</button></a>")
		}
	});
};
getRandom();
$("#submit").on("click", loadData);
$("#search").on("click", srchAni);
});