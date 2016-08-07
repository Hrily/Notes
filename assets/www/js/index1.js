	function srch()
	{
		var str="",query=S("query").value;
		for(r=0;r<strlen;r++)
		{
			if(dbEntries[r].search(query)>-1)
			{str+=dbEntries[r];}
		}
        if(str=="")
		{str="<p align='center'>No results found</p>";}
		S("texts").innerHTML=str;
		$('p').show('fast');
		
	}
	
	function srchshow() {
		$('.write').hide('fast');
		$('#menu').hide('fast');
		$('#srbtn').hide('fast');
		menbt();
		$("#help").hide();
		$(".about").hide("fast");
		$('p').hide("fast", function() {$(".search").show("fast");});
	}
	
	function abtshow()
	{
		$(".write").hide();
		$("p").hide();
		$("#menu").hide("fast");
		$(".search").hide();
		$("#about").show("fast");
		$(".confirm").hide();
		menbt();
		$("#help").hide();
	}
	
	function abthide()
	{
		$(".about").hide("fast");
		$("p").show("fast");
	}

	function helpshow()
	{
		$(".write").hide();
		$("p").hide();
		$("#menu").hide("fast");
		$(".search").hide();
		$("#about").hide();
		$(".confirm").hide();
		menbt();
		$("#help").show("fast");
	}
	
	
