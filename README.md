## Requirements

- Python 2.7
- Node v16
- Android Studio or XCode

## Getting started

This repository contains both the back-end of the solution and the react-native application. The first step would be to start the Flask API:

### Flask API

The back-end server lays in `./flask-api`, change directory and run:
```
pip install -r requirements.txt
```

In order to start the back-end server run:
```
python app.py
```

### React-Native 

Make sure you are following the [Setting up the development environment](https://reactnative.dev/docs/environment-setup) of the React-Native in order to 
You will need node version >= 16 in order to install and run the mobile application. It lays in `./react-native-app`, change directory and run:

```
npm install
```

In order to run the application within a simulator you will need [Android Studio](https://developer.android.com/studio) or [XCode](https://developer.apple.com/xcode/). Run one of the following scripts in order to get the simulator started:
```
npm run ios
```
or 
```
npm run android
```
## Screenshots
Search Screen              |  Favorites Screen         |  Trending Screen
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://github.com/ENJATZ/stock-price-prediction/blob/main/screenshots/6.jpeg?raw=true" width="300"> | <img src="https://github.com/ENJATZ/stock-price-prediction/blob/main/screenshots/7.jpeg?raw=true" width="300"> | <img src="https://github.com/ENJATZ/stock-price-prediction/blob/main/screenshots/5.jpeg?raw=true" width="300">
NIO Analysis               |  AAPL Analysis            |  MSFT Analysis
<img src="https://github.com/ENJATZ/stock-price-prediction/blob/main/screenshots/1.jpeg?raw=true" width="300"> | <img src="https://github.com/ENJATZ/stock-price-prediction/blob/main/screenshots/2.jpeg?raw=true" width="300"> | <img src="https://github.com/ENJATZ/stock-price-prediction/blob/main/screenshots/3.jpeg?raw=true" width="300">

## License
MIT License

Copyright (c) 2022 Sebastian Deme

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
