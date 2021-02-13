/* calendar ipsum */
const calendar = {
	year: 1970,
	month: 1,
	day: new Date().getDate(),
	timezone: "+0000",
	tz: 0,
	zone: 'limsaLominsa',

	handleEvent: function( event ) {
		switch(event.type) {
			case 'load' : 
				let initDate = new Date();
				year = initDate.getFullYear();
				month = initDate.getMonth() + 1;
				timezone = "+0900";
				tz = 9 * 3600 * 1000;
				zone = 'limsaLominsa';
				this.makeCalendar();

				let tbyr = document.getElementById('changeYear');
				let tbmt = document.getElementById('changeMonth');
				let tbdy = document.getElementById('changeDay');
				let tbzn = document.getElementById('changeZone');

				tbyr.addEventListener('change',calendar,false);
				tbmt.addEventListener('change',calendar,false);
				tbdy.addEventListener('change',calendar,false);
				tbzn.addEventListener('change',calendar,false);

				break;
			case 'change' : 
				switch(event.target.id) {
					case 'changeYear' : 
						year = event.target.value;
						this.makeCalendar();
						break;
					case 'changeMonth' : 
						month = event.target.value;
						this.makeCalendar();
						break;			
					case 'changeDay' :
						if (this.dayArray[this.day]) this.dayArray[this.day].classList.remove('hilite');
						this.day = event.target.value;
						this.dayArray[this.day].classList.add('hilite');
						break;
					case 'changeZone' : 
						zone = event.target.value;
						this.makeCalendar();
						break;
					default :
						console.log('unknown target ' + event.target.id);
				}
				break;
			default :
				console.log('unknown event ' + event.type);
		}
	},

	dayArray: new Array,

	consDateCard: function(theDay) {
		const contentDC = document.querySelector('#dateCardTemp').content;
		const startOfDay = theDay - tz;
		const midOfDay = startOfDay + (12 * 3600 * 1000);
		const clone = document.importNode(contentDC,true);

		//date header
		const dtHeader = clone.querySelector('.dates');
		dtHeader.innerHTML=theDay.getDate();

		//am entry
		const dtAm = clone.querySelector('.am');
		const contentAm = this.consMoonEntry(startOfDay);
		if (contentAm) dtAm.appendChild(contentAm);

		//pm entry
		const dtPm = clone.querySelector('.pm');
		const contentPm = this.consMoonEntry(midOfDay);
		if (contentPm) dtPm.appendChild(contentPm);
		return clone;
	},

	consMoonEntry: function(theTime) {
		const content = document.querySelector('#moonEntryTemp').content;
		const clone = document.importNode(content,true);
		const moonEvent = checkMoon(theTime);
		const mp = moonEvent.moonPhase;
		const tt = new Date();
		tt.setTime(moonEvent.timeTill + tz);

		if(mp){
			//image
			const img = clone.querySelectorAll('img');
			img[0].setAttribute('src','./img/'+mp+'.png');
			img[0].setAttribute('alt',mp);

			//moon time
			const mt = clone.querySelector('.moonTime');
			const ts = document.createElement('span');
			let hour = tt.getUTCHours();
			let min = tt.getUTCMinutes();
			let sec = tt.getUTCSeconds();
			if(hour<10) { hour = "0" + hour;}
			if(min<10) { min = "0" + min;}
			if(sec<10) { sec = "0" + sec;}
			ts.innerHTML = hour + ":" + min;
			ts.classList.add('clock');
			ts.setAttribute('data-time','LT');
			ts.setAttribute('data-sec',sec);
			mt.appendChild(ts);

			//moon weather
			const wi1 = img[1];
			const wi2 = img[2];
			const chance1 = getChance(tt.getTime());
			const chance2 = getChance(tt.getTime() + (175 * 8 * 1000));
			const theWeather1 = weathers[weatherChance[zone](chance1)];
			const theWeather2 = weathers[weatherChance[zone](chance2)];
			wi1.setAttribute('style',`object-position: calc(-${theWeather1.imgIndex} * var(--weather-icon-height)) 50%`);
			wi2.setAttribute('style',`object-position: calc(-${theWeather2.imgIndex} * var(--weather-icon-height)) 50%`);
			wi1.setAttribute('title',theWeather1.local['jp']);
			wi2.setAttribute('title',theWeather2.local['jp']);
		} else return; 

		return clone;
	},

	makeCalendar: function() {
		const table_body = document.getElementById('calendarTable').querySelector('tbody');
		table_body.innerHTML = '';
		const firstDate = new Date(Date.UTC(year, month-1, 1, 0, 0, 0));
		const dayOfWeek = firstDate.getDay();
		this.dayArray = [0];
		let dayIndex = firstDate.setDate(-dayOfWeek);
		console.log(firstDate);
		for(var i=1;i<=6;i++){
			const table_row = document.createElement('tr');
			table_row.setAttribute('id','week' + i);
			for(var j=1;j<=7;j++){
				dayIndex += 86400000;
				var d = new Date(dayIndex);
				const table_data = document.createElement('td');
				table_data.setAttribute('id','day'+i+'_'+j);
				if (month-1 === d.getMonth()) {
					this.dayArray.push(table_data);
					if (d.getDate() == this.day) table_data.classList.add('hilite');
				}
				if (month-1 !== d.getMonth()) {
					table_data.setAttribute('class','notThisMonth');
					if (i !== 1 && j === 1) break;
				}
				//construct dateCard
				var frag = this.consDateCard(d);
				table_data.appendChild(frag);
				table_row.appendChild(table_data);
			}
			table_body.appendChild(table_row);
		}
	},
}

