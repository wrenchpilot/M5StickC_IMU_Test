#include <M5StickC.h>
#include <WiFi.h>
#include <SPIFFS.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include "../include/wifi_config.h"

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

float accX = 0.0F;
float accY = 0.0F;
float accZ = 0.0F;

float gyroX = 0.0F;
float gyroY = 0.0F;
float gyroZ = 0.0F;

float pitch = 0.0F;
float roll = 0.0F;
float yaw = 0.0F;

String readIMU()
{
  //Test Reading the IMU
  M5.IMU.getGyroData(&gyroX, &gyroY, &gyroZ);
  M5.IMU.getAccelData(&accX, &accY, &accZ);
  M5.IMU.getAhrsData(&pitch, &roll, &yaw);

  String json;

  //Create JSON document
  DynamicJsonDocument doc(300);

  doc["sensor"] = "imu";

  JsonArray gyro = doc.createNestedArray("gyro");
  gyro.add(String(gyroX));
  gyro.add(String(gyroY));
  gyro.add(String(gyroZ));

  JsonArray accel = doc.createNestedArray("accel");
  accel.add(String(accX));
  accel.add(String(accY));
  accel.add(String(accZ));

  JsonArray ahrs = doc.createNestedArray("ahrs");
  ahrs.add(String(pitch));
  ahrs.add(String(roll));
  ahrs.add(String(yaw));

  serializeJson(doc, json);

  return json;
}

void setup()
{
  M5.begin();
  M5.Lcd.setRotation(3);
  M5.IMU.Init();

  // Initialize SPIFFS
  if (!SPIFFS.begin())
  {
    M5.Lcd.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    M5.Lcd.println("Connecting to WiFi..");
  }

  // Print ESP32 Local IP Address
  M5.Lcd.println(WiFi.localIP());

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(SPIFFS, "/index.html");
  });

  server.on("/highcharts.js", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(SPIFFS, "/highcharts.js", "text/javascript");
  });

  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(SPIFFS, "/style.css", "text/css");
  });

  server.on("/imu", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", readIMU().c_str());
  });

  // Start server
  server.begin();
}

void loop() {}
