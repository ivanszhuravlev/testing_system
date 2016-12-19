var icons = [];
icons[0] =
{
    img: "images/fastfood.png",
    desc: "Фаст фудом злоупотреблять не рекомендуется. Такая пища может плохо влиять на состояние определенных органов в вашем организме. Конечно, изредка можно позволить себе съесть что-то вредное – но важно соблюдать меру.",
    act:
    [
        { count: 1, score: 0 },
        { count: 2, score: -1 },
        { count: 3, score: -2 },
    ]
};
icons[1] =
{
    img: "images/sports.png",
    desc: "Занятия спортом развивают силу, выносливость и помогают хорошо выглядеть. Активные занятия на свежем воздухе полезны вдвойне. Но в спорте следует соблюдать меру – не выкладываться наизнос. Важно беречь себя и заниматься спортом так, чтобы получать удовольствие.",
    act:
    [
        { count: 1, score: 1 },
        { count: 2, score: 2 },
        { count: 3, score: -1 },
    ]
};
icons[2] =
{
    img: "images/alco.png",
    desc: "Употребление алкоголя может нанести серьезный вред вашему здоровью и ослабить иммунитет. Один бокал сухого вина изредка организму не навредит, но алкоголем легко увлечься и не соблюсти меру. Поэтому рекомендуется избегать употребления алкогольных напитков.",
    act:
    [
        { count: 1, score: 0 },
        { count: 2, score: -2 },
        { count: 3, score: -4 },
    ]
};
icons[3] =
{
    img: "images/smoke.png",
    desc: "Ни для кого не секрет, что курение вредит организму. Для того чтобы поддержать свой иммунитет, рекомендуется отказаться от всех вредных привычек. Но если полностью отказаться от курения вам пока сложно, вы можете начать с того, чтобы курить меньше, чем обычно – хотя бы на пару сигарет в день. И это будет первый шаг на пути к большей заботе о своем здоровье.",
    act:
    [
        { count: 1, score: -1 },
        { count: 2, score: -2 },
        { count: 3, score: -3 },
    ]
};
icons[4] =
{
    img: "images/food.png",
    desc: "Правильное питание – несложный, но эффективный способ дать своему организму энергию для полноценной жизни. В продуктах содержатся витамины, которые будут полезны вашему иммунитету.",
    act:
    [
        { count: 1, score: 1 },
        { count: 2, score: 2 },
        { count: 3, score: 3 },
    ]
};
icons[5] =
{
    img: "images/drugs.png",
    desc: "Употребление наркотических веществ плохо сказывается на состоянии вашего здоровья. Если вы систематически употребляете что-то, вы можете не замечать проблем со здоровьем. Но это не значит, что их нет. Отказаться от наркотиков очень сложно, но есть специалисты, которые могут в этом помочь.",
    act:
    [
        { count: 1, score: -1 },
        { count: 2, score: -3 },
        { count: 3, score: -4 },
    ]
};
icons[6] =
{
    img: "images/sun.png",
    desc: "Нахождение на солнце в течение непродолжительного времени приятно и полезно. Но в больших количествах солнце противопоказано ВИЧ-положительным людям. Важно обязательно пользоваться солнцезащитными кремами и чередовать пребывание на солнце и в тени.",
    act:
    [
        { count: 1, score: 1 },
        { count: 2, score: -1 },
        { count: 3, score: -2 },
    ]
};
icons[7] =
{
    img: "images/happy.png",
    desc: "Хорошее настроение может поддержать ваш иммунитет. Когда вы радуетесь, в организме вырабатываются гормоны, которые положительно влияют на ваше физическое состояние. Так что радоваться не только приятно, но и полезно.",
    act:
    [
        { count: 1, score: 1 },
        { count: 2, score: 2 },
        { count: 3, score: 3 },
    ]
};
icons[8] =
{
    img: "images/sad.png",
    desc: "Плохое настроение может ослабить ваше здоровье. Когда вы грустите, у вас мало энергии, ничего не хочется делать, и ваш организм чувствует это на физическом уровне. Конечно, совсем избежать негативных эмоций невозможно. Но важно понимать, что вызывает такое состояние и что может помочь вам с этим справиться.",
    act:
    [
        { count: 1, score: -1 },
        { count: 2, score: -2 },
        { count: 3, score: -3 },
    ]
};
icons[9] =
{
    img: "images/hands.png",
    desc: "Общение, взаимодействие с приятными людьми улучшает настроение и придает энергии. Присутствие рядом близких людей очень важно – с ними можно разделить как радость, так и печаль. Люди могут поддержать и помочь пережить тяжелый период в жизни. Полноценное общение очень важно для хорошего самочувствия.",
    act:
    [
        { count: 1, score: 1 },
        { count: 2, score: 2 },
        { count: 3, score: 3 },
    ]
};
icons[10] =
{
    img: "images/park.png",
    desc: "Пешие прогулки в парке – это самый простой и самый доступный вид физической активности. Ходьба приносит огромную пользу для человеческого организма. ",
    act:
    [
        { count: 1, score: 1 },
        { count: 2, score: 2 },
        { count: 3, score: 3 },
    ]
};
var blockGame, block1, block2;
var dragIconIdx = -1;
var addDragIcon = true;
var iconsRight = [];
var progress = { val: 25, colors: [{r: 255, g: 0, b: 0}, {r: 240, g: 255, b: 0}, {r: 0, g: 255, b: 24}]};

