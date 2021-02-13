// Calculations derived from 
// github.com/eorzea-weather/eorzea-weather/
// under the following license:
// MIT License
//
// Copyright (c) 2018 Lily Cartelet
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


function getChance(date) {
	const ut = Math.trunc(date/1000);
	const bell = Math.trunc((ut%4200)/175);
	const increment = (bell - bell % 8 + 8) % 24;
	const totalDays = Math.trunc(ut/4200);
	const calcBase = totalDays * 100 + increment;
	const step1 = (calcBase << 11)^calcBase;
	const step2 = (step1 >> 8)^step1;
	const chance = step2%100;
   ///const logg = { ut, bell, increment, totalDays, calcBase, step1, step2, chance}; 
	///console.log(logg);
	return step2%100;
}

var weatherChance = {
	amhAraeng: (chance) => {
		if (chance < 45) {
			return 'w_fairSkies';
		}
		if (chance < 60) {
			return 'w_clouds';
		}
		if (chance < 70) {
			return 'w_dustStorms';
		}
		if (chance < 80) {
			return 'w_heatWaves';
		}
		return 'w_clearSkies';
	},

azysLla: (chance) => {
  if (chance < 35) {
    return 'w_fairSkies';
  }
  if (chance < 70) {
    return 'w_clouds';
  }
  return 'w_thunder';
},

bozjanSouthernFront: (chance) => {
  if (chance < 52) {
    return 'w_fairSkies';
  }
  if (chance < 64) {
    return 'w_rain';
  }
  if (chance < 76) {
    return 'w_wind';
  }
  if (chance < 88) {
    return 'w_thunder';
  }
  return 'w_dustStorms';
},

centralShroud: (chance) => {
  if (chance < 5) {
    return 'w_thunder';
  }
  if (chance < 20) {
    return 'w_rain';
  }
  if (chance < 30) {
    return 'w_fog';
  }
  if (chance < 40) {
    return 'w_clouds';
  }
  if (chance < 55) {
    return 'w_fairSkies';
  }
  if (chance < 85) {
    return 'w_clearSkies';
  }
  return 'w_fairSkies';
},

centralThanalan: (chance) => {
  if (chance < 15) {
    return 'w_dustStorms';
  }
  if (chance < 55) {
    return 'w_clearSkies';
  }
  if (chance < 75) {
    return 'w_fairSkies';
  }
  if (chance < 85) {
    return 'w_clouds';
  }
  if (chance < 95) {
    return 'w_fog';
  }
  return 'w_rain';
},

coerthasCentralHighlands: (chance) => {
  if (chance < 20) {
    return 'w_blizzards';
  }
  if (chance < 60) {
    return 'w_snow';
  }
  if (chance < 70) {
    return 'w_fairSkies';
  }
  if (chance < 75) {
    return 'w_clearSkies';
  }
  if (chance < 90) {
    return 'w_clouds';
  }
  return 'w_fog';
},

coerthasWesternHighlands: (chance) => {
  if (chance < 20) {
    return 'w_blizzards';
  }
  if (chance < 60) {
    return 'w_snow';
  }
  if (chance < 70) {
    return 'w_fairSkies';
  }
  if (chance < 75) {
    return 'w_clearSkies';
  }
  if (chance < 90) {
    return 'w_clouds';
  }
  return 'w_fog';
},

eastShroud: (chance) => {
  if (chance < 5) {
    return 'w_thunder';
  }
  if (chance < 20) {
    return 'w_rain';
  }
  if (chance < 30) {
    return 'w_fog';
  }
  if (chance < 40) {
    return 'w_clouds';
  }
  if (chance < 55) {
    return 'w_fairSkies';
  }
  if (chance < 85) {
    return 'w_clearSkies';
  }
  return 'w_fairSkies';
},

easternLaNoscea: (chance) => {
  if (chance < 5) {
    return 'w_fog';
  }
  if (chance < 50) {
    return 'w_clearSkies';
  }
  if (chance < 80) {
    return 'w_fairSkies';
  }
  if (chance < 90) {
    return 'w_clouds';
  }
  if (chance < 95) {
    return 'w_rain';
  }
  return 'w_showers';
},

easternThanalan: (chance) => {
  if (chance < 40) {
    return 'w_clearSkies';
  }
  if (chance < 60) {
    return 'w_fairSkies';
  }
  if (chance < 70) {
    return 'w_clouds';
  }
  if (chance < 80) {
    return 'w_fog';
  }
  if (chance < 85) {
    return 'w_rain';
  }
  return 'w_showers';
},

eulmore: (chance) => {
  if (chance < 10) {
    return 'w_gales';
  }
  if (chance < 20) {
    return 'w_rain';
  }
  if (chance < 30) {
    return 'w_fog';
  }
  if (chance < 45) {
    return 'w_clouds';
  }
  if (chance < 85) {
    return 'w_fairSkies';
  }
  return 'w_clearSkies';
},

eurekaAnemos: (chance) => {
  if (chance < 30) {
    return 'w_fairSkies';
  }
  if (chance < 60) {
    return 'w_gales';
  }
  if (chance < 90) {
    return 'w_showers';
  }
  return 'w_snow';
},

eurekaHydatos: (chance) => {
  if (chance < 12) {
    return 'w_fairSkies';
  }
  if (chance < 34) {
    return 'w_showers';
  }
  if (chance < 56) {
    return 'w_gloom';
  }
  if (chance < 78) {
    return 'w_thunderstorms';
  }
  return 'w_snow';
},

eurekaPagos: (chance) => {
  if (chance < 10) {
    return 'w_fairSkies';
  }
  if (chance < 28) {
    return 'w_fog';
  }
  if (chance < 46) {
    return 'w_heatWaves';
  }
  if (chance < 64) {
    return 'w_snow';
  }
  if (chance < 82) {
    return 'w_thunder';
  }
  return 'w_blizzards';
},

eurekaPyros: (chance) => {
  if (chance < 10) {
    return 'w_fairSkies';
  }
  if (chance < 28) {
    return 'w_heatWaves';
  }
  if (chance < 46) {
    return 'w_thunder';
  }
  if (chance < 64) {
    return 'w_blizzards';
  }
  if (chance < 82) {
    return 'w_umbralWind';
  }
  return 'w_snow';
},

gridania: (chance) => {
  if (chance < 5) {
    return 'w_rain';
  }
  if (chance < 20) {
    return 'w_rain';
  }
  if (chance < 30) {
    return 'w_fog';
  }
  if (chance < 40) {
    return 'w_clouds';
  }
  if (chance < 55) {
    return 'w_fairSkies';
  }
  if (chance < 85) {
    return 'w_clearSkies';
  }
  return 'w_fairSkies';
},

idyllshire: (chance) => {
  if (chance < 10) {
    return 'w_clouds';
  }
  if (chance < 20) {
    return 'w_fog';
  }
  if (chance < 30) {
    return 'w_rain';
  }
  if (chance < 40) {
    return 'w_showers';
  }
	if (chance < 70) {
		return 'w_clearSkies';
	}
	return 'w_fairSkies';
},

ilMheg: (chance) => {
	if (chance < 10) {
		return 'w_rain';
	}
	if (chance < 20) {
		return 'w_fog';
	}
	if (chance < 35) {
		return 'w_clouds';
	}
	if (chance < 45) {
		return 'w_thunderstorms';
	}
	if (chance < 60) {
		return 'w_clearSkies';
	}
	return 'w_fairSkies';
},

ishgard: (chance) => {
	if (chance < 60) {
		return 'w_snow';
	}
	if (chance < 70) {
		return 'w_fairSkies';
	}
	if (chance < 75) {
		return 'w_clearSkies';
	}
	if (chance < 90) {
		return 'w_clouds';
	}
	return 'w_fog';
},

kholusia: (chance) => {
	if (chance < 10) {
		return 'w_gales';
	}
	if (chance < 20) {
		return 'w_rain';
	}
	if (chance < 30) {
		return 'w_fog';
	}
	if (chance < 45) {
		return 'w_clouds';
	}
	if (chance < 85) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},

kugane: (chance) => {
	if (chance < 10) {
		return 'w_rain';
	}
	if (chance < 20) {
		return 'w_fog';
	}
	if (chance < 40) {
		return 'w_clouds';
	}
	if (chance < 80) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},

lakeland: (chance) => {
	if (chance < 20) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 75) {
		return 'w_clouds';
	}
	if (chance < 85) {
		return 'w_fog';
	}
	if (chance < 95) {
		return 'w_rain';
	}
	return 'w_thunderstorms';
},

