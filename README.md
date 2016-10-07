# ![Logo](chrome-extension/images/icon-128.png) Earth Engine Connector
Run local NodeJS scripts using CommonJS modules in the Earth Engine playground.

## Requirements

 - [NodeJS (& NPM)](http://nodejs.org/)
 - Google Chrome

## Install and Setup

First, you will need the Earth Engine connector file server. Install 
via NPM.

```bash
> npm install -g earthengine-connector
```

Now start the up the server in the directory where your local
Earth Engine scripts live.  Alternatively you can pass a directory
to the server as the first argument. 

```
> js-ee [dir]
```

You can test the server is working by visiting [http://127.0.0.1:9812](http://127.0.0.1:9812)
in your browser.

Second, you need the EarthEngine-Connector Google Chrome Plugin.
Until it is pushed to the extension store (TODO), you will need to
pull this repo and add to Google Chrome manually.

```
> git clone https://github.com/jrmerz/earthengine-connector 
```

Then open Google Chrome and visit [chrome://extensions/](chrome://extensions/)
At the top, on the right hand side, check 'Developer Mode'.  Then
click the 'Load unpackaged extension'.  Using the file selector, select the
folder 'chrome-extension' from this repo.

You should now see 'Earth Engine Connector' in the extensions list and are
now good to go.

## Usage

Visit [http://code.earthengine.google.com](http://code.earthengine.google.com)
with the Chrome extension installed and js-ee server running.  There are some 
examples tutorial scripts in the **examples** dir you can serve with js-ee for testing.

At the bottom right corner for the EarthEngine playground you should see a upload 
icon button.  Click it to see all files from the directory you are serving.  
Click any file to load.

At any time you and reload the file list by clicking the refresh icon below
the file list.  You can refresh a loaded file by clicking the main refresh icon
next to the upload icon.  This icon only shows after a file is loaded and the 
file selector window is closed.

## Writing scripts

You are now free to break your EE scripts into multiple files using the NodeJS
require() function to import other files.  You can pull and publish to NPM as well,
though be warned, all imported JS code needs to be able to run inside the EE 
playground.  Finally, you can now store your scripts in Github, Bitbucket or other
common code repositories.
