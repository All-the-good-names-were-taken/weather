
  function dataReceived() {
    console.log( 'got data');
  }

  function getData() {
    console.log('got click');
    const req = new XMLHttpRequest();

    // This is needed for the sample data endpoint, but not (apparently)
    // for the live data.
    req.withCredentials = true;

    req.addEventListener('load', dataReceived);

    // My API ID is http://api.openweathermap.org/data/2.5/forecast?id=2643743&APPID=f6347fd66d842b5f22cec8fb8851e4f8
    // Don't use for testing - ten minute throttle and lock-out up to 24h.
    // Sample data is http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1
    req.open('GET', 'http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1', true);

    req.send();
  }

  document.getElementById('go-button').addEventListener('click', getData);