window.onresize = resize;
window.onload = init;
window.onmouseup = dropIcon;
window.ontouchend = dropIcon;
window.ontouchcancel = dropIcon;

function init()
{
    blockGame = document.getElementById('blockGame');
    block1 = document.getElementsByClassName('block1')[0];
    block2 = document.getElementsByClassName('block2')[0];

    progress.element = document.getElementsByClassName('progress')[0];
    progress.elementVal = document.getElementsByClassName('progress_val')[0];

    var posX = 0, posY = 0;

    for (var i = 0; i < icons.length; i++)
    {
        icons[i].thmb = document.createElement("div");
        icons[i].thmb.className = "thmb";
        icons[i].thmb.style.backgroundImage = "url(" + icons[i].img + ")";
        icons[i].thmb.draggable = false;
        icons[i].thmb.onmousedown = clickIcon;
        icons[i].thmb.ontouchstart = clickIcon;

        icons[i].btnInc = document.createElement("div");
        icons[i].btnInc.className = "btn";
        icons[i].btnInc.innerHTML = "<b>+</b>";
        icons[i].btnInc.id = i;
        icons[i].btnInc.onclick = function(e)
        {
            var iconIdx = parseInt(e.currentTarget.id);
            incIcon(iconIdx);
            redrawIconDesc(iconIdx);
        }

        icons[i].drag = document.createElement("div");
        icons[i].drag.className = "drag";
        icons[i].drag.style.backgroundImage = "url(" + icons[i].img + ")";
        icons[i].drag.draggable = false;

        icons[i].thmb.appendChild(icons[i].btnInc);
        block1.appendChild(icons[i].thmb);
        block1.appendChild(icons[i].drag);

        iconsRight[i] = { count: 0, thmb: document.createElement("div"), txtCount: document.createElement("div"), btnDec: document.createElement("div") }
        iconsRight[i].thmb.className = "thmb";
        iconsRight[i].thmb.style.backgroundImage = "url(" + icons[i].img + ")";
        iconsRight[i].thmb.style.display = "none";
        iconsRight[i].thmb.draggable = false;
        iconsRight[i].thmb.onmousedown = clickRightIcon;
        iconsRight[i].thmb.ontouchstart = clickRightIcon;

        iconsRight[i].txtCount.className = "count";

        iconsRight[i].btnDec.className = "btn";
        iconsRight[i].btnDec.innerHTML = "<b> - </b>";
        iconsRight[i].btnDec.id = i;
        iconsRight[i].btnDec.onclick = function (e)
        {
            var iconIdx = parseInt(e.currentTarget.id);
            decIcon(iconIdx);
            redrawIconDesc(iconIdx);
        }

        iconsRight[i].thmb.appendChild(iconsRight[i].txtCount);
        iconsRight[i].thmb.appendChild(iconsRight[i].btnDec);
        block2.appendChild(iconsRight[i].thmb);
    }

    resize();
    redrawProgress();
}

