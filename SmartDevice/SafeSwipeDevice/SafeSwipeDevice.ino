#include <SPI.h> 
#include <RFID.h>
#include <Servo.h> 

// Max size for serial IO
const byte DATA_MAX_SIZE = 32;
char data[DATA_MAX_SIZE];

//D10:pin of tag reader SDA. D9:pin of tag reader RST 
RFID rfid(10, 9);       
unsigned char status; 
//MAX_LEN is 16: size of the array 
unsigned char str[MAX_LEN]; 

// lock ID
const String lockId = "6577683904411188fb0d5a3d"; 
//The number of serial numbers
int accessGrantedSize = 2;                                

//Servo for locking mechanism
Servo lockServo;                
//Locked position limit
int lockPos = 15;               
//Unlocked position limit
int unlockPos = 75;      
boolean locked = true;

int redLEDPin = 6;
int greenLEDPin = 5;

// string separator
String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

// recieve data from back formating
String receiveData() {
  static char endMarker = '\n'; 
  char receivedChar;     
  int ndx = 0;          
  memset(data, 32, sizeof(data)); 
  while(Serial.available() > 0) {    receivedChar = Serial.read();    if (receivedChar == endMarker) {
      data[ndx] = '\0'; 
      return;
    }
    data[ndx] = receivedChar;
    ndx++;
    if (ndx >= DATA_MAX_SIZE) {
      break;
    }
  } 
  String dataS="";
  for (int i = 0; i<32; i++){
    dataS+=data[i];
  }
  Serial.print("dr:a");
  Serial.println(data);
  memset(data, 32, sizeof(data));
  return dataS;
}

void setup() 
{ 
  Serial.begin(9600);     
  SPI.begin();            
  rfid.init();            
  //LED startup sequence
  pinMode(redLEDPin, OUTPUT);     
  pinMode(greenLEDPin, OUTPUT);
  digitalWrite(redLEDPin, HIGH);
  delay(200);
  digitalWrite(greenLEDPin, HIGH);
  delay(200);
  digitalWrite(redLEDPin, LOW);
  delay(200);
  digitalWrite(greenLEDPin, LOW);
  lockServo.attach(3);
  //Move servo into locked position
  lockServo.write(lockPos);         
} 

void loop() 
{ 
  // get keys
  Serial.println("gk:" + lockId);
  delay(300);
  String keyStr = receiveData();
  String keys[2] = {};
  if(keyStr != NULL){
    keys[0] = getValue(keyStr, ':', 1);
    if(keyStr.length() > 22){
      keys[1] = getValue(keyStr, ':', 2);
    }
  }
  delay(300);
  //Wait for a tag to be placed near the reader
  if (rfid.findCard(PICC_REQIDL, str) == MI_OK)   
  { 
    //Temporary variable to store the read RFID number
    String temp = "";                 
    //Anti-collision detection, read tag serial number            
    if (rfid.anticoll(str) == MI_OK)               
    { 
      //Record and display the tag serial number
      for (int i = 0; i < 4; i++)                 
      { 
        temp = temp + (0x0F & (str[i] >> 4)); 
        temp = temp + (0x0F & str[i]); 
      } 
      // get data, should we add/remove key or just open the lock
      Serial.println("gb:" + lockId);
      delay(300);
      String dataBool = receiveData();
      Serial.println("dr:" + dataBool);

//if we should add/remove key
      if(dataBool.indexOf("true") != -1 ){
        delay(300);
        // send data to back
        Serial.println("sk:"+temp);
        delay(300);
        Serial.println("sk:"+ lockId);
        delay(300);
      } else {
        // if we should open the lock
        delay(300);
        Serial.println("dr:b" + lockId);
        delay(300);
        boolean granted = false;
        //Runs through all tag ID numbers registered in the array
        for (int i=0; i <= (accessGrantedSize-1); i++)    
        {
          //If a tag is found then open/close the lock
          if(keys[i].indexOf(temp) != -1)            
          {
            granted = true;
            digitalWrite(greenLEDPin, HIGH);
            //If the lock is closed then open it
            if (locked == true)         
            {
                lockServo.write(unlockPos);
                locked = false;
                
                delay(5000);
                digitalWrite(greenLEDPin, LOW);
                lockServo.write(lockPos);
                locked = true;
            }
            //Red LED sequence
            digitalWrite(redLEDPin, HIGH);      
            delay(2000);
            digitalWrite(redLEDPin, LOW);
            delay(200);
          
          }
        }
        //If the tag is not found
        if (granted == false)     
        {
          //Serial.println ("Access Denied");
           //Red LED sequence
          digitalWrite(redLEDPin, HIGH);     
          delay(2000);
          digitalWrite(redLEDPin, LOW);
          delay(200);
        }
        //Check if the identified tag is an allowed to open tag
      }
    } 
    //Lock card to prevent a redundant read, removing the line will make the sketch read cards continually
    rfid.selectTag(str); 
  }
  rfid.halt();
}