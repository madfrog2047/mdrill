g_debug_mode=false;
g_debug_mode_realtime=false;

g_minTickSize="minute";

function getMaxShowTs()
{
	var d=new Date();
	return d.getTime()-1000*590;
}

function getMaxShowHour()
{
	var d=new Date();
	return d.getTime()-1000*3600*3.5;
}

function parseDate(date)
{
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);   
    var day = date.getDate() <= 9 ? "0" + (date.getDate()) : (date.getDate());   
    var hour = date.getHours() <= 9 ? "0" + (date.getHours()) : (date.getHours());
    var miniute = date.getMinutes() <= 9 ? "0" + (date.getMinutes()) : (date.getMinutes());
        var secs = date.getSeconds() <= 9 ? "0" + (date.getSeconds()) : (date.getSeconds());

    var yyyymmdd= (date.getFullYear() + "" + month + "" + day+hour+miniute+secs);         
    return yyyymmdd;
}

function showTooltip(n,x, y, contents) {
  	    $("#axis_id_index_y"+n).css({ opacity: 0.10 });
        $('<div id="tooltip" axix=\''+n+'\'>' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '1px solid #fdd',
            padding: '2px',
            'background-color': '#fee',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }
    
function jsonpcall()
{
	
}

function tooglemode()
{
	
	
	if($("#matchmode").val()=="pid")
	{
		$("#pidtbl").show();
		
		$("#searchtbl").hide();
	}
	else
		{
			
			$("#pidtbl").hide();
		
		$("#searchtbl").show();
		}
		
}
	
	
function tooglesource()
{
	
	
	if($("#source").val()=="pc")
	{
		$("#wireless_sub_tbl").hide();
		
		$("#channel_tbl").hide();
	}
	else
		{
			
			$("#wireless_sub_tbl").show();
		
		$("#channel_tbl").show();
		}
		
}
	
	
	



function filterData(data, label, strthedate) {
	var strtoday = parseDay(new Date());
	var rtn = [];
	var ts = getMaxShowTs();
	var ts2 = getMaxShowHour();
	var ts3=dayToTimestamp2(strtoday.substring(0,4)+"-"+strtoday.substring(4,6)+"-"+strtoday.substring(6)+" 09:10:00")
	for ( var i = 0; i < data.length; i++) {
		if(!g_issumByDay&&"20140302"==strthedate)
		{
			if(!g_debug_mode)
			{
				if (label.indexOf("realtime") >= 0) {
					if (data[i][0] >=ts3) {
						continue;
					}
				} else {
					if (data[i][0] < ts3) {
						continue;
					}
				}
			}
		}else if(!g_issumByDay&&"20140302">strthedate)
		{
			if(!g_debug_mode)
			{
				if (label.indexOf("realtime") >= 0) {
				
				} else {
					continue;
				}
			}
		}else if (strtoday == strthedate) {
			if (data[i][0] >= ts) {
				continue;
			}

			if(!g_debug_mode)
			{
				if (label.indexOf("realtime") >= 0) {
					if (data[i][0] <= ts2) {
						continue;
					}
				} else {
					if (data[i][0] > ts2) {
	
						continue;
					}
				}
			}
		}
		
		rtn.push(data[i]);


	}

	return rtn;

}

		   
	function dayToTimestamp2(str)
	{
		if(str.length<=10)
		{
			str+=" 00:00:00";
		}
	var new_str = str.replace(/:/g,'-');
		new_str = new_str.replace(/ /g,'-');
	var arr = new_str.split("-");
	if(arr.length<=5)
	{
		return 0;
	}
	
		var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
	
		return datum.getTime();
	}
	
			function dayToTimestampDay(s1)
	{

		return dayToTimestamp2(s1.substring(0,4)+"-"+s1.substring(4,6)+"-"+s1.substring(6));
	}
	
			function dayToTimestampDayHourMin(s1,hour)
	{

			var splitday=s1.substring(0,4)+"-"+s1.substring(4,6)+"-"+s1.substring(6)+" "+hour.substring(0,2)+":"+hour.substring(2,4)+":00";
			
		return dayToTimestamp2(splitday);
	}
	
   
		function dayToTimestamp(s1,s2)
	{

		var t1= dayToTimestamp2(s1.substring(0,4)+"-"+s1.substring(4,6)+"-"+s1.substring(6));
		var t2= dayToTimestamp2(s2.substring(0,4)+"-"+s2.substring(4,6)+"-"+s2.substring(6));
		
		return (t2-t1)/(1000*3600*24);
	}
	
	function showload()
	{
		
		      document.getElementById("loading").style.display="";  

          jQuery('#loading-one').empty().append('loading...').parent().fadeIn('slow'); 
	}
	
	
	function hideload()
	{
		
		          document.getElementById("loading").style.display="none";  

	}
	

function parseDay(date)
{
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);   
    var day = date.getDate() <= 9 ? "0" + (date.getDate()) : (date.getDate());   
    var hour = date.getHours() <= 9 ? "0" + (date.getHours()) : (date.getHours());
    var yyyymmdd= (date.getFullYear() + "" + month + "" + day);         
    return yyyymmdd;
}




