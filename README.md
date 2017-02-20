# <center>PokitDok Test Application</center>

# Instructions:
### If you will, please make a web application that connects to our API at https://platform.pokitdok.com and displays some data from there. The trading partners API endpoint is a good one to use since there are a bunch of them and they have a good number of properties for display. You can use whatever you like to connect to the API, for instance we have a nodejs client library at https://github.com/pokitdok/pokitdok-nodejs. Once you connect and get some data, render a webpage that presents it in a way you find useful or just visually pleasing.

## My Solution:
- create an application that will retrieve all trading partners
- allow user to view all or limit the output on the front-end via number input
- each row will contain:
-- the name of trading partner
-- boolean [.fa-smile-o, .fa-frown-o] to show if partner supports codes [837, 270, 276]

## Server File:
- [pokitdok.js](https://github.com/mmcgraw73/project_x/blob/pokitdok/pokitdok.js)

## Screenshots of Application:
# <center>default view on page load</center>
![alt tag](img/pokitdok-default-view.png)
# <center>view after input submit</center>
![alt tag](img/pokitdok-50.png)

## Development Tools Used:
+ [grunt](http://gruntjs.com/) - javascript task runner
+ [browserify](http://browserify.org/) - front-end dependency management
+ [beefy](http://didact.us/beefy/) - local development server
+ [sass](http://sass-lang.com/) / [primitive](https://taniarascia.github.io/primitive/) - stylesheet language / scss library
+ [node](https://nodejs.org/en/) - open-source, cross-platform JavaScript runtime environment

### ** currently not mobile friendly **  
