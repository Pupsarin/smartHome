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

consoleShowYellow('HOUSE - static moveDeviceBetweenRooms(oldRoom, newRoom, device)')
House.moveDeviceBetweenRooms(livingRoom, kitchen, lamp);

consoleShowYellow('SMART DEVICE - powerSwitch()');
tv.powerSwitch();
lamp.powerSwitch();

consoleShowYellow('SMART DEVICE - get currentStatus()');
consoleShowBlue(lamp2.currentStatus);
consoleShowBlue(lamp.currentStatus);

consoleShowYellow('LAMP - set lightColor(hexColor)');
consoleShowBlue(lamp.lightColor = '#1c2d3f');
consoleShowYellow('LAMP - set brightness(hexNum)');
consoleShowBlue(lamp.brightness = '55');

consoleShowYellow('TV - currentChannel(channel = 86)')
tv.currentChannel = 86;
consoleShowYellow('TV - nextChannel()');
tv.nextChannel();
consoleShowYellow('TV - previousChannel()');
tv.previousChannel();
consoleShowYellow('TV - addToFavorites(channel = 44)');
tv.addToFavorites(44);
consoleShowYellow('TV - removeFromFavorites(channel)');
tv.removeFromFavorites(44);