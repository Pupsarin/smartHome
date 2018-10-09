function House(address) {
    this._address = address;
    this._deviceLocation = {};
}

House.prototype.setDeviceLocation = function (device, roomName){
	if (this._deviceLocation[roomName] === undefined) { //TOFIX: 
		this._deviceLocation[roomName] = [device];
	} else {
		for (x in this._deviceLocation) {
			this._deviceLocation[x].forEach(function (element, indx, arr) {
				if (element === device) {
					console.log(arr);
					arr.splice(indx, 1);
				};
			});
		};
		this._deviceLocation[roomName].push(device);
	}
}

House.prototype.getDeviceLocation = function (device) {
	var _locatiaon = '';
	for (x in this._deviceLocation) {
		this._deviceLocation[x].forEach(function (element) {
			if (element === device) _locatiaon = x;
		});
	};
	return _locatiaon;
}


function SmartDevice(name) {
	this._name = name.toLowerCase();
	this._status = false;
}

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

SmartDevice.prototype.setDeviceLocation = function(houseObject, roomName) {
	if (houseObject === undefined) return "Looks like you have more important things to do. For example, buy or rent a house, would be a great idea!";
	if (roomName === undefined) return "Specify device location";
	if (houseObject instanceof House) {
		return houseObject.setDeviceLocation(this, roomName);
	} else {
		return "Inctance of House expected as first argument";
	}
}

SmartDevice.prototype.getDeviceLocation = function(houseObject) {

		return houseObject.getDeviceLocation(this);
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
house.setDeviceLocation(lamp, 'living_room')
house.setDeviceLocation(lamp2, 'kitchen')
house.setDeviceLocation(tv, 'living_room')
