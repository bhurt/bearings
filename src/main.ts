
interface Report {
    html : HTMLElement;
    refreshNow(d: Date) : void;
    everyMinute(d: Date) : void;
    everyHour(d: Date) : void;
    everyDay(d: Date) : void;
}

class Greeting implements Report {
    constructor() {
        const top : HTMLElement = document.createElement("div");
        this.html = top;
        top.setAttribute("class", "report row fullWidth center mainText");
        this.setGreeting(new Date());
    }

    html : HTMLElement;

    setGreeting(d: Date) : void {
        const hour = d.getHours();
        var txt = "Hello, world!";
        if ((hour < 6) || (hour >= 22)) {
            txt = "Good Night";
        } else if (hour < 12) {
            txt = "Good Morning";
        } else if (hour < 17) {
            txt = "Good Afternoon";
        } else {
            txt = "Good Evening";
        }
        this.html.textContent = txt;
    }

    refreshNow(d: Date) : void {
        this.setGreeting(d);
    }

    everyMinute(d: Date) : void {
    }

    everyHour(d: Date) : void {
        this.setGreeting(d);
    }

    everyDay(d: Date) : void {
    }

}

class TodayIs implements Report {
    html : HTMLElement;
    dateSpan : HTMLElement;
    timeSpan : HTMLElement;

    constructor() {
        this.html = document.createElement("div");
        this.html.setAttribute("class", "report col fullWidth");

        const titleRow = document.createElement("div");
        titleRow.setAttribute("class", "row pullLeft altText")
        titleRow.textContent = "Today is";
        this.html.appendChild(titleRow);

        const mainRow = document.createElement("div");
        mainRow.setAttribute("class", "row fullWidth mainText");

        this.dateSpan = document.createElement("span");
        this.timeSpan = document.createElement("span");
        this.timeSpan.setAttribute("class", "pullRight");
        mainRow.appendChild(this.dateSpan);
        mainRow.appendChild(this.timeSpan);
        this.html.appendChild(mainRow);

        const now : Date = new Date();
        this.setDate(now);
        this.setTime(now);
    }

    setDate(now: Date) : void {
        const dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday",
                            "Thursday", "Friday", "Saturday" ]
        const monthNames = [ "January", "Feburary", "March", "April",
                                "May", "June", "July", "August",
                                "September", "October", "November",
                                "December" ]
        const dateTxt = dayNames[now.getDay()]
                            + ", "
                            + now.getDate()
                            + " "
                            + monthNames[ now.getMonth() ]
                            + " "
                            + now.getFullYear();
        this.dateSpan.textContent = dateTxt;
    }

    setTime(now: Date) : void {
        const hour : number = now.getHours();
        var h : number;
        if (hour > 12) {
            h = hour - 12;
        } else if (hour == 0) {
            h = 12;
        } else {
            h = hour;
        }

        var ampm : string;
        if (hour > 11) {
            ampm = "PM";
        } else {
            ampm = "AM";
        }
        const timeTxt = h.toString() + ":" + now.getMinutes().toString()
                            + " " + ampm;
        this.timeSpan.textContent = timeTxt;
    }

    refreshNow(d: Date) : void {
        this.setDate(d);
        this.setTime(d);
    }

    everyMinute(d: Date) : void {
        this.setTime(d);
    }

    everyHour(d: Date) : void {
    }

    everyDay(d: Date) : void {
        this.setDate(d);
    }

}

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

