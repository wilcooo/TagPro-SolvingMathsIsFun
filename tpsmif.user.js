// ==UserScript==
// @name         Solving maths is fun
// @description  Solves fun math
// @author       Ko
// @version      1
// @include      *.koalabeast.com:*
// @include      *.jukejuice.com:*
// @include      *.newcompte.fr:*
// @icon         https://github.com/wilcooo/TagPro-SolvingMathsIsFun/raw/master/icon.png
// @downloadURL  https://github.com/wilcooo/TagPro-SolvingMathsIsFun/raw/master/tpsmif.user.js
// @supportURL   https://www.reddit.com/message/compose/?to=Wilcooo
// @website      https://redd.it/no-post-yet
// @license      MIT
// ==/UserScript==


tagpro.ready(function() {

    var names = [];

    tagpro.socket.on('p', function(p) {

        for (var pu of (p.u || p)) {

            if (pu.name != names[pu.id]) {
                names[pu.id] = pu.name;

                if (pu.name.match(/^[ \d×÷=/*+-]+$/)) {
                    try {
                        var answer = eval(pu.name.replace('×','*').replace('÷','/').replace('=',''));
                        tagpro.socket.emit('chat', {message:String(answer)});
                    } catch(e){}
                }
            }
        }
    });
});
