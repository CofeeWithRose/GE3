function Time(){
    var fn={
        frameCount:0,
        startTime:performance.now(),
        delTime:0,
        lastTime:0,
        gamTime:0,
        update:function(){
            var now=performance.now();
            Time.frameCount++;
            Time.delTime=now-Time.lastTime;
            Time.lastTime=now;
            Time.gamTime=now-Time.startTime;
        }

    };
    return fn;
}