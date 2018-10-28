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
		return this._address;
	}

	set address(newAddress) {
		this._address = newAddress;
	}

	get rooms() {
		return this._rooms;
	}	

	addRoom(room) {
		if(room instanceof Room) {
			if (this._rooms.find(rm => rm === room)) {
				throw `The ${room.title} is already exists in this house!`;
			} else {
				this._rooms.push(room);
				consoleShow(`The ${room.title} successfully added!`);
			}
		} else {
			throw 'Please provide a Room object!';
		}
	}

	removeRoom(room) {
		if(room instanceof Room) {
			if (this._rooms.find(rm => rm === room))  {
				this._rooms.splice(this._rooms.indexOf(room), 1);
				consoleShow(`The ${room.title} successfully removed!`)
			} else {
				throw `There is no ${room.title} in this house!`;
			}
		} else {
			throw 'Please provide a Room object!';
		}
	}

	static moveDeviceBetweenRooms(oldRoom, newRoom, device) {
		if (newRoom instanceof Room && oldRoom instanceof Room) {
			oldRoom.removeDevice(device);
			newRoom.addDevice(device);
		} else {
			throw 'oldRoom and newRoom must be an instances of Room class!';	
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
				throw `The ${device.title} is placed in another room!`;
			}	else if (this._devices.find(dev => device === dev)) {
				console.warn(`The ${device.title} is already in this room!`);
			} else {
				this._devices.push(device);
				device.isPlaced = true;
				consoleShow(`${device.title} successfully added to the ${this.title}`);
			}
		} else {
			throw 'Please provide a smart device!';	
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

	getAllDevices() {
		return this._devices;
	}
}

/**
 * Class representing a smart device.
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
		return `The ${this.title} is currently turned ${this._status ? 'on' : 'off'}.`;
	}

	get isPlaced() {
		return this._isPlaced;
	}

	set isPlaced(flag) {
		this._isPlaced = flag;
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
		return this._currentLight;
	}

	set currentLight(color) {
		let regex = new RegExp('^#([A-Fa-f0-9]{8}|^#[A-Fa-f0-9]{3})$');
		if (regex.test(color)){
			this._currentLight = color;
		} else {
			throw `${color} is not a hex color!`;
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
	 * Checks if channel is in a range of available channels.
	 * @param {number} channel
	 * @return	{(number,boolean|Array} The number is a valid channel, boolean - if the channel in favorites or not.
	 */

	_checkChannel(channel) {
		let ch, flag;
		(channel) ? ch = channel : ch = this._currentChannel;
		if (!(typeof ch === 'number')){
			throw 'Provided value is not a number!';
		} else if (this._channelsList.indexOf(ch) > -1) {
			(this._favoriteChannels.indexOf(ch) > -1) ? flag = true : flag = false;
			return [ch, flag];
		} else { 
			throw 'Channel is not exist!';
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
			console.warn(`The channel ${this._currentChannel} is already in your favorites!`);
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

	getFavorites() {
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

