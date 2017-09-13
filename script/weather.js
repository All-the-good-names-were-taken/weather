
(function() {

  'use strict';

  function error() {
    console.log( 'Got error from data returned.');
  }

  function dataReceived(e) {

    const data = JSON.parse( this.response ) || {};

    let el = document.getElementById('current-time');

    if (el && data.dt) {
      // Date is in seconds, not milliseconds.
      const dateString = new Date( data.dt ).toLocaleTimeString();
      el.textContent = dateString;
    }

    el = document.getElementById('temperature-item');

    if (el && data.main) {
      if (data.main.temp) {
        el.getElementsByClassName('item-value')[0].textContent = data.main.temp + ' ' + '\u00B0C';
      }
    }

  }

  function getData() {
    const req = new XMLHttpRequest();

    req.addEventListener('load', dataReceived);
    req.addEventListener('error', function() {console.log('error from request');})

    req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?units=metric&id=2643743&APPID=f6347fd66d842b5f22cec8fb8851e4f8');

    req.setRequestHeader('Accept', 'application/json');
    req.send();
  }

  document.getElementById('go-button').addEventListener('click', getData);

})()