function tooglepidlist()
{
	timeseries($("#showpidlist").val());
}



function updateLegend() {

			updateLegendTimeout = null;

			var pos = latestPosition;
		

			var axes = plot.getAxes();
			if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
				pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
				return;
			}

						var legends = $("#placeholder .legendLabel");

			var i, j, dataset = plot.getData();
			for (i = 0; i < dataset.length; ++i) {

					var series = dataset[i];	
					for (j = 0; j < series.data.length; ++j) {
						if (series.data[j]!=null&&series.data[j][0] > pos.x) {
							var p2=series.data[j];

							for(var k=(j-1);k>=0;k--)
							{
								if(series.data[k]!=null)
								{
										var p1=series.data[k];
										var y=p1[1]*1 + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
										
										var fixresult=y.toFixed(2);
										
										if(series.label.indexOf("pv")>=0)
										{
											fixresult=y.toFixed(0);
										}
										
										if(series.label.indexOf("rate")<0&&fixresult>100)
										{
											fixresult=y.toFixed(0);
										}
										
										if(series.label.indexOf("=")>=0)
										{
											legends.eq(i).text(series.label.replace(/=.*/, "= " + fixresult));//.toFixed(2)
										}else{
											legends.eq(i).text(series.label+"="+fixresult);
										}
										
										break ;
								}
							}
							
					
							break;
						}
					}

					
			}
		}
		
		
	function plotAccordingToChoices() {
        var data = [];

        choiceContainer.find("input:checked").each(function () {
            var key = $(this).attr("name");
            if (key && datasets[key])
                data.push(datasets[key]);
        });
        
        if(data.length<=0)
        {
        		alert("请至少选择一种数据");
        		return ;
        	
        }

        if (data.length > 0)
        {
            plot =$.plot($("#placeholder"), data, {
            	
               series: {
                   lines: { show: true },
                   points: { show: false }
               },
               legend: {
							   	  backgroundOpacity: 0.15 ,

                    position: "nw" // position of default legend container within plot
              
                },
                crosshair: {
								mode: "x"
								},
               grid: { hoverable: true, clickable: true }     ,
                yaxis: { 
                	alignTicksWithAxis: null,
									position: "right"
                	},
                xaxis: {  	  
                	mode: "time",
                minTickSize: [1, g_minTickSize],
                //min: mdrilldata.min,
                //max: mdrilldata.max,
                timeformat:g_xformat
              }
             
            }
            );
            
      $.each(plot.getAxes(), function (i, axis) {
			if (!axis.show)
				return;

			var box = axis.box;

			$("<div id='axis_id_index_"+axis.direction+axis.n+"' class='axisTarget' style='position:absolute; left:" + box.left + "px; top:" + box.top + "px; width:" + box.width +  "px; height:" + box.height + "px'></div>")
				.data("axis.direction", axis.direction)
				.data("axis.n", axis.n)
				.css({ backgroundColor: "#f00", opacity: 0, cursor: "pointer" })
				.appendTo(plot.getPlaceholder())
				.hover(
					function () { $(this).css({ opacity: 0.10 }) },
					function () { $(this).css({ opacity: 0 }) }
				);
		}); 
   }
   
   
   
    var previousPoint = null;
    $("#placeholder").bind("plothover", function (event, pos, item) {
    	if(!pos||!pos.x||!pos.y)
    	{
    		return ;
    	}
    	
   

        if ($("#enableTooltip:checked").length > 0) {
            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;
                                	  	    $("#axis_id_index_y"+$("#tooltip").attr("axix")).css({ opacity: 0 });

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                        
                    
                    showTooltip(item.series.yaxis.n,item.pageX, item.pageY, $.plot.formatDate(new Date(parseInt(x)),g_xformat)+"="+y);//     item.series.label + " of " + x + " = " + y
                }
            }
            else {
            	
            	  	    $("#axis_id_index_y"+$("#tooltip").attr("axix")).css({ opacity: 0 });

            	
                $("#tooltip").remove();
                
                
                
                previousPoint = null;            
            }
        }
        
        latestPosition = pos;
			if (!updateLegendTimeout) {
				updateLegendTimeout = setTimeout(updateLegend, 50);
			}
    });
    
    
	

    $("#placeholder").bind("plotclick", function (event, pos, item) {
        if (item) {
            $("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label + ".");
            plot.highlight(item.series, item.datapoint);
        }
    });
            
  
  }
  
  
  function makeAllSum(data)
{
	var rtn={};
	for(var p in data)
	{
		rtn[p]=data[p];
		
		rtn[p+"_sum"]=sumData(data[p]);
		
	}
	
	return rtn;
}
  
  
        
   
  
	
function makediffRate(clickdata,pvData)
{

	if(!clickdata||!pvData)
	{
		return [];
	}
	

	var rate={};
	for(var i=0;i<clickdata.length;i++)
	{
		if(clickdata[i]&&clickdata[i].length>=2)
		{
			rate[clickdata[i][0]]=clickdata[i][1];
		}
	}
	
	
	var rtn=[];
	
		for(var i=0;i<pvData.length;i++)
	{
		if(pvData[i]&&pvData[i].length>=2)
		{
			if(pvData[i][1]>0)
			{
				if(rate[pvData[i][0]])
				{
					var clknum=rate[pvData[i][0]];
					if(clknum>0)
					{
						var ratenum=((clknum-pvData[i][1])*100/pvData[i][1]);
						if(ratenum>=9999)
						{
							rtn.push([pvData[i][0],999]);
						}if(ratenum<=-9999){
							
														rtn.push([pvData[i][0],-999]);

							}else{
														rtn.push([pvData[i][0],ratenum]);

	}

					}
				}
			

			}
		}
	}

	return rtn;
}

