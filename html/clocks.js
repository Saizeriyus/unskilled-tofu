			const clocks = {
							clockLT : document.getElementById('clockLT'),
							dateLT : document.getElementById('dateLT'),
							clockET : document.getElementById('clockET'),
							dateET : document.getElementById('dateET'),
							toggleClock : true,
							handleEvent: function(event) {
											switch(event.type) {
															case 'load' :
																clockLT.classList.add('clock');
																clockLT.setAttribute('data-time','LT');
																clockET.classList.add('clock');
																clockET.setAttribute('data-time','ET');
																this.mainClock();
																clockLT.addEventListener('click',this,false);
																clockET.addEventListener('click',this,false);
																break;
															case 'click' :
																this.toggleClock = this.toggleClock? false : true;
																this.mainClock();
																break;
															default : console.log('Unexpected data-type at clocks :' + event.type);
														}
										},
							mainClock : function() {
											this.acc = 0;
											const now = new Date();
											const ut = now.getTime();
											switch (0) {
													case this.acc%1000 : this.tickLT(now);
													case this.acc%50 : 
															this.tickET(now);
															if (weatherEntryStack)
																	for(var i = 0; i < weatherEntryStack.length; i++) {
																		weatherEntryStack[i].remainingTime(ut);
																	}
														}
											this.acc += 50;
											if(this.toggleClock) window.setTimeout(this.mainClock.bind(this),50);
										},
							formatClock : function(cl,hour,min,sec) {
											if(hour<10) hour = '0' + hour;
											if(min<10) min = '0' + min;
											if(sec<10) sec = '0' + sec;
											cl.innerHTML = hour + ':' + min;
											cl.setAttribute('data-sec',sec);
										},
				  			tickLT : function(now) {
											const hour = now.getHours();
											const min = now.getMinutes();
											const sec = now.getSeconds();
											this.formatClock(clockLT,hour,min,sec);
											dateLT.innerHTML = now.toDateString();
										},
							tickET : function(now) {
				  							const ut = now.getTime();
											let hour = (ut%4200000)/175000;
											let min = (hour%1)*60;
											let sec = (min%1)*60;
											hour = Math.floor(hour);
											min = Math.floor(min);
											sec = Math.floor(sec);
											this.formatClock(clockET,hour,min,sec);
											dateET.innerHTML = (Math.floor(phaseMoon(ut)*100)/100).toFixed(2);
										},
				  			currentDate : function(now) {
				  							const str = now.toDateString();
											dateLT.innerHTML = str;
				  },
							currentEoDate : function(now) {
											const ut = now.getTime();
											const phase = phaseMoon(ut);
											dateET.innerHTML = phase.toFixed(2);
										},
							timeET : function(ut) {
											let hour = (ut%4200000)/175000;
											let min = (hour%1)*60;
											let sec = (min%1)*60;
											hour = Math.floor(hour);
											min = Math.floor(min);
											sec = Math.floor(sec);
											return { hour: hour, min: min, sec: sec, }
										},
						}

