
//this fundtion gives the minimum and maximum volume amoungst all graph nodes
		function graph_max_min_value(type){
				
				templist=[];
				for (index in links){
						
						templist.push(links[index]['value']);
							
				}

				if (type=="min"){
				
					return d3.min(templist);
				}
			    else{
				
					return d3.max(templist);
				}
		}
		
//this fundtion is used to create graph links

		function create_links(data){
			links=[];
					
			for (index in data){
					
				if (index=="columns"){
				}
				else{
						
					tempdict={};
					tempdict['source']=data[index]['source'];
					tempdict['target']=data[index]['target'];
					tempdict['value']=data[index]['volume'];
					links.push(tempdict);
				}
			}
			return links;
		}
		
	


	