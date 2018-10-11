function House(address) {
    this._address = address;
		this.rooms = [];
}

House.prototype.addRoom = function(room){
	if(room instanceof Room) {
		if (this.rooms.find(function(rm){ return rm === room})) {
			console.warn(`The ${room.title} already exists in this house`);
		} else {
			this.rooms.push(room);
			console.info(`${room.title} successfully added`);
		}
	} else {
		console.error('Please provide a Room object');
	}
}


function Room(title) {
	this.title = title;
	this._devices = [];
}

Room.prototype.toString = function () { //TODO: ask Max
	return this.title;
}

Room.prototype.addDevice = function (device, _internalFlag) {//TODO: on ELSE => remove the device from the previous room before adding to the new one
	if (device instanceof SmartDevice) {
		if(this._devices.find(function(dev){return device === dev})) {
			console.warn(`The ${device.name} is already in this room`);
		} else {
			this._devices.push(device);
			if (!_internalFlag) device.setLocation(this, true);
		}
	} else {
		console.error('Please provide a smart device');	
	};
}

Room.prototype.showAllDevices = function() {
	this._devices.forEach(function(elem){
		console.info(elem.name);
	});
}


function SmartDevice(name) {
	this.name = name.toLowerCase();
	this._status = false;
	this._location = null;
}

SmartDevice.prototype.toString = function () { //TODO: ask Max
	return `${this.name} in the ${this._location}`;
}

SmartDevice.prototype.turnOnOff = function(command) { 
	if (this._status === command) {
		return (`The ${this.name} is currently turned ${command ? 'on' : 'off'}.`);
	}
	if (command) {
		this.status = true;
		return `Turning the ${this.name} ON.`;
	} else {
		this.status = false;
		return `Turning the ${this.name} OFF.`;
	}
}

SmartDevice.prototype.setLocation = function(room, _internalFlag) {
	if (room instanceof Room) {
		if (!_internalFlag) room.addDevice(this, true);
		this._location = room;
		console.info(`${this.name} now in the ${room.title}`);
	} else {
		console.error('Please provide a Room object');
	}
}

SmartDevice.prototype.getLocation = function() {
	if (this._location === null) {
		console.info(`The ${this.name} not in a room yet.`);
	} else {
		this._location.title;
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
	var lamp = document.querySelector("." + this.name);
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
var livingRoom = new Room('living room');
var kitchen = new Room('kitchen');
house.addRoom(livingRoom);
house.addRoom(kitchen);

var lamp = new Lamp('Golden Dragon');
var lamp2 = new Lamp('IKEA');
var tv = new Tv('Sony');
var tv2 = new Tv('Samsung');

livingRoom.addDevice(tv);
livingRoom.addDevice(lamp);
lamp2.setLocation(kitchen);
tv2.setLocation(kitchen);