function clickIcon(e)
{
    var iconIdx = -1;
    for (var i = 0; i < icons.length; i++)
    {
        if (icons[i].thmb == e.srcElement)
        {
            iconIdx = i;
            break;
        }
    }

    if (iconIdx != -1)
    {
        addDragIcon = true;
        icons[iconIdx].drag.style.left = icons[iconIdx].thmb.offsetLeft + "px";
        icons[iconIdx].drag.style.top = icons[iconIdx].thmb.offsetTop + "px";
        startDragIcon(e, iconIdx);
    }
}

function clickRightIcon(e)
{
    var iconIdx = -1;
    for (var i = 0; i < icons.length; i++)
    {
        if (iconsRight[i].thmb == e.srcElement)
        {
            iconIdx = i;
            break;
        }
    }

    if (iconIdx != -1)
    {
        addDragIcon = false;
        icons[iconIdx].drag.style.left = iconsRight[iconIdx].thmb.offsetLeft + "px";
        icons[iconIdx].drag.style.top = iconsRight[iconIdx].thmb.offsetTop + "px";
        startDragIcon(e, iconIdx);
    }
}

function startDragIcon(e, iconIdx)
{
    dragIconIdx = iconIdx;
    var box;
    if (addDragIcon) box = icons[dragIconIdx].thmb.getBoundingClientRect();
    else box = iconsRight[dragIconIdx].thmb.getBoundingClientRect();
    if (e.touches != undefined && e.touches.length > 0)
    {
        icons[dragIconIdx].clickShiftX = e.touches[0].pageX - box.left;
        icons[dragIconIdx].clickShiftY = e.touches[0].pageY - box.top;
    }
    else
    {
        icons[dragIconIdx].clickShiftX = e.pageX - box.left;
        icons[dragIconIdx].clickShiftY = e.pageY - box.top;
    }
    icons[dragIconIdx].drag.style.zIndex = "1000";
    icons[dragIconIdx].drag.style.display = "block";

    document.onmousemove = dragIcon;
    document.ontouchmove = dragIcon;

    redrawIconDesc(iconIdx);
}

function dragIcon(e)
{
    var posX = 0, posY = 0;
    if (e.touches != undefined && e.touches.length > 0)
    {
        posX = e.touches[0].pageX - icons[dragIconIdx].clickShiftX;
        posY = e.touches[0].pageY - icons[dragIconIdx].clickShiftY;
    }
    else
    {
        posX = e.pageX - icons[dragIconIdx].clickShiftX;
        posY = e.pageY - icons[dragIconIdx].clickShiftY;
    }

    if (posX < blockGame.clientLeft) posX = 0;
    else if (posX + icons[dragIconIdx].drag.offsetWidth > blockGame.clientLeft + blockGame.clientWidth) posX = blockGame.clientLeft + blockGame.clientWidth - icons[dragIconIdx].drag.offsetWidth;

    if (posY < blockGame.clientTop) posY = 0;
    else if (posY + icons[dragIconIdx].drag.offsetHeight > block2.offsetTop + block2.clientHeight) posY = block2.offsetTop + block2.clientHeight - icons[dragIconIdx].drag.offsetHeight;

    icons[dragIconIdx].drag.style.left = posX + 'px';
    icons[dragIconIdx].drag.style.top = posY + 'px';
}

function dropIcon(e)
{
    if (dragIconIdx == -1) return;

    document.onmousemove = null;
    document.ontouchmove = null;

    var box1 = block1.getBoundingClientRect();
    var box2 = block2.getBoundingClientRect();
    var boxIcon = icons[dragIconIdx].drag.getBoundingClientRect();

    if (boxIcon.top >= box1.top && boxIcon.bottom <= box1.bottom)
    {
        if (!addDragIcon) decIcon(dragIconIdx);
    }
    else if (boxIcon.top >= box2.top && boxIcon.bottom <= box2.bottom)
    {
        if (addDragIcon) incIcon(dragIconIdx);
    }

    icons[dragIconIdx].drag.style.display = "none";
    icons[dragIconIdx].drag.style.zIndex = "100";

    dragIconIdx = -1;
}

function incIcon(iconIdx)
{
    if (iconsRight[iconIdx].count >= 3) return;
    iconsRight[iconIdx].count++;
    var score = calcScore(iconIdx);
    progress.val += score;
    redrawIconRight(iconIdx);
    redrawProgress();
}

function decIcon(iconIdx)
{
    var score = calcScore(iconIdx);
    iconsRight[iconIdx].count--;
    progress.val -= score;
    redrawIconRight(iconIdx);
    redrawProgress();
}

