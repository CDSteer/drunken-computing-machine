/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://data.bbc.co.uk/locservices-locator/locations?apikey=YB0MY3VMHyllzPqEf5alVj5bUvGpvDVi&vv=2&format=json&order=importance&filter=domestic&longitude=-3.178199&latitude=51.485499&rows=1", false);
        xhr.send();

        var obj = JSON.parse(xhr.responseText);

        document.getElementById("location").innerHTML = obj.response.content.locations.locations[0].name;
        document.getElementById("city").innerHTML = obj.response.content.locations.locations[0].container;

        //var xhr = new XMLHttpRequest();
        
        var keywords = 'London'; //obj.response.content.locations.locations[0].name; //'London';
        
        /*if (typeof keywords === undefined) {
            keywords = obj.response.content.locations.locations[0].container;
        };*/

        var product = 'NewsWeb';
        var content_format = 'TextualFormat';
        var recent_first = 'yes';

        var url = "http://data.bbc.co.uk/bbcrd-juicer/articles.json?text=" + keywords + "&product[]=" + product + "&content_format[]=" + content_format + "&recent_first=" + recent_first + "&apikey=YB0MY3VMHyllzPqEf5alVj5bUvGpvDVi";

        xhr.open("GET", url, false);
        xhr.send();

        var obj2 = JSON.parse(xhr.responseText);

        xhr.open("GET", "http://data.bbc.co.uk/bbcrd-juicer/articles/" + obj2.articles[1].cps_id + ".json?apikey=YB0MY3VMHyllzPqEf5alVj5bUvGpvDVi", false);
        xhr.send();
        var obj3 = JSON.parse(xhr.responseText);
        document.getElementById("title").innerHTML = obj3.article.title;
        document.getElementById("body").innerHTML = obj3.article.body;

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

app.initialize();