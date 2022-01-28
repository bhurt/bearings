
interface Report {
    html : HTMLElement;
    refreshNow(d: Date) : void;
    everyMinute(d: Date) : void;
    everyHour(d: Date) : void;
    everyDay(d: Date) : void;
}