function calcScore(iconIdx)
{
    for (var i = 0; i < icons[iconIdx].act.length; i++)
    {
        if (iconsRight[iconIdx].count <= icons[iconIdx].act[i].count) return icons[iconIdx].act[i].score;
    }
    return icons[iconIdx].act[icons[iconIdx].act.length - 1].score;
}

function redrawIconDesc(iconIdx)
{
    document.getElementsByClassName("block3")[0].innerHTML = icons[iconIdx].desc;
}

function redrawIconRight(iconIdx)
{
    if (iconsRight[iconIdx].count > 0)
    {
        iconsRight[iconIdx].txtCount.innerHTML = iconsRight[iconIdx].count;
        iconsRight[iconIdx].thmb.style.display = "block";
        iconsRight[iconIdx].thmb.style.width = iconsRight[iconIdx].thmb.clientHeight + "px";
    }
    else
    {
        iconsRight[iconIdx].thmb.style.display = "none";
    }
}

function redrawProgress()
{
    var perc = progress.val * 2;
    if (perc > 100) perc = 100;
    else if (perc < 0) perc = 0;

    var colorR = 0, colorG = 0, colorB = 0;
    if (perc <= 50)
    {
        var k = perc / 50.0;
        colorR = progress.colors[0].r + (progress.colors[1].r - progress.colors[0].r) * k;
        colorG = progress.colors[0].g + (progress.colors[1].g - progress.colors[0].g) * k;
        colorB = progress.colors[0].b + (progress.colors[1].b - progress.colors[0].b) * k;
    }
    else if (perc > 50)
    {
        var k = (perc - 51) / 50.0;
        colorR = progress.colors[1].r + (progress.colors[2].r - progress.colors[1].r) * k;
        colorG = progress.colors[1].g + (progress.colors[2].g - progress.colors[1].g) * k;
        colorB = progress.colors[1].b + (progress.colors[2].b - progress.colors[1].b) * k;
    }

    progress.elementVal.style.width = perc + "%";
    progress.elementVal.style.backgroundColor = "rgb(" + parseInt(colorR) + ", " + parseInt(colorG) + ", " + parseInt(colorB) + ")";
}

function resize()
{
    blockGame.clientWidth = window.innerWidth;
    blockGame.clientHeight = window.innerHeight;

    blockGame.style.fontSize = blockGame.clientHeight / 30 + "px";

    var posX = 0, posY = 0;

    var iconSize = block1.clientWidth / 6;
    var divSize = (block1.clientWidth - iconSize * 5) / 6;
    var stepSize = iconSize + divSize;
    //var startX = 0;
    //var startY = (block1.clientHeight - iconSize * 3 - progress.element.clientHeight / 2) / 2;

    var height = block1.clientHeight - progress.element.clientHeight * 1.3;
    if (stepSize * 2 > height)
    {
        iconSize = height / 2.5;
        divSize = (height - iconSize * 2) / 3;
        stepSize = iconSize + divSize;
        //startX = (block1.clientWidth - iconSize * 6) / 2;
        //startY = 0;
    }

    var startX = (block1.clientWidth - iconSize * 6) / 2;
    var startY = (block1.clientHeight - iconSize * 3) / 2;

    for (var i = 0; i < icons.length; i++)
    {
        posX = startX + divSize + i % 6 * stepSize;
        posY = startY + divSize + Math.floor(i / 6) * stepSize;

        icons[i].thmb.style.width = iconSize + "px";
        icons[i].thmb.style.height = iconSize + "px";
        icons[i].thmb.style.left = posX + "px";
        icons[i].thmb.style.top = posY + "px";

        icons[i].drag.style.width = iconSize + "px";
        icons[i].drag.style.height = iconSize + "px";
        icons[i].drag.style.left = posX + "px";
        icons[i].drag.style.top = posY + "px";

        iconsRight[i].thmb.style.width = iconSize + "px";
        iconsRight[i].thmb.style.height = iconSize + "px";
        iconsRight[i].thmb.style.left = posX + "px";
        iconsRight[i].thmb.style.top = progress.element.clientHeight + block2.offsetTop + posY + "px";
    }

    block1.style.fontSize = iconSize / 5 + "px";
    block2.style.fontSize = block1.style.fontSize;
}