limsaLominsa: (chance) => {
	if (chance < 20) {
		return 'w_clouds';
	}
	if (chance < 50) {
		return 'w_clearSkies';
	}
	if (chance < 80) {
		return 'w_fairSkies';
	}
	if (chance < 90) {
		return 'w_fog';
	}
	return 'w_rain';
},

lowerLaNoscea: (chance) => {
	if (chance < 20) {
		return 'w_clouds';
	}
	if (chance < 50) {
		return 'w_clearSkies';
	}
	if (chance < 70) {
		return 'w_fairSkies';
	}
	if (chance < 80) {
		return 'w_wind';
	}
	if (chance < 90) {
		return 'w_fog';
	}
	return 'w_rain';
},

middleLaNoscea: (chance) => {
	if (chance < 20) {
		return 'w_clouds';
	}
	if (chance < 50) {
		return 'w_clearSkies';
	}
	if (chance < 70) {
		return 'w_fairSkies';
	}
	if (chance < 80) {
		return 'w_wind';
	}
	if (chance < 90) {
		return 'w_fog';
	}
	return 'w_rain';
},

mist: (chance) => {
	if (chance < 20) {
		return 'w_clouds';
	}
	if (chance < 50) {
		return 'w_clearSkies';
	}
	if (chance < 70) {
		return 'w_fairSkies';
	}
	if (chance < 80) {
		return 'w_fairSkies';
	}
	if (chance < 90) {
		return 'w_fog';
	}
	return 'w_rain';
},

