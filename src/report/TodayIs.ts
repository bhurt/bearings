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


