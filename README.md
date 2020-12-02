## Install Arduino ESP32 Board Profile
* Enter https://dl.espressif.com/dl/package_esp32_index.json into the “Additional Board Manager URLs”
* Select M5Stick-C under Board Manager menu
  
## Install Arduino ESP32 Filesystem Uploader
* [Download](https://github.com/me-no-dev/arduino-esp32fs-plugin/releases/download/1.0/ESP32FS-1.0.zip) the ESP32 Filesystem Uploader
* Unzip into <Aurduino Folder>/tools (create folder if does not exist)

## Install ESP32 & M5Stick-C Libraries
* In the Skecth->Include Library menu, install ESP32 and M5StickC libraries

## Install ESPAsyncWebServer Library
* [Download](https://github.com/me-no-dev/ESPAsyncWebServer/archive/master.zip]) the ESPAsyncWebServer library. You should have a .zip folder in your Downloads folder
* Unzip the .zip folder and you should get ESPAsyncWebServer-master folder
* Rename your folder from ESPAsyncWebServer-master to ESPAsyncWebServer
* Move the ESPAsyncWebServer folder to your Arduino IDE installation libraries folder

## Install Async TCP Library for ESP32
* [Download](https://github.com/me-no-dev/AsyncTCP/archive/master.zip) the AsyncTCP library. You should have a .zip folder in your Downloads folder
* Unzip the .zip folder and you should get AsyncTCP-master folder
* Rename your folder from AsyncTCP-master to AsyncTCP
* Move the AsyncTCPfolder to your Arduino IDE installation libraries folder
* Finally, re-open your Arduino IDE

## Screenshot
![Three graphs showing gyro, accelerometoer and AHRS](/screenshot.png?raw=true "Screenshot")
