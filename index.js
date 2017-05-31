window.onload = function() {
  //找元素
  var box = document.getElementById("box");
  var screen = box.children[0];
  var ul = screen.children[0];
  var ulLis = ul.children;
  var ol = screen.children[1];
  var arr = document.getElementById("arr");
  //动态生成元素
  for (var i = 0; i < ulLis.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = i + 1;
    ol.appendChild(li);
  }
  //给ol标签下的第一个li标签加上current类名
  ol.children[0].className = 'current';
  var firstImg = ulLis[0].cloneNode(true);
  //给ol的li标签绑定onmouseover事件
  ul.appendChild(firstImg);
  var olLis = ol.children;
  var imgWidth = screen.offsetWidth;
  for (var j = 0; j < olLis.length; j++) {
    olLis[j].index = j;
    olLis[j].onmouseover = function() {
      for (var k = 0; k < olLis.length; k++) {
        olLis[k].className = "";
      }
      this.className = "current";
      var target = -imgWidth * this.index;
      animate(ul, target);
      pic = square = this.index;
    };
  }
  //给box绑定onmousemove和绑定onmouseout事件
  var left = document.getElementById("left");
  var right = document.getElementById("right");
  var timer = null;
  box.onmousemove = function() {
    arr.style.display = "block";
    clearInterval(timer);
  };
  box.onmouseout = function() {
    arr.style.display = "none";
    timer = setInterval(function() {
      right.onclick();
    }, 1000)
  };
  //给left和right绑定onclick事件
  var pic = 0;
  var square = 0; //记录当前按钮的索引
  right.onclick = function() {
    if (pic === ulLis.length - 1) {
      ul.style.left = 0;
      pic = 0;
    }
    pic++;
    var target = -imgWidth * pic;
    animate(ul, target);
    //点击的时候让按钮的颜色也跟上
    if (square < olLis.length - 1) {
      square++;
    } else {
      square = 0;
    }
    for (var i = 0; i < olLis.length; i++) {
      olLis[i].className = ""
    }
    olLis[square].className = "current";
  };
  left.onclick = function() {
    if (pic === 0) {
      ul.style.left = -imgWidth * (ulLis.length - 1) + "px";
      pic = ulLis.length - 1;
    }
    pic--;
    var target = -imgWidth * pic;
    animate(ul, target);
    if (square > 0) {
      square--;
    } else {
      square = olLis.length - 1;
    }
    for (var i = 0; i < olLis.length; i++) {
      olLis[i].className = ""
    }
    olLis[square].className = "current";
  };
  //自动轮播
  timer = setInterval(function() {
      right.onclick();
    }, 2000)
    //封装
  function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
      var leader = obj.offsetLeft;
      var step = 30;
      step = leader < target ? step : -step;
      if (Math.abs(leader - target) > Math.abs(step)) {
        leader = leader + step;
        obj.style.left = leader + "px";
      } else {
        obj.style.left = target + "px";
        clearInterval(obj.timer);
      }
    }, 15)
  }
}