morDhona: (chance) => {
	if (chance < 15) {
		return 'w_clouds';
	}
	if (chance < 30) {
		return 'w_fog';
	}
	if (chance < 60) {
		return 'w_gloom';
	}
	if (chance < 75) {
		return 'w_clearSkies';
	}
	return 'w_fairSkies';
},

northShroud: (chance) => {
	if (chance < 5) {
		return 'w_fog';
	}
	if (chance < 10) {
		return 'w_showers';
	}
	if (chance < 25) {
		return 'w_rain';
	}
	if (chance < 30) {
		return 'w_fog';
	}
	if (chance < 40) {
		return 'w_clouds';
	}
	if (chance < 70) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},

northernThanalan: (chance) => {
	if (chance < 5) {
		return 'w_clearSkies';
	}
	if (chance < 20) {
		return 'w_fairSkies';
	}
	if (chance < 50) {
		return 'w_clouds';
	}
	return 'w_fog';
},

outerLaNoscea: (chance) => {
	if (chance < 30) {
		return 'w_clearSkies';
	}
	if (chance < 50) {
		return 'w_fairSkies';
	}
	if (chance < 70) {
		return 'w_clouds';
	}
	if (chance < 85) {
		return 'w_fog';
	}
	return 'w_rain';
},

rhalgrsReach: (chance) => {
	if (chance < 15) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 80) {
		return 'w_clouds';
	}
	if (chance < 90) {
		return 'w_fog';
	}
	return 'w_thunder';
},

shirogane: (chance) => {
	if (chance < 10) {
		return 'w_rain';
	}
	if (chance < 20) {
		return 'w_fog';
	}
	if (chance < 40) {
		return 'w_clouds';
	}
	if (chance < 80) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},

southShroud: (chance) => {
	if (chance < 5) {
		return 'w_fog';
	}
	if (chance < 10) {
		return 'w_thunderstorms';
	}
	if (chance < 25) {
		return 'w_thunder';
	}
	if (chance < 30) {
		return 'w_fog';
	}
	if (chance < 40) {
		return 'w_clouds';
	}
	if (chance < 70) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},

southernThanalan: (chance) => {
	if (chance < 20) {
		return 'w_heatWaves';
	}
	if (chance < 60) {
		return 'w_clearSkies';
	}
	if (chance < 80) {
		return 'w_fairSkies';
	}
	if (chance < 90) {
		return 'w_clouds';
	}
	return 'w_fog';
},

theAzimSteppe: (chance) => {
	if (chance < 5) {
		return 'w_gales';
	}
	if (chance < 10) {
		return 'w_wind';
	}
	if (chance < 17) {
		return 'w_rain';
	}
	if (chance < 25) {
		return 'w_fog';
	}
	if (chance < 35) {
		return 'w_clouds';
	}
	if (chance < 75) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},

theChurningMists: (chance) => {
	if (chance < 10) {
		return 'w_clouds';
	}
	if (chance < 20) {
		return 'w_gales';
	}
	if (chance < 40) {
		return 'w_umbralStatic';
	}
	if (chance < 70) {
		return 'w_clearSkies';
	}
	return 'w_fairSkies';
},

theCrystarium: (chance) => {
	if (chance < 20) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 75) {
		return 'w_clouds';
	}
	if (chance < 85) {
		return 'w_fog';
	}
	if (chance < 95) {
		return 'w_rain';
	}
	return 'w_thunderstorms';
},

theDiadem: (chance) => {
	if (chance < 30) {
		return 'w_fairSkies';
	}
	if (chance < 60) {
		return 'w_fog';
	}
	if (chance < 90) {
		return 'w_wind';
	}
	return 'w_umbralWind';
},

theDravanianForelands: (chance) => {
	if (chance < 10) {
		return 'w_clouds';
	}
	if (chance < 20) {
		return 'w_fog';
	}
	if (chance < 30) {
		return 'w_thunder';
	}
	if (chance < 40) {
		return 'w_dustStorms';
	}
	if (chance < 70) {
		return 'w_clearSkies';
	}
	return 'w_fairSkies';
},

