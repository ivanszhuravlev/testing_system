$(function(){
	App.init();
});

Date.prototype.daysInMonth = function() {
	return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

var App = {
	vich_found: 0,
	vaart: 0,
	aMonth: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
	aWeekend: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
	aStatuses: ["green", "red", "orange", "yellow", "blue"],
	selectorVich: 'input[type="radio"][name="vich"]',
	selectorVaart: 'input[type="radio"][name="vaart"]',
	
	$target: {},
	$vichFound: {},
	$vaart: {},

	init: function()
	{
		this.$target = $('#target');
		
		$(this.selectorVich+', '+this.selectorVaart).on('change', function(){
			App.calc();
		});
		App.calc();
	},
	calc: function()
	{
		var vich = parseInt($(this.selectorVich + ':checked').val());
		var vaart = parseInt($(this.selectorVaart + ':checked').val());
		var dateX = {};
		var aData = [];
		
		// console.log('vich - '+vich+'; vaart - '+vaart);
		
		// определим следующий месяц
		var date = new Date();
		var nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
		var year = nextDate.getFullYear();
		var mon  = nextDate.getMonth();
		var totalDays = nextDate.daysInMonth();
		
		// нужно вычеслить первый вторник
		var tuesdayNum = 0;
		for(var i=0; i<totalDays; i++){
			var tmpDate = new Date(year, mon, i+1);
			var weekDay = this.getWeekDay(tmpDate);
			
			if(weekDay === "вт"){
				tuesdayNum = i+1;
				break;
			}
		}
		
		// задали дату X
		dateX = new Date(year, mon, tuesdayNum);
		
		if (vaart === 1){
			if (vich) {
				//aStatuses: ["green", "red", "orange", "yellow", "blue"],
				//				0		1		2		  3		  4
				//  [day, key]
				aData = [
					[28, 0],
					[28, 4],
					[42, 1],
					[56, 0],
					[56, 4],
					[112, 0],
					[112, 4],
					[168, 0],
					[168, 4],
					[168, 1],
					[224, 0],
					[224, 4],
					[280, 0],
					[280, 4],
					[280, 1],
					[336, 0],
					[336, 4],
					[392, 0],
					[392, 4],
					[392, 1]
				];
				
			} else {
				//aStatuses: ["green", "red", "orange", "yellow", "blue"],
				//				0		1		2		  3		  4
				aData = [
					[0, 0],
					[0, 4],
					[0, 1],
					[56, 0],
					[56, 4],
					[112, 0],
					[112, 4],
					[112, 1],
					[168, 0],
					[168, 4],
					[224, 0],
					[224, 4],
					[224, 1],
					[280, 0],
					[280, 4],
					[336, 0],
					[336, 4],
					[336, 1],
					[392, 0],
					[392, 4]
				];
			}
		
		}  if (vaart === 2){
			if (vich) {
				//aStatuses: ["green", "red", "orange", "yellow", "blue"],
				//				0		1		2		  3		  4
				aData = [
					[104, 0],
					[104, 1],
					[188, 0],
					[188, 1],
					[272, 0],
					[272, 1],
					[356, 0],
					[356, 1]
				];
			} else {
				//aStatuses: ["green", "red", "orange", "yellow", "blue"],
				//				0		1		2		  3		  4
				aData = [
					[0, 0],
					[0, 1],
					[84, 0],
					[84, 1],
					[168, 0],
					[168, 1],
					[252, 0],
					[252, 1],
					[336, 0],
					[336, 1]
				];
			}
		
		} else if(vich === 1) {
			//aStatuses: ["green", "red", "orange", "yellow", "blue"],
			//				0		1		2		  3		  4
			aData = [
				[0, 3],
				[0, 1],
				[10, 2],
				[10, 0],
				[10, 1],
				[10, 3],
				[14, 3],
				[14, 3],
				[15, 3],
				[15, 3],
				[16, 3],
				[16, 3],
				[20, 3],
				[20, 3],
				[20, 0],
				[20, 2]
			];
			
		} else if(vich === 2) {
			//aStatuses: ["green", "red", "orange", "yellow", "blue"],
			//				0		1		2		  3		  4
			aData = [
				[0, 0],
				[0, 1],
				[0, 3],
				[10, 0],
				[10, 2],
				[14, 3],
				[14, 3],
				[15, 3],
				[15, 3],
				[16, 3],
				[16, 3],
				[20, 3],
				[20, 3],
				[20, 0]
			];	
		}
		
		// почистить и выставить по тефолту
		this.$target.empty();
			
		// если есть куда делать метки, то пометим дни
		if(aData.length){
			// console.log('Зашли в aData.length');
			// надо узнать начальный и конечный месяц. Начальный месяц это следующий месяц.
			// возьмем самую большую прибавляемую дату
			var maxDay = 0;
			for(var i=0; i<aData.length; i++){
				var tmp_day = aData[i][0];

				if(tmp_day > maxDay){
					maxDay = tmp_day;
				}
			}
			
			// определим конечную дату
			var dateZ = new Date(dateX.getFullYear(), dateX.getMonth(), dateX.getDate() + maxDay);
			//dateZ.setDate(dateZ.getDate() + maxDay);

			var aRazdnica = this.dateDiff(dateX, dateZ);
			// console.log('Раздница дат - ', aRazdnica);
			
			// узнаем: сколько месяцев раздница
			var loopMonth = aRazdnica[0]*12 + aRazdnica[1];
			loopMonth = aRazdnica[2]? loopMonth+1: loopMonth; // если есть еще дни, то на всякий случай прибавим еще
			loopMonth = !loopMonth? 1: loopMonth; // хотя бы один должен быть месяц
			// console.log('Показать месяцев - '+loopMonth);
			
			// теперь отрисуем нужное кол-во месяцев
			var date = new Date(dateX.getFullYear(), dateX.getMonth(), 1);
			for(var i=0; i<loopMonth; i++){
				var year = date.getFullYear();
				var mon  = date.getMonth();
				var totalDays = date.daysInMonth();
				var totalEmpty = new Date(year, mon, 1).getDay() - 1;
				var aDays = [];

				if(totalEmpty === -1){
					totalEmpty = 6;
				}

				// создадим пустые дни вначале
				for(var j = 0; j < totalEmpty; j++){
					aDays.push(0);
				}
				// создадим натуральные дни
				for(var j = 0; j < totalDays; j++){
					aDays.push(j+1);
				}

				// отрисуем
				this.$target.append(this.tplMonth(year, this.aMonth[mon], mon+1, aDays));

				// изменим для последующей обработки
				date.setMonth(mon + 1);
			}
			
			// пройдемся по всем точкам и поставим нужные метки
			for(var i=0; i<aData.length; i++){
				var tmp_day = aData[i][0];
				var tmp_color = this.aStatuses[aData[i][1]];
				var tmpDate = new Date(dateX.getFullYear(), dateX.getMonth(), dateX.getDate());
				
				tmpDate.setDate(tmpDate.getDate() + tmp_day);
				
				var myattr = tmpDate.getFullYear()+'-'+(tmpDate.getMonth()+1)+'-'+tmpDate.getDate();
				var $metka = $('<div class="metka" style="background-color:'+tmp_color+'"></div>');
				$('.month-days-cell[myattr="'+myattr+'"]').find('.month-days-cell-tbl').append($metka);
				// console.log(myattr);
			}
		}
	},
	getWeekDay: function(date) 
	{
		var days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

		return days[date.getDay()];
	},
	dateDiff: function(date1, date2) 
	{
		//date1 = new Date( date1 );
		//date2 = new Date( date2 );

		var milliseconds = date2.getMilliseconds() - date1.getMilliseconds();

		if ( milliseconds < 0 ) {
			milliseconds += 1000;
			date2.setSeconds( date2.getSeconds() - 1 );
		}

		var seconds = date2.getSeconds() - date1.getSeconds();

		if ( seconds < 0 ) {
			seconds += 60;
			date2.setMinutes( date2.getMinutes() - 1 );
		}

		var minutes = date2.getMinutes() - date1.getMinutes();

		if ( minutes < 0 ) {
			minutes += 60;
			date2.setHours( date2.getHours() - 1 );
		}

		var hours = date2.getHours() - date1.getHours();

		if ( hours < 0 ) {
			hours += 24;
			date2.setDate( date2.getDate() - 1 );
		}

		var days = date2.getDate() - date1.getDate();

		if ( days < 0 ) {
			days += new Date( date2.getFullYear(), date2.getMonth() - 1, 0 ).getDate() + 1;
			date2.setMonth( date2.getMonth() - 1 );
		}

		var months = date2.getMonth() - date1.getMonth();

		if ( months < 0 ) {
			months += 12;
			date2.setFullYear( date2.getFullYear() - 1 );
		}

		var years = date2.getFullYear() - date1.getFullYear();

		return [ years, months, days, hours, minutes, seconds, milliseconds ];
	},
	tplMonth: function(year, monthName, monNum, aDays)
	{
		var sWeeks = "";
		for(var i=0; i<this.aWeekend.length; i++){
			sWeeks += '<div class="month-week-cell">'+this.aWeekend[i]+'</div>';
		}

		var sDays = "";
		for(var i=0; i < aDays.length; i++){
			var day = aDays[i];
			
			if(day === 0){
				sDays += '<div class="month-days-cell-empty"></div>';

			} else {
				// myattr - вспомогательный атрибут, по нему будем далее находить
				sDays += '<div class="month-days-cell" myattr="'+year+'-'+monNum+'-'+day+'"><font>'+day+'</font><div class="month-days-cell-tbl"></div></div>';
			}
		}

		var aHtml = [
			'<div class="month">',
				'<div class="month-year">',
					year,
				'</div>',
				'<div class="month-name">',
					monthName,
				'</div>',
				'<div class="month-week-wraper">',
					sWeeks,
				'</div>',
				'<div class="month-days-wraper">',
					sDays,
				'</div>',
			'</div>'
		];

		return aHtml.join("");
	}
};