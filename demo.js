let house = new House('Kharkiv');

let livingRoom = new Room('living room');
let kitchen = new Room('kitchen');

let lamp = new Lamp('lamp');
let lamp2 = new Lamp('lamp_2');
let tv = new TV('TV');
let tv2 = new TV('TV_2');

house.addRoom(livingRoom);
house.addRoom(kitchen);
consoleShow(house.rooms);

livingRoom.addDevice(tv);
livingRoom.addDevice(lamp);
kitchen.addDevice(lamp2);
kitchen.addDevice(tv2);

console.warn('---Moving device from one room to another---');
House.moveDeviceBetweenRooms(livingRoom, kitchen, lamp);
console.warn('--------------------------------------------');
consoleShow(lamp.currentStatus);

tv.addToFavorites();


try {
	kitchen.addDevice(livingRoom)
} catch (error) {
	console.error(error)
}