			var clusters;
		
		function createClusters(clust_dataset3,keyword="apples"){
				
				var topic=clust_dataset3[0]["alltopics"].split(",");
				clusters=clust_dataset3[0]["unique"];
				x_padding=20;
				y_padding=20;
				box_width=cluster_width/3;
				box_height=calculateBoxHeight(cluster_height,y_padding,clusters);
				
				
				if (clusters==3){
				
						createBoxTopic(x_padding,y_padding,box_width,box_height, topic[0],clust_dataset3);
						createBoxTopic(x_padding,box_height+ 2*y_padding,box_width,box_height, topic[1],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,y_padding,box_width,box_height, topic[2],clust_dataset3);
				}
				
				else if (clusters==4){

						createBoxTopic(x_padding,y_padding,box_width,box_height, topic[0],clust_dataset3);
						createBoxTopic(x_padding,box_height+ 2*y_padding,box_width,box_height, topic[1],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,y_padding,box_width,box_height, topic[2],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,box_height+ 2*y_padding ,box_width,box_height, topic[3],clust_dataset3);

				}
				else if (clusters==5){
					
						createBoxTopic(x_padding,y_padding,box_width,box_height, topic[0],clust_dataset3);
						createBoxTopic(x_padding,box_height+ 2*y_padding,box_width,box_height, topic[1],clust_dataset3);
						createBoxTopic(x_padding,2*box_height+ 3*y_padding ,box_width,box_height, topic[2],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,y_padding,box_width,box_height, topic[3],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,box_height+ 2*y_padding ,box_width,box_height, topic[4],clust_dataset3);
				

				}
				else if (clusters==6){
		   
						createBoxTopic(x_padding,y_padding,box_width,box_height, topic[0],clust_dataset3);
						createBoxTopic(x_padding,box_height+ 2*y_padding,box_width,box_height, topic[1],clust_dataset3);
						createBoxTopic(x_padding,2*box_height+ 3*y_padding ,box_width,box_height, topic[2],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,y_padding,box_width,box_height, topic[3],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,box_height+ 2*y_padding ,box_width,box_height, topic[4],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width, 2*box_height+ 3*y_padding ,box_width,box_height, topic[5],clust_dataset3);   

				}
				else if (clusters==7){
				
						createBoxTopic(x_padding,y_padding,box_width,box_height, topic[0],clust_dataset3);
						createBoxTopic(x_padding,box_height+ 2*y_padding,box_width,box_height, topic[1],clust_dataset3);
						createBoxTopic(x_padding,2*box_height+ 3*y_padding ,box_width,box_height, topic[2],clust_dataset3);
						createBoxTopic(x_padding,3*box_height+ 4*y_padding ,box_width,box_height, topic[3],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,y_padding,box_width,box_height, topic[4],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,box_height+ 2*y_padding ,box_width,box_height, topic[5],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width, 2*box_height+ 3*y_padding ,box_width,box_height, topic[6],clust_dataset3);

				}

				else {
				
						createBoxTopic(x_padding,y_padding,box_width,box_height, topic[0],clust_dataset3);
						createBoxTopic(x_padding,box_height+ 2*y_padding,box_width,box_height, topic[1],clust_dataset3);
						createBoxTopic(x_padding,2*box_height+ 3*y_padding ,box_width,box_height, topic[2],clust_dataset3);
						createBoxTopic(x_padding,3*box_height+ 4*y_padding ,box_width,box_height, topic[3],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,y_padding,box_width,box_height, topic[4],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width,box_height+ 2*y_padding ,box_width,box_height, topic[5],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width, 2*box_height+ 3*y_padding ,box_width,box_height, topic[6],clust_dataset3);
						createBoxTopic(cluster_width-x_padding- box_width, 3*box_height+ 4*y_padding ,box_width,box_height, topic[7],clust_dataset3);


				}
		
		}
		
		function calculateBoxHeight(svg_height,y_padding,clusters){
			
			workable_height=svg_height-2*y_padding;
			levels=Math.round(clusters/2);
			inbetween_padding=y_padding;
			ht=(workable_height-inbetween_padding*(levels-1))/levels;
			return ht;
			
		}

		function createBoxTopic(x,y,w,h,topic,clust_dataset3){
			
			
					svg3.append("rect")
					   .attr("x", x)
					   .attr("y", y)
					   .attr("width", w)
					   .attr("height", h)
					   .style("stroke-width", 3)
					   .style("stroke", "teal")			   
					   .attr("fill", "none")
						.attr("rx", 30)
						.attr("ry", 30);;
			   
				   
					svg3.append("text")
					   .attr("x", cluster_width/6+x)
					   .attr("y", y+15)
					   .text(topic)
					   .style("text-anchor", "middle")
					   .style("font-size", "13px")
					   .style("font-weight", "bold");
					   
					createTopicData(x,y,w,h,topic,clust_dataset3);
			
		}

		function createTopicData(x,y,w,h,topic,clust_dataset3){
			
						tempdata=[];
						
						if (clusters<7){
						linestartpadding=40;
						linepadding=40;
						linesize=30;
						sidepadding=20;
						}
						else{
							
						linestartpadding=30;
						linepadding=30;
						linesize=30;
						sidepadding=20;
						}
						

						for (index in clust_dataset3){		
												
								if(clust_dataset3[index]['cluster_no']==topic){
									
									tempdata.push(clust_dataset3[index]);
								}

						   }

						for (index in tempdata){
							
							
							svg3.append("a")
							.attr("xlink:href", tempdata[index]["link"])
							.append("rect")  
							.attr("x", x+sidepadding)
							.attr("y", y+linestartpadding+index*linepadding)
							.attr("height", linesize)
							.attr("width", w-2*sidepadding)
							.style("fill", "lightgreen")
							.attr("rx", 10)
							.attr("ry", 10);

							// draw text on the screen
							if (tempdata[index]["headline"]){
								
								svg3.append("text")
								.attr("x",  x+sidepadding)
								.attr("y", y+linestartpadding+index*linepadding+15)
								.style("fill", "black")
								.style("font-size", "10px")
								.attr("dy", ".35em")
								.attr("text-anchor", "left")
								.style("pointer-events", "none")
								.text(tempdata[index]["headline"].slice(0,30));

							}
							else {
								svg3.append("text")
								.attr("x",  x+sidepadding)
								.attr("y", y+linestartpadding+index*linepadding+15)
								.style("fill", "black")
								.style("font-size", "10px")
								.attr("dy", ".35em")
								.attr("text-anchor", "left")
								.style("pointer-events", "none")
								.text(tempdata[index]["link"].slice(0,30));

							}

			
						}				

			
		}
		
	