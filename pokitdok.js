"use strict";
//app constructor
function PokitdokApp() {
    this.init();
};
//methods for PokitdokApp object
!(function() {
    PokitdokApp.prototype = {
        constructor: PokitdokApp,
        init: function() {
            this.settings = {
                moduleName: 'PokitdokApp',
                client_id: 'pZG5xNEnHk6aTjj3EgYD',
                client_secr: 'WBoxMy4otoCxChecEGl4Mf3WBSHtppcjh26rGWjY',
                tradingPartnersArr: [],
                retData: "",
                title: 'PokitDok',
                author: 'mmcgraw73'
            };
            this.varSet = {
                pd_orange: '#E88024',
                pd_purp: '#61285f'
            };
            this.addStyleSheet('wwwroot/css/project_x.min.css');
            this.addStyleSheet('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
            this.docBuildr();
            this.updateTitle();
            this.addInput();
            this.addButton();
            this.getTradingPartners();


        },
        /*
        load external stylesheet
        @param fileName: 'path/to/stylesheet.css'
        */
        addStyleSheet: function(fileName) {
            var self = this,
                head = document.head,
                link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = fileName;
            head.appendChild(link);
        },
        /*
        create element and place as child of body
        @param el: str element type
        @param place: 'begin' || 'end'
        @param id: str id of el
        */
        createEle: function(el, place, id) {
            var self = this,
                body = document.getElementsByTagName('body'),
                child = document.createElement(el);
            child.id = id;
            if (place && place === 'begin') {
                body[0].appendChild(child);
            } else body[0].prepend(child);
        },
        //edit beefy.js default title
        updateTitle: function() {
            var self = this,
                title = document.getElementsByTagName('title'),
                body = document.getElementsByTagName('body');
            title[0].innerText = self.settings.title;
            //body[0].insertAdjacentHTML('afterbegin', '<h1 class="author">' + self.settings.author + '</div>');
        },
        docBuildr: function() {
            var self = this;
            for (var i = 0; i < 5; i++) {
                self.createEle('div', 'end', 'div' + i);
            }
        },
        addButton: function() {
            var self = this,
                htmlStr = '<div class="small-30"><button id="submit" class="square-button">submit</button></div>',
                div1 = document.getElementById('div1');
            div1.insertAdjacentHTML('beforeend', htmlStr);
        },
        addInput: function() {
            var self = this,
                labelStr = '<div class="small-30"><label id="numLabel" for="tpCount">how many trading partners to view ?</label></div>',
                inputStr = '<div class="small-10"><input type="number" id="tpCount" placeholder="?"></div>',
                div1 = document.getElementById('div1');
            div1.insertAdjacentHTML('afterbegin', labelStr);
            div1.insertAdjacentHTML('beforeend', inputStr);
        },

        //connect + return trading parners json from pokitdok api
        getTradingPartners: function() {
            var self = this,
                cid = self.settings.client_id,
                csc = self.settings.client_secr,
                tparr = self.settings.tradingPartnersArr,
                submit = document.getElementById('submit'),
                tpCount = document.getElementById('tpCount'),
                PokitDok = require('pokitdok-nodejs'),
                pokitdok = new PokitDok(cid, csc),
                loadingStr = '<i style="text-align: center;" class="fa fa-spinner fa-pulse fa-fw"></i>',
                div4 = document.getElementById('div4'),
                icon = document.querySelector('.fa-spinner');
            div4.insertAdjacentHTML('afterbegin', loadingStr);
            pokitdok.tradingPartners(function(err, res) {
                var i, ilen, tradingPartner, str;
                if (err) {
                    return console.log(err, res.statusCode);
                }
                // print the name and trading_partner_id of each trading partner
                var body = '';
                for (i = 0, ilen = res.data.length; i < ilen; i++) {
                    tradingPartner = res.data[i];
                    tparr.push(tradingPartner);
                    console.log(tparr[i] + '\n');
                }
                //document.body.innerHTML = tparr[0].name + ':' + tparr[0].id;
                self.settings.retData = res.data[0];
                div4.style.display = 'none';
                return self.settings.retData;
            });
            submit.addEventListener('click', function(e) {
                if (tpCount.value > 0) {
                    self.createList(tpCount.value);
                    self.updateSpanBackgrounds();
                    self.nameHover();
                }
            });

        },
        /*
          --createList is the quick + dirty solution for generating table in dom
          --creating external html + using mustache/handlebars for 0.2.0
        */
        createList: function(num) {
            var self = this,
                tradingPartnersArr = self.settings.tradingPartnersArr,
                div3 = document.getElementById('div3'),
                div2 = document.getElementById('div2'),
                tblStr = '<table id="dataTbl" class="striped-table">',
                theadStr = '<thead><tr><th>name</th><th>support 837</th><th>support 270</th><th>support 276</th></tr></thead>';
            div3.insertAdjacentHTML('afterbegin', tblStr);
            var tblEl = document.getElementById('dataTbl');
            tblEl.insertAdjacentHTML('afterbegin', theadStr);
            for (var i = 0; i < num; i++) {
                div2.insertAdjacentHTML('beforeend', '<span class="tpName small-25">' + tradingPartnersArr[i].name + '</span>' +
                    '<span class="tpName small-25 vertical-center">' + (tradingPartnersArr[i].supported_transactions.indexOf('837') > -1) + '</span>' +
                    '<span class="tpName small-25 vertical-center">' + (tradingPartnersArr[i].supported_transactions.indexOf('270') > -1) + '</span>' +
                    '<span class="tpName small-25 vertical-center">' + (tradingPartnersArr[i].supported_transactions.indexOf('276') > -1) + '</span>');
            }
        },
        updateSpanBackgrounds: function() {
            var self = this,
                spanArr = document.querySelectorAll('span.tpName');
            for (var i = 0; i < spanArr.length; i++) {
                if (spanArr[i].innerText === 'true') {
                    spanArr[i].childNodes[0].nodeValue = '';
                    spanArr[i].insertAdjacentHTML('afterbegin', '<i class="fa fa-smile-o fa-2x" style="color: rgb(75, 216, 75);opacity: 0.7;" aria-hidden="true"></i>');
                } else if (spanArr[i].innerText === 'false') {
                    spanArr[i].childNodes[0].nodeValue = '';
                    spanArr[i].insertAdjacentHTML('afterbegin', '<i class="fa fa-frown-o fa-2x" style="color: rgb(211, 40, 40);opacity: 0.7;"  aria-hidden="true"></i>');
                }
            }
        },
        nameHover: function() {
            var self = this,
                spanArr = document.querySelectorAll('span.tpName');
            for (var i = 0; i < spanArr.length; i++) {
                if (i % 4 === 0) {
                    spanArr[i].classList.add('nameCell');
                }
            }
        }
    }
    document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOM fully loaded and parsed");
        var pokitdokApp = new PokitdokApp();
    });
})();
