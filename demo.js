let house = new House('Kharkiv');

let livingRoom = new Room('living room');
let bedroom = new Room('bedroom');
let kitchen = new Room('kitchen');


consoleShowYellow('HOUSE - addRoom(room)');
house.addRoom(livingRoom);
house.addRoom(kitchen);
house.addRoom(bedroom);


consoleShowYellow('HOUSE - removeRoom(room)');
house.removeRoom(bedroom);

let lamp = new Lamp('lamp');
let lamp2 = new Lamp('lamp_2');
let tv = new TV('TV');
let tv2 = new TV('TV_2');

consoleShowYellow('ROOM - addDevice(device)');
livingRoom.addDevice(tv);
livingRoom.addDevice(lamp);
kitchen.addDevice(lamp2);
kitchen.addDevice(tv2);

consoleShowYellow('ROOM - removeDevice(device)');
kitchen.removeDevice(tv2);

consoleShowYellow('HOUSE - static moveDeviceBetweenRooms(oldRoom(livingRoom), newRoom(kitchen), device(lamp))');
consoleShowYellow('Before');
consoleShowBlue(livingRoom.title);
livingRoom.getAllDevices().forEach(x => consoleShowBlue(`→${x.title}`));
consoleShowBlue(kitchen.title);
kitchen.getAllDevices().forEach(x => consoleShowBlue(`→${x.title}`));
consoleShowYellow('After');
House.moveDeviceBetweenRooms(livingRoom, kitchen, lamp);
consoleShowBlue(livingRoom.title);
livingRoom.getAllDevices().forEach(x => consoleShowBlue(`→${x.title}`));
consoleShowBlue(kitchen.title);
kitchen.getAllDevices().forEach(x => consoleShowBlue(`→${x.title}`));

consoleShowYellow('SMART DEVICE - powerSwitch() and getCurrentStatus()');
tv.powerSwitch();
consoleShowBlue(tv.getCurrentStatus());
lamp.powerSwitch();
consoleShowBlue(lamp.getCurrentStatus());
lamp.powerSwitch();
consoleShowBlue(lamp.getCurrentStatus());


consoleShowYellow('LAMP - set lightColor(hexColor)');
lamp.setLightColor('#1c2d3f');
consoleShowBlue(lamp.lightColor);
consoleShowYellow('LAMP - set brightness(hexNum)');
lamp.setBrightness('55');
consoleShowBlue(lamp.brightness);

consoleShowYellow('TV - setChannel(channel = 86)')
tv.setChannel(86);
consoleShowBlue(tv.currentChannel);
consoleShowYellow('TV - nextChannel()');
tv.nextChannel();
consoleShowBlue(tv.currentChannel);
consoleShowYellow('TV - previousChannel()');
tv.previousChannel();
consoleShowBlue(tv.currentChannel);
consoleShowYellow('TV - addToFavorites(channel = 44)');
tv.addToFavorites(44);
consoleShowBlue(tv.getFavorites());
consoleShowYellow('TV - addToFavorites(channel = 55)');
tv.addToFavorites(55);
consoleShowBlue(tv.getFavorites());
consoleShowYellow('TV - addToFavorites(channel = 66)');
tv.addToFavorites(66);
consoleShowBlue(tv.getFavorites());
consoleShowYellow('TV - browseFavorites(true)');
tv.browseFavorites();
consoleShowYellow('TV - nextChannel()');
tv.nextChannel();
consoleShowBlue(tv.currentChannel);
consoleShowYellow('TV - previousChannel()');
tv.previousChannel();
consoleShowBlue(tv.currentChannel);
consoleShowYellow('TV - removeFromFavorites(channel 44)');
tv.removeFromFavorites(44);
consoleShowBlue(tv.getFavorites());
tv.browseAllChannels();
