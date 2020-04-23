		function createMap(geojson_data,mapdata,keyword="apples",type){
				
				tmpvar=type;
				if (type=="fresh"){
				
				min=max_min_value(mapdata,keyword,"min");
				max=max_min_value(mapdata,keyword,"max");
				
				// have to use this list for legend
				keyword_distinct_vals=keyword_value_sorted(mapdata,keyword);
			
				keyword_legend_vals=legend_values(keyword_distinct_vals);
			
				colorscale = d3.scaleLog().domain([min+1,max+1]).range([255,0]);
							
				svg.selectAll("path")
				 .data(geojson_data.features)
				 .enter()
				 .append("path")
				 .attr("d", path)
				 .attr("state",function(d){
					return d.properties.name;
				 })
				 .style("stroke","black")
				 .style("fill", function(d){
					return getcolor(d,mapdata,colorscale);
				 })
				 .on("mouseover", tip.show )
				 .on("mouseout", tip.hide );
		
		
				//create legend
				
				svg.selectAll("rect")
				.data(keyword_legend_vals)
				.enter()
				.append("rect")
				   .attr("x", w-70)
				   .attr("y", function(d,i){
						return 90+i*20;
				   })
				   .attr("width",15)
				   .attr("height",15)
				   .attr("fill", function(d){
				   
						color_value=Math.floor(colorscale(d+1));
						blue_color = rgbToHex(255);
						green_color = rgbToHex(color_value);
						red_color = rgbToHex(color_value);
						hexcolor ="#"+red_color+green_color+blue_color;
						return hexcolor;				   

				   })
				   .style("stroke", "black");
	
				// create legend text
						
				svg.selectAll("text")
				.data(keyword_legend_vals)
				.enter()
				.append("text")
				.attr("x",w-50)
				.attr("y",function(d,i){
					return 90+i*20+12;
				})
				.text(function(d){
				return d;
				})
				.style("font", "10px times");	
		
		}
		else{
			refreshmap(mapdata,keyword);
		
		}
				 
}				

		function max_min_value(dataset,keyword="apples",type){
				
				templist=[];
				for (index in dataset){
						if (dataset[index]['state']!='US'){
								templist.push(dataset[index]['volume']);
							}
				}
				
				if (type=="min"){
				
					return d3.min(templist);
				}
			    else{
				
					return d3.max(templist);
				}
		}

		function keyword_value_sorted(dataset,keyword="apples"){
				
				templist=[];
				for (index in dataset){
					if (dataset[index]['state']!='US'){
					
						if (dataset[index]['volume'] || dataset[index]['volume']==0){
							templist.push(parseInt(dataset[index]['volume']));	
						}
					}
				}
				return Array.from(new Set(templist)).sort(d3.ascending);
				
		}

		function legend_values(datalist,total_legends=5){
				
				templist=[];
				templist.push(datalist[0]);
				
				jumps=(datalist.length-2)/(total_legends-2);
				for (i=1;i<total_legends-1;i++){
					
					templist.push(datalist[Math.floor(jumps*i)]);
					
				}
				templist.push(datalist[datalist.length-1]);
				return templist;
				
		}
		
		function getcolor(d,mapdata,colorscale) { 
	
				blue_color = rgbToHex(255);
				
				statename=d.properties.name;
				color_value=255;
				for (index in mapdata){

						if(mapdata[index].state==statename){
							
							color_value=mapdata[index]['volume'];		
							color_value=Math.floor(colorscale(color_value+1));
						}

				}
				
				
				green_color = rgbToHex(color_value);
				red_color = rgbToHex(color_value);
				hexcolor ="#"+red_color+green_color+blue_color;
				return hexcolor;
		}
		
		function rgbToHex(rgb) { 
	
				var hex = Number(rgb).toString(16);
				if (hex.length < 2) {
					hex = "0" + hex;
				}
				return hex;
		}
		
		function tool_tip(currentObject) { 
		
			state= currentObject.attr("state");
			mapdata=map_temp_dataset;
			var region;
			var volume;

				for (index in mapdata){

						if(mapdata[index].state==state){
							
							region=mapdata[index]['region'];		
							volume=mapdata[index]['volume'];	
						}

				}
			
			return_html="<p>" +
			  "State: " + state + "<br>" +
			  "Region: " + region + "<br>" +
			  "Keyword Volume: " + volume + "<br>" +
			  "</p>";
		
		return return_html;
		}
		
		

	function refreshmap(mapdata,keyword){
				
				
				
				tmpvar=98;
				min=max_min_value(mapdata,keyword,"min");
				max=max_min_value(mapdata,keyword,"max");
				
				// have to use this list for legend
				keyword_distinct_vals=keyword_value_sorted(mapdata,keyword);
			
				keyword_legend_vals=legend_values(keyword_distinct_vals);
			
				colorscale = d3.scaleLog().domain([min+1,max+1]).range([255,0]);
							
				svg.selectAll("path")
				 .transition(5000)
				 .attr("d", path)
				 .style("stroke","black")
				 .style("fill", "white");
				 
				 
				 svg.selectAll("path")
				 .transition(2500)
				 .delay(2000)
				 .attr("d", path)
				 .style("stroke","black")
				 .style("fill", function(d){
					return getcolor(d,mapdata,colorscale);
				 });
				 
				//transition legend
				
				svg.selectAll("rect")
				.data(keyword_legend_vals)
				.transition(5000)
				.attr("fill", "white")
				 .style("stroke", "black");

				svg.selectAll("rect")
				.data(keyword_legend_vals)
				.transition(2500)
				.delay(2000)
				.attr("fill", function(d){
				   
						color_value=Math.floor(colorscale(d+1));
						blue_color = rgbToHex(255);
						green_color = rgbToHex(color_value);
						red_color = rgbToHex(color_value);
						hexcolor ="#"+red_color+green_color+blue_color;
						return hexcolor;	
				   	   

				   })
				 .style("stroke", "black");
		
				// transition legend text	
				
				svg.selectAll("text")
				.data(keyword_legend_vals)
				.transition(5000)
				.text("")
				.style("font", "10px times");	

				
				svg.selectAll("text")
				.data(keyword_legend_vals)
				.transition(2500)
				.delay(2000)
				.text(function(d){
				return d;
				})
				.style("font", "10px times");	

	}