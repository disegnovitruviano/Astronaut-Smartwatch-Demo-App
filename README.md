# Astronaut-Smartwatch-Demo-App
This is a demonstration Smartwatch app for astronauts aboard the ISS.  This application was conceptualized as part of of a public challenge posted on https://www.freelancer.com/contest/NASA-Challenge-Astronaut-Smartwatch-App-Interface-Design-261634.html.   

## Installation instructions

### Prerequisites

#### Node
Install Node 6.0.0

### Admin Panel

1. Clone the repo from GitHub
2. Open the {path-tp}/Astronaut-Smartwatch-Demo-App}/server folder
3. Install all dependencies. In terminal execute 'npm install'
3. By default admin panel opens on port 3000. If you want to modify that, set an environment variable PORT i.e. 'export PORT=4000'
4. Start admin panel server: 'node bin/bootstrap'.
5. Open browser. Navigate to http://localhost:3000 (or custom port you defined)
6. Open 'Events' in nav bar. Create a couple events for the current date (so that they show up in Timeline in watch app)
7. Note that there is no error checking for any form, so please fill all the fields when you edit/create something

### Install Tizen IDE
* Follow this link: https://developer.tizen.org/development/tools/download/installing-sdk?langswitch=en
* Make sure to download & install 'Wearable SDK' and not the 'Regular Tizen SDK'

### Generating author certificate
Please follow this doc: https://developer.tizen.org/ko/forums/general-support/how-register-author-certificate-tizen-sdk?langswitch=ko

### Installing Gear S certificate. Skip if you already installed your certificate to your watch

0. Using the test certificate available
1. Open Tizen IDE
2. Click 'Register Certificate'
3. Click 'Browse' to the right of 'Author/Certificate file', select the 'author.crt' file
4. Type 'nasa' as password
5. Click 'Browse' next to 'Device Profile/Certificate file', select the 'device-profile.xml' file
6. Enter 'W1cDbyJTAH' as password
7. Click OK
8. Close the form
9. Open 'Connection Explorer' panel, right click the connected Gear S and select 'Permit to install applications'


### Launching the app

1. In Tizen SDK click File->Import, then select General->Existing Projects into Workspace
2. In the next screen click Browse and select the Astronaut-Smartwatch-Demo-App/gear/watch folder. Click OK
3. After project is imported, open 'js/controllers.js' file
4. At the very top change 'localhost' to IP address of the machine where the server runs. If you used custom port (not 3000) for server, replace 3000 with the actual port
5. Right click project name in Project Explorer and select Run As-> Tizen Web Appliction