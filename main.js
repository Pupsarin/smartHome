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
      }
    } else {
      throw 'Please provide a Room object!';
    }
  }

  removeRoom(room) {
    if(room instanceof Room) {
      if (this._rooms.find(rm => rm === room))  {
        this._rooms.splice(this._rooms.indexOf(room), 1);
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
    this._title = title;
    this._devices = [];
  }

  get title() {
    return this._title;
  }

  set title(roomName) {
    this._title = roomName;
  }

  addDevice(device) {
    if (device instanceof SmartDevice) {
      if (device.checkIfInstalled()) {
        throw `The ${device.title} is placed in another room!`;
      } else if (this._devices.find(dev => device === dev)) {
          throw `The ${device.title} is already in this room!`;
      } else {
        this._devices.push(device);
        device.installInTheRoom();
      }
    } else {
      throw 'Please provide a smart device!';  
    };
  }

  removeDevice(device) {
    if (device instanceof SmartDevice) {
      if(this._devices.find(dev => device === dev)) {
        this._devices.splice(this._devices.indexOf(device), 1);
        device.removeFromTheRoom();
      } else {
        throw `There is no ${device.title} in this room!`
      }
    } else {
      throw 'Please provide a smart device!';
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
    this._title = title;
    this._status = false;
    this._placed = false;
  }

  get title() {
    return this._title;
  }

  set title(deviceName) {
    this._title = deviceName;
  }

  getCurrentStatus() {
    return `The ${this.title} is currently turned ${this._status ? 'on' : 'off'}.`;
  }

  checkIfInstalled() {
    return this._placed;
  }

  installInTheRoom() {
    this._placed = true;
  }

  removeFromTheRoom(){
    this._placed = false;
  }

  powerSwitch() {
    if (this._status) {  
      this._status = false;
    } else {
      this._status = true;
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

  /**
   * @param {string} hexColor - hex color with alpha channel (e.g. #1c2c3fff).
   */
  setCurrentLight(hexColor) {
    const regex = new RegExp('^#[A-Fa-f0-9]{8}$');
    if (regex.test(hexColor)){
      if (hexColor.slice(0, 7) !== this.lightColor) {
        this.lightColor = hexColor.slice(0, 7);
      }
      if (hexColor.slice(-2) !== this.brightness) {
        this.brightness = hexColor.slice(-2);
      }
      this._currentLight = hexColor;
    } else {
      throw `${hexColor} is not a hex color!`;
    }
  }

  get lightColor() {
    return this._lightColor;
  }

  /**
   * @param {string} hexColor - hex color (e.g. #1c2c3f).
   */
  setLightColor(hexColor) {
    this._lightColor = hexColor;
    this.setCurrentLight(this._lightColor + this._brightness);
  }

  get brightness() {
    return this._brightness;
  }

  /**
   * @param {string} hexNum - hex number to define hex color alpha channel (e.g. 4f).
   */
  setBrightness(hexNum) {
    this._brightness = hexNum;
    this.setCurrentLight(this._lightColor + this._brightness);
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
   * @return {[number,boolean]} Array with a valid channel and boolean flag that defines the channel in favorites or not.
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
      this._currentChannel = this._channelsList[currentChannelIndex + 1];
    }
  }

  previousChannel() { 
    let currentChannelIndex = this._channelsList.indexOf(this._currentChannel);
    if (currentChannelIndex === 0) {
      this._currentChannel = this._channelsList[this._channelsList.length - 1];
    } else {
      this._currentChannel = this._channelsList[currentChannelIndex - 1];
    }
  }

  /**
   * @param {number} channel 
   */
  addToFavorites(channel) {
		try {
      let [ch, flag] = this._checkChannel(channel);
      if(flag) {
        throw `The channel ${ch} is already in your favorites!`;
      } else {
        this._favoriteChannels.push(ch);
      }
		} catch (error) {
			return error;
		}
  }

  /**
   * @param {number} channel 
   */
  removeFromFavorites(channel) {
		try {
      let [ch, flag] = this._checkChannel(channel);
      if(flag) {
        this._favoriteChannels.splice(this._favoriteChannels.indexOf(ch), 1);
      } else {
        throw `The channel ${ch} is not in your favorites!`;
      }
		} catch (error) {
			throw error;
		}
  }

  getFavorites() {
    if (this._favoriteChannels.length !== 0) {
      return this._favoriteChannels;
    } else {
      throw "You have no favorite channels!";
    }
  }
}

