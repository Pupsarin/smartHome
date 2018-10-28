'use strict';

/**
 * Class representing a house.
 */

class House {
	/**
	 * @param {string} address
	 */
	constructor(address) {
		this._address = address;
		this._rooms = [];
	}

	get address() {
		consoleShow(this._address);
	}

	set address(newAddress) {
		this._address = newAddress;
	}

	get rooms() {
		this._rooms.forEach(function(elem){
			consoleShow(elem.title);
		});
	}	

	addRoom(room) {
		if(room instanceof Room) {
			if (this._rooms.find(rm => rm === room)) {
				return new Error(`The ${room.title} already exists in this house!`);
			} else {
				this._rooms.push(room);
				consoleShow(`The ${room.title} successfully added!`);
			}
		} else {
			return new Error(('Please provide a Room object!'));
		}
	}

	removeRoom(room) {
		if(room instanceof Room) {
			if (this._rooms.find(rm => rm === room))  {
				this._rooms.splice(this._rooms.indexOf(room), 1);
				consoleShow(`The ${room.title} successfully removed!`)
			} else {
				return new Error(`There is no ${room.title} in this house!`);
			}
		} else {
			return new Error('Please provide a Room object!');
		}
	}
}

/**
 * Class representing a room of house.
 */

class Room {
	/**
	 * @param {string} title 
	 */
	constructor(title) {
		this.title = title;
		this._devices = [];
	}

	addDevice(device) {
		if (device instanceof SmartDevice) {
			if (device.isPlaced) {
				return new Error (`The ${device.title} is placed in another room!`);
			}	else if (this._devices.find(dev => device === dev)) {
				console.warn(`The ${device.title} is already in this room!`);
			} else {
				this._devices.push(device);
				device.isPlaced = true;
				consoleShow(`${device.title} successfully added to the ${this.title}`);
			}
		} else {
			console.error('Please provide a smart device!');	
		};
	}

	removeDevice(device) {
		if (device instanceof SmartDevice) {
			if(this._devices.find(dev => device === dev)) {
				this._devices.splice(this._devices.indexOf(device), 1);
				device.isPlaced = false;
				consoleShow(`The ${device.title} successfully removed!`);
			} else {
				console.warn(`There is no ${device.title} in this room!`);
			}
		} else {
			console.error('Please provide a smart device!');	
		};
	}

	moveDeviceToDifferentRoom(device, newRoom) {
		if (newRoom instanceof Room) {
			this.removeDevice(device);
			newRoom.addDevice(device);
		} else {
			return new Error('newRoom must be an instance of Room class!');	
		}
	}

	showAllDevices() {
		this._devices.forEach(function(elem){
			consoleShow(elem.title);
		});
	}
}

/**
 * Abstract class representing a smart device.
 */

class SmartDevice {
	/**
	 * @param {string} title 
	 */
	constructor(title){
		this.title = title;
		this._status = false;
		this._isPlaced = false;
	}

	get currentStatus() {
		consoleShow(`The ${this.title} is currently turned ${this._status ? 'on' : 'off'}.`);
	}

	get isPlaced() {
		return this._isPlaced;
	}

	set isPlaced(bool) {
		if(typeof bool === 'boolean') {
			this._isPlaced = bool;
		} else {
			console.error('Must be boolean value!');
			return new Error('Must be boolean value!');
		}
	}

	powerSwitch() {
		if (this._status) {	
			this._status = false;
			consoleShow(`Turning the ${this.title} OFF.`);
		} else {
			this._status = true;
			consoleShow(`Turning the ${this.title} ON.`);
		}
	}
} 

/**
 * Class representing a lamp.
 * @extends SmartDevice
 */

class Lamp extends SmartDevice {
	constructor(title) {
		super(title);
		this._lightColor = '#000000';
		this._brightness = 'ff';
		this._currentLight = this._lightColor + this._brightness;
	}

	get currentLight() {
		consoleShow(this._currentLight);
	}

