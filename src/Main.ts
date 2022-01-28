var reports : Array<Report> = [
    new Greeting(),
    new TodayIs() ];

var updateId : number | null = null;
var lastUpdate : Date | null = null;

function doUpdate() : void {
    console.log("In doUpdate()");
    const now : Date = new Date();
    if (lastUpdate == null) {
        console.log("No lastUpdate: doing a full refresh.");
        for (var i = 0; i < reports.length; ++i) {
            reports[i].refreshNow(now);
        }
    } else {
        console.log("Have a lastUpdate.");
        if (now.getMinutes() != lastUpdate.getMinutes()) {
            for (var i = 0; i < reports.length; ++i) {
                reports[i].everyMinute(now);
            }
            if (now.getHours() != lastUpdate.getHours()) {
                for (var i = 0; i < reports.length; ++i) {
                    reports[i].everyHour(now);
                }

                if (now.getDate() != lastUpdate.getDate()) {
                    for (var i = 0; i < reports.length; ++i) {
                        reports[i].everyDay(now);
                    }
                }
            }
        }
    }
    lastUpdate = now;
}


function handleVisibilityChange() : void {
    // If we're not showing, stop doing updates.
    if (document["hidden"]) {
        if (updateId != null) {
            window.clearInterval(updateId);
        }
        updateId = null;
        lastUpdate = null;
    } else {
        if (updateId == null) {
            doUpdate();
            updateId = window.setInterval(doUpdate, 5000);
        }
    }
}

function main() : void {

    const frame : HTMLElement = document.getElementById("frame");

    for (var i = 0; i < reports.length; ++i) {
        frame.appendChild(reports[i].html);
    }

    document.addEventListener("visibilitychange",
                                handleVisibilityChange,
                                false); 

    updateId = window.setInterval(doUpdate, 5000);
}

main();

