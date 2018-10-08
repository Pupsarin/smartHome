function House(address) {
    this._address = address;
    this._deviceLocation = {};
}

House.prototype.setDeviceLocation = function (device, roomName){
	if (this._deviceLocation[roomName] === undefined) {
		this._deviceLocation[roomName] = [device];
	} else {
		this._deviceLocation[roomName].push(device);
	}
}

House.prototype.getDeviceLocation = function (device) {
	for (x in house._deviceLocation) {
		for (y of house._deviceLocation[x]) {
			if (y === device) {
				return x;
			}
		}
	}
}


function SmartDevice(name) {
	this._name = name.toLowerCase();
	this._status = false;
}

SmartDevice.prototype = Object.create(House.prototype);
SmartDevice.prototype.constructor = House;

SmartDevice.prototype.turnOnOff = function(command) { 
	if (this._status === command) {
		return (`The ${this._name} is currently turned ${command ? 'on' : 'off'}.`);
	}
	if (command) {
		this.status = true;
		return `Turning the ${this._name} ON.`;
	} else {
		this.status = false;
		return `Turning the ${this._name} OFF.`;
	}
}

function Lamp (name) {
	SmartDevice.call(this, name);
	this._lightColor = '#000000';
	this._brightness = 'ff';
}

Lamp.prototype = Object.create(SmartDevice.prototype);
Lamp.prototype.constructor = SmartDevice;

Lamp.prototype.setLightColor = function (hexColor) {
	this._lightColor = hexColor;
	this._changeLight(this._lightColor, this._brightness);
}

Lamp.prototype.setBrightness = function (hexNum) {
	this._brightness = hexNum;
	this._changeLight(this._lightColor, this._brightness);
}

Lamp.prototype._changeLight = function (color, brightness) {
	var lamp = document.querySelector("." + this._name);
	lamp.style.backgroundColor = color + brightness;
}

function Tv (name) {
	SmartDevice.call(this, name);
	this.channelsList = [];
	this.favoriteChannels = [];
}

Tv.prototype = Object.create(SmartDevice.prototype);
Tv.prototype.constructor = SmartDevice;







var house = new House('Kharkiv');
var lamp = new Lamp('Lamp');
var lamp2 = new Lamp('Lamp');
var tv = new Tv('TV');
house.setDeviceLocation(lamp, 'living-room')
house.setDeviceLocation(lamp2, 'kitchen')
house.setDeviceLocation(tv, 'living-room')
