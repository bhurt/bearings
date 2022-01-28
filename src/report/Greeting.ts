
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


