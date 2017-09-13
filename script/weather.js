( function() {

  'use strict';

  function compassDirectionFromBearing( bearing ) {
    // Algorithm is to ensure the incoming angle is between 0 and
    // 360 deg, and shift by half an interval to make the binning
    // easier.  We can then do this without comparison operators.

    const increment = 360 / 16;
    bearing += ( increment / 2 );
    while ( bearing < 0 ) {
      bearing += 360;
    }

    const directions = [ 'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S',
      'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];

    return directions[ Math.floor( bearing / increment ) ];
  }

  function error() {
    console.log( 'Got error from data returned.' );
  }

  function dataReceived( e ) {

    const data = JSON.parse( this.response ) || {};

    {
      const el = document.getElementById( 'current-time' );

      if ( el && data.dt ) {
        // Date is in seconds, not milliseconds.
        const dateString = new Date( data.dt )
          .toLocaleTimeString();
        el.textContent = dateString;
      }
    }

    if ( data.weather.length ) {
      // Capitalise description - not very localisable.
      let description = data.weather[ 0 ].description;
      description = description.charAt( 0 )
        .toUpperCase() + description.slice( 1 );

      document.getElementById( 'summary' )
        .textContent = description;
    }

    // TODO:  Perform this algorithmically to prevent repetition.
    // ASSUMPTION:  All units are metric.
    // TODO:  Paramaterise units to metric versus imperial.
    // TODO:  Visibility - not all aspects are sent - e.g. if there's no snow
    // then no snow data is sent.  Don't show items for which there is no data.
    // TODO:  Could insert elements into table programmatically - decouples
    // expectations of the script on the markup content, but in early stages
    // of prototyping makes structure of document less obvious and arguably
    // more difficult to alter quickly.
    if ( data.main ) {
      if ( 'temp' in data.main ) {
        const el = document.getElementById( 'temperature-item' );
        el.getElementsByClassName( 'item-value' )[ 0 ].textContent = data.main.temp + ' \u00B0C';
      }
      if ( 'humidity' in data.main ) {
        const el = document.getElementById( 'humidity-item' );
        el.getElementsByClassName( 'item-value' )[ 0 ].textContent = data.main.humidity + ' %';
      }
      if ( 'pressure' in data.main ) {
        const el = document.getElementById( 'pressure-item' );
        el.getElementsByClassName( 'item-value' )[ 0 ].textContent = data.main.pressure + ' hPa';
      }
    }

    if ( data.clouds ) {
      if ( 'all' in data.clouds ) {
        const el = document.getElementById( 'cloud-item' );
        el.getElementsByClassName( 'item-value' )[ 0 ].textContent = data.clouds.all + ' %';
      }
    }

    if ( 'visibility' in data ) {
      const el = document.getElementById( 'visibility-item' );
      el.getElementsByClassName( 'item-value' )[ 0 ].textContent = data.visibility + " m";
    }

    if ( 'wind' in data ) {
      const el = document.getElementById( 'wind-item' );
      const value = data.wind.speed + ' m/s, ' + compassDirectionFromBearing( data.wind.deg );
      el.getElementsByClassName( 'item-value' )[ 0 ].textContent = value;
    }

  }

  function getData() {
    const req = new XMLHttpRequest();

    req.addEventListener( 'load', dataReceived );
    req.addEventListener( 'error', function() {
      console.log( 'error from request' );
    } )

    req.open( 'GET', 'http://api.openweathermap.org/data/2.5/weather?units=metric&id=2643743&APPID=f6347fd66d842b5f22cec8fb8851e4f8' );

    req.setRequestHeader( 'Accept', 'application/json' );
    req.send();
  }

  document.getElementById( 'go-button' )
    .addEventListener( 'click', getData );

  getData();

} )()