function makeClickRage(clickdata,pvData)
{

	if(!clickdata||!pvData)
	{
		return [];
	}
	var rate={};
	for(var i=0;i<clickdata.length;i++)
	{
		if(clickdata[i]&&clickdata[i].length>=2)
		{
			rate[clickdata[i][0]]=clickdata[i][1];
		}
	}
	
		
	
	var rtn=[];
	
		for(var i=0;i<pvData.length;i++)
	{
		if(pvData[i]&&pvData[i].length>=2)
		{
			if(pvData[i][1]>0)
			{
				var clknum=0;
				if(rate[pvData[i][0]])
				{
					clknum=rate[pvData[i][0]];
				}
				var ratenum=(clknum*100/pvData[i][1]);
				if(ratenum<=110)
				{
					rtn.push([pvData[i][0],ratenum]);
				}
			}
		}
	}

	return rtn;
	
}


function makeMaxSingle(clickdata)
{
	
	if(!clickdata)
	{
		return [];
	}
	
	var sum=0;
	for(var i=0;i<clickdata.length;i++)
	{
		if(clickdata[i]&&clickdata[i].length>=2)
		{
			if(clickdata[i][1]>sum)
				{
				sum=clickdata[i][1];

				}
		}
	}
	
	var rtn=[];
	for(var i=0;i<clickdata.length;i++)
	{
		if(clickdata[i]&&clickdata[i].length>=2)
		{
			rtn.push([clickdata[i][0],sum]);
		}
	}
	

	return rtn;	
	
}



function makeClickRageNoCut(clickdata,pvData)
{

	if(!clickdata||!pvData)
	{
		return [];
	}
	
//	alert(JSON.stringify(clickdata)+"=="+JSON.stringify(pvData));

	var rate={};
	for(var i=0;i<clickdata.length;i++)
	{
		if(clickdata[i]&&clickdata[i].length>=2)
		{
			rate[clickdata[i][0]]=clickdata[i][1];
		}
	}
	
		
	
	var rtn=[];
	
		for(var i=0;i<pvData.length;i++)
	{
		if(pvData[i]&&pvData[i].length>=2)
		{
			if(pvData[i][1]>0)
			{
				var clknum=0;
				if(rate[pvData[i][0]])
				{
					clknum=rate[pvData[i][0]];
					var ratenum=(clknum*100/pvData[i][1]);
					rtn.push([pvData[i][0],ratenum]);
				}
				

			}
		}
	}

	return rtn;
	
}


function sumDataResult(data)
{
			var sum=0;
			for(var i=0;i<data.length;i++)
			{
				sum+=data[i][1];
			}

			return sum;
}

function sumData(data)
{
			var rtn=[];
			var sum=0;
			for(var i=0;i<data.length;i++)
			{
				sum+=data[i][1];
				rtn.push([data[i][0],sum]);
			}

			return rtn;
}