	set currentLight(color) {
		let regex = new RegExp('^#([A-Fa-f0-9]{8}|^#[A-Fa-f0-9]{3})$');
		if (regex.test(color)){
			this._currentLight = color;
		} else {
			console.error(`${color} is not a hex color!`);
			// return new Error(`${color} is not a hex color!`);
		}
	}
	set lightColor(hexColor) {
		this._lightColor = hexColor;
		this.currentLight = this._lightColor + this._brightness;
	}

	set brightness(hexNum) {
		this._brightness = hexNum;
		this.currentLight = this._lightColor + this._brightness;
	}
}

/**
 * Class representing a TV.
 * @extends SmartDevice
 */

class TV extends SmartDevice{
	constructor(title) {
		super(title);
		this._channelsList = [...Array(100).keys()];
		this._currentChannel = this._channelsList[0];
		this._favoriteChannels = [];
	}

	get currentChannel() {
		return this._currentChannel;
	}

	set currentChannel(channelNumber) {
			this._currentChannel = this._checkChannel(channelNumber)[0];
	}

	/**
	 * Checks if channel is in a range of available tv's chanells.
	 * @param {number} channel
	 * @return	{(number,boolean|Array} The number is a valid channel, boolean - if the channel in favorites or not.
	 */

	_checkChannel(channel) {
		let ch, flag;
		(channel) ? ch = channel : ch = this._currentChannel;
		if (typeof ch === 'number' && !isNaN(ch) && this._channelsList.indexOf(ch) > -1) {
			(this._favoriteChannels.indexOf(ch) > -1) ? flag = true : flag = false;
			return [ch, flag];
		} else { 
			console.error('Wrong argument');
		}
	}

	nextChannel() {
		let currentChannelIndex = this._channelsList.indexOf(this._currentChannel);
		if (this._channelsList.length - 1 === currentChannelIndex) {
			this._currentChannel = this._channelsList[0];
		} else {
			this._currentChannel = this._channelsList[currentChannelIndex + 1]
		}
		consoleShow(this._currentChannel);
	}

	previousChannel() { 
		let currentChannelIndex = this._channelsList.indexOf(this._currentChannel);
		if (currentChannelIndex === 0) {
			this._currentChannel = this._channelsList[this._channelsList.length - 1];
		} else {
			this._currentChannel = this._channelsList[currentChannelIndex - 1]
		}
		consoleShow(this._currentChannel);
	}

	addToFavorites(channel) {
		let [ch, flag] = this._checkChannel(channel);
		if(flag) {
			console.warn(`The channel ${this._currentChannel} already in your favorites!`);
		} else {
			this._favoriteChannels.push(ch);
			consoleShow('Saved!');
		}
	}

	removeFromFavorites(channel) {
		let [ch, flag] = this._checkChannel(channel);
		if(flag) {
			this._favoriteChannels.splice(this._favoriteChannels.indexOf(ch), 1);
			consoleShow(`The channel ${ch} - has been removed from favorites!`);
		} else {
			console.warn(`The channel ${ch} is not in your favorites!`);
		}
	}

	showFavorites() {
		if (this._favoriteChannels.length !== 0) {
			this._favoriteChannels.forEach(function(elem){
				consoleShow(elem);
			});
		} else {
			console.warn("You have no favorite channels!");
		}
	}
}

/**
 * Class representing an air conditioner.
 * @extends SmartDevice
 */

class AC extends SmartDevice {
	constructor(title) {
		super(title);
		
	}
}


/**
 * /////////////////////////////////////////////////////////////////////////////
 */


let house = new House('Kharkiv');
let livingRoom = new Room('living room');
let kitchen = new Room('kitchen');
house.addRoom(livingRoom);
house.addRoom(kitchen);
let lamp = new Lamp('lamp');
let lamp3 = new Lamp('lamp');
let lamp2 = new Lamp('lamp_2');
let tv = new TV('TV');
livingRoom.addDevice(tv);
livingRoom.addDevice(lamp);
kitchen.addDevice(lamp2);
tv.addToFavorites();