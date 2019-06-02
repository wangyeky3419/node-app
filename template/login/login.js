var can = document.getElementById("can");
var ctx = can.getContext("2d");
var arr = [];
var grid = [];
let drag = 1000;
var settings = {
    "grid size": 5,
    circles: 40,
    delay: 50,
    show: false
}, settings_copy = {};
function gui() {
    var g = new dat.GUI();
    g.add(settings, "grid size", 3, 30).step(1);
    g.add(settings, "circles", 1, 100).step(1);
    g.add(settings, "delay", 1, 1000).step(1);
    g.add(settings, "show");
}
gui();
class Circle {
    constructor() {
        this.x = 50 + ~~(Math.random() * (can.width - 100));
        this.y = 50 + ~~(Math.random() * (can.height - 100));
        this.radius = 10 + ~~(Math.random() * 20);
        this.target = {
            x: can.width / 2,
            y: can.height / 2
        };
        this.directions = [1, -1]
        this.vel = {
            x: 3 * Math.random() * this.directions[~~(Math.random() * 2)],
            y: 3 * Math.random() * this.directions[~~(Math.random() * 2)]
        };
    }
    update() {
        this.vel.x = (-this.x + this.target.x) / (drag * (this.radius / 15) / 10);
        this.vel.y = (-this.y + this.target.y) / (drag * (this.radius / 15) / 10);
        this.x += this.vel.x;
        this.y += this.vel.y;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
}

function setup() {
    grid = [];
    for (var i = arr.length; i < settings.circles; ++i) {
        var circ = new Circle();
        arr.push(circ);
    }
    for (var i = 0; i < can.width; i += settings["grid size"]) {
        grid.push([]);
        for (var j = 0; j < can.height; j += settings["grid size"]) {
            grid[i / settings["grid size"]].push(0.0);
        }
    }
}
function lerp(p1, p2) {
    return {
        x: p2.x + (p1.x - p2.x) * ((1.0 - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]]) / (grid[p1.x / settings["grid size"]][p1.y / settings["grid size"]] - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]])),
        y: p2.y + (p1.y - p2.y) * ((1.0 - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]]) / (grid[p1.x / settings["grid size"]][p1.y / settings["grid size"]] - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]]))
    }
}
function v_to_b(v1, v2, v3, v4) {
    //variable to binary
    return v4 + (v3 << 1) + (v2 << 2) + (v1 << 3);
}
function draw() {
    try {
        if (JSON.stringify(settings_copy) != JSON.stringify(settings)) {
            setup();
            settings_copy = Object.assign({}, settings);
        }

        ctx.fillStyle = "#F6F6F6";
        ctx.fillRect(0, 0, can.width, can.height);
        for (var i = 0; i < settings.circles; ++i) {
            arr[i].update(i);
            settings.show && arr[i].draw();
        }
        for (var i = 0; i < can.width; i += settings["grid size"]) {
            for (var j = 0; j < can.height; j += settings["grid size"]) {
                var v = 0;
                for (var k = 0; k < settings.circles; ++k) {
                    v += (arr[k].radius * arr[k].radius) / (((arr[k].x - i) * (arr[k].x - i)) + ((arr[k].y - j) * (arr[k].y - j)))
                }
                grid[(i / settings["grid size"])][(j / settings["grid size"])] = v;
            }
        }
        var threshold = 1.0;
        for (var i = 0; i < can.width - settings["grid size"]; i += settings["grid size"]) {
            for (var j = 0; j < can.height - settings["grid size"]; j += settings["grid size"]) {
                var a = grid[i / settings["grid size"]][j / settings["grid size"]] >= threshold;
                var b = grid[i / settings["grid size"]][(j + settings["grid size"]) / settings["grid size"]] >= threshold;
                var c = grid[(i + settings["grid size"]) / settings["grid size"]][(j + settings["grid size"]) / settings["grid size"]] >= threshold;
                var d = grid[(i + settings["grid size"]) / settings["grid size"]][j / settings["grid size"]] >= threshold;
                if (a + b + c + d == 0 || a + b + c + d == 4) continue;
                var ap = {
                    x: i,
                    y: j
                }, bp = {
                    x: i,
                    y: j + settings["grid size"]
                }, cp = {
                    x: i + settings["grid size"],
                    y: j + settings["grid size"]
                }, dp = {
                    x: i + settings["grid size"],
                    y: j
                };
                var p1, p2, p3, p4, temp;
                var v = v_to_b(a, b, c, d);
                if (v == 8 || v == 7) {
                    temp = lerp(ap, dp);
                    p1 = {
                        x: temp.x,
                        y: temp.y
                    };
                    temp = lerp(ap, bp);
                    p2 = {
                        x: temp.x,
                        y: temp.y
                    };
                }
                else if (v == 4 || v == 11) {
                    temp = lerp(bp, ap);
                    p1 = {
                        x: temp.x,
                        y: temp.y
                    };
                    temp = lerp(bp, cp)
                    p2 = {
                        x: temp.x,
                        y: temp.y
                    };
                }
                else if (v == 2 || v == 13) {
                    temp = lerp(cp, bp)
                    p1 = {
                        x: temp.x,
                        y: temp.y
                    };
                    temp = lerp(cp, dp)
                    p2 = {
                        x: temp.x,
                        y: temp.y
                    };
                }
                else if (v == 1 || v == 14) {
                    temp = lerp(dp, cp)
                    p1 = {
                        x: temp.x,
                        y: temp.y
                    };
                    temp = lerp(dp, ap);
                    p2 = {
                        x: temp.x,
                        y: temp.y
                    };
                }
                else if (v == 12 || v == 3) {
                    temp = lerp(ap, dp);
                    p1 = {
                        x: temp.x,
                        y: temp.y
                    };
                    temp = lerp(bp, cp)
                    p2 = {
                        x: temp.x,
                        y: temp.y
                    };
                }
                else if (v == 9 || v == 6) {
                    temp = lerp(ap, bp);
                    p1 = {
                        x: temp.x,
                        y: temp.y
                    };
                    temp = lerp(dp, cp);
                    p2 = {
                        x: temp.x,
                        y: temp.y
                    };
                }
                if (p1 != undefined && p2 != undefined) {
                    ctx.beginPath();
                    ctx.strokeStyle = "#007bff";
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    } catch (e) { console.log(e) }
    requestAnimationFrame(draw);
}
function resize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
	setup();
}
window.onresize = resize;

can.ontouchmove = function(e){
    for (var i = 0; i < settings.circles; ++i) {
        function timeout(i) {
            setTimeout(function () {
                if (i < window.arr.length)
                    window.arr[i].target = {
                        x: e.clientX,
                        y: e.clientY
                    }
            }, i * settings.delay);
        }
        timeout(i);
    }
}

can.onmousemove = function (e) {
    for (var i = 0; i < settings.circles; ++i) {
        function timeout(i) {
            setTimeout(function () {
                if (i < window.arr.length)
                    window.arr[i].target = {
                        x: e.clientX,
                        y: e.clientY
                    }
            }, i * settings.delay);
        }
        timeout(i);
    }
};
resize();
requestAnimationFrame(draw);
setTimeout(function(){
	drag = 50;
},2000)
$('#register').on('click',function(){
    console.log('register')
    $('.loginForm').hide();
    $('.registerForm').show();
})
$('#back').on('click',function(){
    console.log('login')
    $('.loginForm').show();
    $('.registerForm').hide()
})

//注册提交
$('#registerSave').on('click',function(){
    if($('.registerForm #password').val()!=$('.registerForm #password2').val()){
        return false;
    }else{
        //发起注册请求
    }
    // return false;
})

