function dnd (dragSelector, targetSelector) {
    var drag = document.querySelector(dragSelector),
        dragX, dragY, dx, dy;
    var target = targetSelector ? document.querySelector(targetSelector) : drag;
    $(drag).attr('draggable', true);
    drag.ondragstart = function(e){
        dragX= e.x;
        dragY= e.y;
        $(target).css('opacity', 0.4);
    };
    drag.ondrag = function(e) {
        dx = e.x - dragX;
        dy = e.y - dragY;
        if (~~e.screenX == 0 || ~~e.screenY == 0)
            return;
        dragX = e.x;
        dragY = e.y;
        $(target).css({'left':$(target).offset().left + dx,'top':$(target).offset().top + dy,
            'right':'auto','bottom':'auto'});
    }
    drag.ondragend = function(e) {
        $(target).css('opacity', 1);
    }
}