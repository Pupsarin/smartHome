'use strict';

class House {
	constructor(address) {
		this._address = address;
		this.rooms = [];
	}

	get address() {
		show(this._address);
	}

	set address(newAddress) {
		this._address = newAddress;
	}

	addRoom(room) {
		if(room instanceof Room) {
			if (this.rooms.find(rm => rm === room)) {
				console.warn(`The ${room.title} already exists in this house!`);
			} else {
				this.rooms.push(room);
				show(`The ${room.title} successfully added!`);
			}
		} else {
			console.error('Please provide a Room object!');
		}
	}

	removeRoom(room) {
		if(room instanceof Room) {
			if (this.rooms.find(rm => rm === room))  {
				this.rooms.splice(this.rooms.indexOf(room), 1);
				show(`The ${room.title} successfully removed!`)
			} else {
				console.warn(`There is no ${room.title} in this house!`);
			}
		} else {
			console.error('Please provide a Room object!');
		}
	}

}

class Room {
	constructor(title) {
		this.title = title;
		this._devices = [];
	}

	addDevice(device) {
		if (device instanceof SmartDevice) {
			if(this._devices.find(dev => device === dev)) {
				console.warn(`The ${device.title} is already in this room!`);
			} else {
				this._devices.push(device);
				show(`${device.title} successfully added to the ${this.title}`);

			}
		} else {
			console.error('Please provide a smart device!');	
		};
	}

	removeDevice(device) {
		if (device instanceof SmartDevice) {
			if(this._devices.find(dev => device === dev)) {
				this._devices.splice(this._devices.indexOf(device), 1);
				show(`The ${device.title} successfully removed!`);
			} else {
				console.warn(`There is no ${device.title} in this room!`);
			}
		} else {
			console.error('Please provide a smart device!');	
		};
	}

	showAllDevices() {
		this._devices.forEach(function(elem){
			show(elem.title);
		});
	}
}

class SmartDevice {
	constructor(title){
		this.title = title;
		this._status = false;
	}

	get currentStatus() {
		show(`The ${this.title} is currently turned ${this._status ? 'on' : 'off'}.`);
	}

	powerSwitch() {
		if (this._status) {
			this._status = false;
			show(`Turning the ${this.title} OFF.`);
		} else {
			this._status = true;
			show(`Turning the ${this.title} ON.`);
		}
	}
} 

class Lamp extends SmartDevice {
	constructor(title) {
		super(title);
		this._lightColor = '#000000';
		this._brightness = 'ff';
		this.currentLight = this._lightColor + this._brightness;
	}

	setLightColor(hexColor) {
		this._lightColor = hexColor;
		this._changeLight(this._lightColor, this._brightness);
	}

	setBrightness(hexNum) {
		this._brightness = hexNum;
		this._changeLight(this._lightColor, this._brightness);
	}

	_changeLight(color, brightness) {
		this.currentColor = color + brightness;
	}
}

class Tv extends SmartDevice{
	constructor(title) {
		super(title);
		this._channelsList = [...Array(100).keys()];
		this.currentChannel = this._channelsList[0];
		this._isFavorites = false;
		this.favoriteChannels = [];
	}

	_checkChannel(channel) {
		let ch, flag;
		(channel) ? ch = channel : ch = this.currentChannel;
		(this.favoriteChannels.indexOf(ch) > -1) ? flag = true : flag = false;
		return [ch, flag];
	}

	nextChannel() {
		let currentChannelIndex = this._channelsList.indexOf(this.currentChannel);
		if (this._channelsList.length - 1 === currentChannelIndex) {
			this.currentChannel = this._channelsList[0];
		} else {
			this.currentChannel = this._channelsList[currentChannelIndex + 1]
		}
		show(this.currentChannel);
	}

	previousChannel() { 
		(this._isFavorites)
		let currentChannelIndex = this._channelsList.indexOf(this.currentChannel);
		if (currentChannelIndex === 0) {
			this.currentChannel = this._channelsList[this._channelsList.length - 1];
		} else {
			this.currentChannel = this._channelsList[currentChannelIndex - 1]
		}
		show(this.currentChannel);
	}

	jumpToChannel(channelNumber) {
		if (typeof channelNumber === 'number' && !isNaN(channelNumber) && this._channelsList.indexOf(channelNumber) > -1) {
			this.currentChannel = channelNumber;
			show('Success!');
		} else { 
			console.error('Wrong argument');
		}
	}
	
	addToFavorites(channel) {
		let [ch, flag] = this._checkChannel(channel);
		if(flag) {
			console.warn(`The channel ${this.currentChannel} already in your favorites!`);
		} else {
			this.favoriteChannels.push(ch);
			show('Saved!');
		}
	}

	removeFromFavorites(channel) {
		let [ch, flag] = this._checkChannel(channel);
		if(flag) {
			this.favoriteChannels.splice(this.favoriteChannels.indexOf(ch), 1);
			show(`The channel ${ch} - has been removed from favorites!`);
		} else {
			console.warn(`The channel ${ch} is not in your favorites!`);
		}
	}

	showFavorites() {
		if (this.favoriteChannels.length !== 0) {
			this.favoriteChannels.forEach(function(elem){
				show(elem);
			});
		} else {
			console.warn("You have no favorite channel!");
		}
	}

	switchCurrentFavorites() {
		this._isFavorites ? this._isFavorites = false : this._isFavorites = true;
		show(`Switched to ${this._isFavorites ? 'Favorites' : 'Main List'}.`);
	}
}

let house = new House('Kharkiv');
let livingRoom = new Room('living room');
let kitchen = new Room('kitchen');
house.addRoom(livingRoom);
house.addRoom(kitchen);
let lamp = new Lamp('lamp');
let lamp2 = new Lamp('lamp_2');
let tv = new Tv('TV');
livingRoom.addDevice(tv);
livingRoom.addDevice(lamp);
kitchen.addDevice(lamp2);
tv.addToFavorites();