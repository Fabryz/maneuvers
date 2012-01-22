Maneuvers
======

Treasure hunt-like application started on [H-ack 21.1.12](http://www.facebook.com/h.ack.012)
The objective is to make Player A (that is using a mobile device) go to a certain location by following the orders given remotely from Player B, that can follow him in realtime using geolocation.

A numeric id is given to Player A using a mobile device, Player B can directly connect to Player A via that numeric id.
Player B can see a Google Map with the coordinates updated in realtime of the current position of Player A, and can send him orders on how and where to move.
Player A on his mobile interface can only see the orders (in a textual or graphical way) that have been sent to him.


This project is based on [Remote Commander](https://github.com/Fabryz/remote-commander) functionality.
Player A is the Remote, Player B is the Controller.
Also using [Geolocation API](http://dev.w3.org/geo/api/spec-source.html) and [Google Maps JavaScript API V3](http://code.google.com/intl/it-IT/apis/maps/documentation/javascript/).

Requirements
------------

* [Node.js](http://nodejs.org/)
* [Npm](http://npmjs.org/)

Modules:

* [Socket.io](http://socket.io/)
* [Express](http://expressjs.com/)
* [Jade](http://jade-lang.com/)

Installation
------------

1. Clone the repository with ``git clone git://github.com/Fabryz/maneuvers.git``
2. Install dependencies with ``npm install -d``
3. Start the server with ``node server.js``
4. Point Player A's browser to ``YOUR_SERVER_IP:8080`` and write down the numeric id
5. Point Player B's browser to ``YOUR_SERVER_IP:8080/rc/numeric_id``, choose a location and start giving out orders
6. Just... don't make him go too far

You can see a working online app over here: [maneuvers.nodejitsu.com](http://maneuvers.nodejitsu.com/)

Contributors
------------

* [Fabrizio Codello](https://github.com/Fabryz)

* [Renzo Pretto](https://github.com/rgpretto)

License
-------

Copyright (C) 2012 Fabrizio Codello, Renzo Pretto

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
