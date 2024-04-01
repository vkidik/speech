const express = require('express');
const request = require('request');

const app = express();
const port = 80;

app.get('/synthesize', (req, res) => {
  const apiKey = 'YANDEX_CLOUD_SECRET_KEY_API';
  const text = req.query.text || 'Unfortunately there is no text';
  const lang = 'ru-RU';

  const url = `https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize?text=${encodeURIComponent(text)}&lang=${lang}&format=oggopus&sampleRateHertz=48000&speed=1.0`;

  const requestOptions = {
    uri: url,
    method: 'GET',
    headers: {
      'Authorization': `Api-Key ${apiKey}`,
    },
    encoding: null
  };

  request(requestOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.setHeader('Content-Type', 'audio/ogg');
      res.send(body);
    } else {
      console.error('Error:', error || body);
      res.status(500).send('There was an error in speech synthesis');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