theDravanianHinterlands: (chance) => {
	if (chance < 10) {
		return 'w_clouds';
	}
	if (chance < 20) {
		return 'w_fog';
	}
	if (chance < 30) {
		return 'w_rain';
	}
	if (chance < 40) {
		return 'w_showers';
	}
	if (chance < 70) {
		return 'w_clearSkies';
	}
	return 'w_fairSkies';
},

theFringes: (chance) => {
	if (chance < 15) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 80) {
		return 'w_clouds';
	}
	if (chance < 90) {
		return 'w_fog';
	}
	return 'w_thunder';
},

theGoblet: (chance) => {
	if (chance < 40) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 85) {
		return 'w_clouds';
	}
	if (chance < 95) {
		return 'w_fog';
	}
	return 'w_rain';
},

theLavenderBeds: (chance) => {
	if (chance < 5) {
		return 'w_clouds';
	}
	if (chance < 20) {
		return 'w_rain';
	}
	if (chance < 30) {
		return 'w_fog';
	}
	if (chance < 40) {
		return 'w_clouds';
	}
	if (chance < 55) {
		return 'w_fairSkies';
	}
	if (chance < 85) {
		return 'w_clearSkies';
	}
	return 'w_fairSkies';
},

theLochs: (chance) => {
	if (chance < 20) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 80) {
		return 'w_clouds';
	}
	if (chance < 90) {
		return 'w_fog';
	}
	return 'w_thunderstorms';
},

thePeaks: (chance) => {
	if (chance < 10) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 75) {
		return 'w_clouds';
	}
	if (chance < 85) {
		return 'w_fog';
	}
	if (chance < 95) {
		return 'w_wind';
	}
	return 'w_dustStorms';
},

theRaktikaGreatwood: (chance) => {
	if (chance < 10) {
		return 'w_fog';
	}
	if (chance < 20) {
		return 'w_rain';
	}
	if (chance < 30) {
		return 'w_umbralWind';
	}
	if (chance < 45) {
		return 'w_clearSkies';
	}
	if (chance < 85) {
		return 'w_fairSkies';
	}
	return 'w_clouds';
},

theRubySea: (chance) => {
	if (chance < 10) {
		return 'w_thunder';
	}
	if (chance < 20) {
		return 'w_wind';
	}
	if (chance < 35) {
		return 'w_clouds';
	}
	if (chance < 75) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},

theSeaOfClouds: (chance) => {
	if (chance < 30) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 70) {
		return 'w_clouds';
	}
	if (chance < 80) {
		return 'w_fog';
	}
	if (chance < 90) {
		return 'w_wind';
	}
	return 'w_umbralWind';
},

theTempest: (chance) => {
	if (chance < 20) {
		return 'w_clouds';
	}
	if (chance < 80) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},

uldah: (chance) => {
	if (chance < 40) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 85) {
		return 'w_clouds';
	}
	if (chance < 95) {
		return 'w_fog';
	}
	return 'w_rain';
},

upperLaNoscea: (chance) => {
	if (chance < 30) {
		return 'w_clearSkies';
	}
	if (chance < 50) {
		return 'w_fairSkies';
	}
	if (chance < 70) {
		return 'w_clouds';
	}
	if (chance < 80) {
		return 'w_fog';
	}
	if (chance < 90) {
		return 'w_thunder';
	}
	return 'w_thunderstorms';
},

westernLaNoscea: (chance) => {
	if (chance < 10) {
		return 'w_fog';
	}
	if (chance < 40) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 80) {
		return 'w_clouds';
	}
	if (chance < 90) {
		return 'w_wind';
	}
	return 'w_gales';
},

westernThanalan: (chance) => {
	if (chance < 40) {
		return 'w_clearSkies';
	}
	if (chance < 60) {
		return 'w_fairSkies';
	}
	if (chance < 85) {
		return 'w_clouds';
	}
	if (chance < 95) {
		return 'w_fog';
	}
	return 'w_rain';
},

wolvesDenPier: (chance) => {
	if (chance < 20) {
		return 'w_clouds';
	}
	if (chance < 50) {
		return 'w_clearSkies';
	}
	if (chance < 80) {
		return 'w_fairSkies';
	}
	if (chance < 90) {
		return 'w_fog';
	}
	return 'w_thunderstorms';
},

yanxia: (chance) => {
	if (chance < 5) {
		return 'w_showers';
	}
	if (chance < 15) {
		return 'w_rain';
	}
	if (chance < 25) {
		return 'w_fog';
	}
	if (chance < 40) {
		return 'w_clouds';
	}
	if (chance < 80) {
		return 'w_fairSkies';
	}
	return 'w_clearSkies';
},
}
