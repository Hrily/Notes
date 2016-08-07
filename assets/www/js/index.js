var app = {
    initialize: function() {
        // TODO: put PhoneGap initialization here
        // alert("Hello World!");
		
    },
};

var strlen=0;

	
	function S(id)
	{return document.getElementById(id);}
	
	function confirmdel(i) {
		$('.confirm').show('fast');
		$('#cbtn').attr("onClick","del("+i+");");
		//alert($('#cbtn').attr("onClick"));
	}
	
	function del(i) {
		$('.confirm').hide("fast");
		i=parseInt(i);
		var str="";
		for(p=0;p<i;p++)
		{str+=dbEntries[p]+"\n\t\n";}
		for(j = i;j < (strlen);j++)
		{str+=dbEntries[j+1]+"\n\t\n";}
		dbEntries=str.split("\n\t\n");
		saveText(1);
		$('p').prepend("<div class='buttona' style='position:absolute;left:83%;font-size:15px;' onclick='confirmdel($(this).parent().index());'>Delete</div>");
		}
		
	function menushow() {
		$('.search').hide('fast');
		$('p').hide('fast',function(){$('.write').show('fast');});
		delhide();
		$(".about").hide("fast");
		$("#help").hide();
	}
		
	function delhide() {
		$('.buttona').remove();
		$('#hdbtn').attr('src','img/write.jpg').attr('onClick','menushow();');
	}
		

	function delshow() {
		$('.write').hide("fast", function() {$("p").show("fast");});
		menbt();
		$("#help").hide();
		$(".about").hide("fast");
		$('#hdbtn').attr('src','img/wrong.jpg').attr('onClick','delhide();');
		$('#menu').toggle('fast', function() {$('p').prepend("<div class='buttona' style='position:absolute;left:83%;font-size:15px;' onclick='confirmdel($(this).parent().index());'>Delete</div>");});
	}

	
	        var FILENAME = 'Android/data/com.hrily.notes/.database.hdb',
            /*$ = function (id) {
                return document.getElementById(id);
            },*/
            failCB = function (msg) {
                return function () {
                    alert('[FAIL] ' + msg);
                };
            },
            file = {
                writer: { available: false },
                reader: { available: false }
            },
            dbEntries = [];
 
        document.addEventListener('deviceready', function () {
            var fail = failCB('requestFileSystem');
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }, false);
 
        function gotFS(fs) {
            var fail = failCB('getFile');
			fs.root.getDirectory("Android/data/com.hrily.notes", {create: true, exclusive: false},
                            gotFileEntry, fail);
            fs.root.getFile(FILENAME, {create: true, exclusive: false},
                            gotFileEntry, fail);
        }
 
        function gotFileEntry(fileEntry) {
            var fail = failCB('createWriter');
            file.entry = fileEntry;
 
            fileEntry.createWriter(gotFileWriter, fail);
            readText();
        }
 
        function gotFileWriter(fileWriter) {
            file.writer.available = true;
            file.writer.object = fileWriter;
        }
 
        function saveText(e) {
            var str = document.getElementById("str").value,
				dat = new Date(),
                fail;
			var hr = (dat.getHours()>11)?dat.getHours()-12:"0"+dat.getHours();
			var ap = (dat.getHours()>11)?"PM":"AM";
 			if(e==0)
            {dbEntries.unshift('<p><b>' + dat.getDate() + '/' + dat.getMonth() + '/' + dat.getFullYear()+ ' ' + hr + ':' + dat.getMinutes() + ' ' + ap + '</b><br>' + str + '</p>');}
            
            document.getElementById("str").value = '';
 
           // $('definitions').innerHTML = dbEntries.join('');
 
            if (file.writer.available) {
                file.writer.available = false;
                file.writer.object.onwriteend = function (evt) {
                    file.writer.available = true;
                    file.writer.object.seek(0);
                };
                file.writer.object.write(dbEntries.join("\n\t\n"));
				readText();
            }
 			
            return false;
        }
 
        function readText() {
            if (file.entry) {
                file.entry.file(function (dbFile) {
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
                        var textArray = evt.target.result.split("\n\t\n");
 						$('.write').hide();
                        dbEntries = textArray;//.concat(dbEntries);
 						if(textArray.length>=2)
                        {document.getElementById("texts").innerHTML = textArray.join(' ');}
						$('p').show();
						strlen=$('p:last').index();
                    };    
					reader.readAsText(dbFile);
                }, failCB("FileReader"));
            }
 			
            return false;
        }
		