/* calendar controls */
const controls = {
	year: new Date().getFullYear(),
	month: new Date().getMonth() + 1,
	day: new Date().getDate(),
	timezone: new Date().getTimezoneOffset(),
	zone: 'limsaLominsa',
	yearSel: {},
	monthSel: {},
	daySel: {},
	timezoneSel: {},
	zoneSel: {},

	handleEvent: function(event) {
		switch (event.type) {
			case 'load' :
				this.initSelections();
				this.yearSel.addEventListener('change',controls,false);
				this.monthSel.addEventListener('change',controls,false);
				this.daySel.addEventListener('change',controls,false);
				this.timezoneSel.addEventListener('change',controls,false);
				this.zoneSel.addEventListener('change',controls,false);
				break;
			case 'change' :
				switch (event.target.id) {
					case 'changeYear' :
						this.year = event.target.value;
						console.log(`this.year: ${this.year}`);
						this.initDay();
						break;
					case 'changeMonth' :
						this.month = event.target.value;
						console.log(`this.month: ${this.month}`);
						this.initDay();
						break;
					case 'changeDay' :
						this.day = event.target.value;
						console.log(`this.day: ${this.day}`);
						break;
					case 'changeZone' :
						this.zone = event.target.value;
						console.log(`this.zone: ${this.zone}`);
						weatherEntryStack = makeWeatherEntryStack(this.zone, document.getElementById('weatherStack'));
						break;
					default : 
						console.log('unknown target ' + event.target.id);
				}
				break;
			default :
				console.log( 'Unknown event type: ' + event.type);
		}
	},
	initSelections : function() {
				this.yearSel = document.getElementById('changeYear');
				this.monthSel = document.getElementById('changeMonth');
				this.daySel = document.getElementById('changeDay');
				this.timezoneSel = document.getElementById('changeTimezone');
				this.zoneSel = document.getElementById('changeZone');
				console.log(this.timezone);
				this.initYear();
				this.initMonth();
				this.initDay();
				this.initTimezone();
				this.initZone();	
	},
	initYear: function() {
		const firstYear = 1970;
		for (var i=firstYear;i<=this.year+10;i++) {
			var frag = document.createElement('option');
			frag.setAttribute('value',i);
			frag.innerHTML = i + '”N';
			if (i === this.year) {frag.setAttribute('selected','');}
			this.yearSel.appendChild(frag);
		}
	},
	initMonth: function() {
		const firstMonth = 1;
		for (var i=1;i<=12;i++) {
			var frag = document.createElement('option');
			frag.setAttribute('value',i);
			frag.innerHTML = i + 'ŒŽ';
			if (i === this.month) frag.setAttribute('selected','');
			this.monthSel.appendChild(frag);
		}
	},
	initDay: function () {
		this.daySel.innerHTML = '';
		const tempDate = new Date(this.year,0,1,0,0,0);
		tempDate.setMonth(this.month);
		tempDate.setDate(0);
		const numDays = tempDate.getDate();
		for (var i=1;i<=numDays;i++) {
			const frag = document.createElement('option');
			frag.setAttribute('value', i);
			frag.innerHTML = i + '“ú';
			if (i == this.day) frag.setAttribute('selected','');
			this.daySel.appendChild(frag);
		}
	},
	initTimezone: function() {
		this.timezoneSel.innerHTML = '';
		const hemiStr = this.timezone<0? 'UTC+' : 'UTC-';
		const tz = Math.abs(this.timezone);
		let tzHour = parseInt(tz/60);
		tzHour = tzHour<10? '0' + tzHour : tzHour;
		let tzMin = parseInt(tz%60);
		tzMin = tzMin<10? '0' + tzMin : tzMin;
		const frag = document.createElement('option');
		frag.setAttribute('value', this.timezone);
		frag.innerHTML = `${hemiStr}${tzHour}:${tzMin}`;
		this.timezoneSel.appendChild(frag);
	},
	initZone: function() {
		const zoneSel = document.getElementById('changeZone');
		const zoneArr = zoneGroups;

		for (i=0;i<zoneArr.length;i++) {
			const zone = zoneArr[i];
			const zoneGroup = zone[0];
			const optionGroup = document.createElement('optgroup');
			optionGroup.setAttribute('label',translateZones['jp'][zoneGroup]);

			for (j=1;j<zone.length;j++) {
				var area = zone[j];
				const opt = document.createElement('option');
				opt.setAttribute('value',area);
				opt.innerHTML = translateZones['jp'][area];
				optionGroup.appendChild(opt);
			}
			zoneSel.appendChild(optionGroup);
		}
	},
}			
///console.log('controls.zone: ', controls.zone);
window.addEventListener('load',calendar,false);
window.addEventListener('load',controls,false);

////////module moon.js//////////////////
function checkMoon(ut){
	const monthTime=4200*1000*32;
	const moonTime = ut%monthTime+1050*1000;
	const tillFull = (monthTime/2)-moonTime;
	const tillNew = monthTime-moonTime;
	const halfDay = 3600 * 12 * 1000;
	let mp, tp;

	switch (true) {
		case (tillNew<halfDay): mp='newMoon';tp=tillNew+ut;break;
		case (0<tillFull && tillFull<halfDay): mp='fullMoon';tp=tillFull+ut;break;
		default: mp=false;tp=false;break;
	}
	return {moonPhase:mp,timeTill:tp}
}
function phaseMoon(ut){
	const monthTime = 4200*1000*32;
	const moonAge = ut%monthTime;
	const phase = moonAge/(4200*1000);
	return phase;
}

