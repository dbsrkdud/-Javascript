document.addEventListener("DOMContentLoaded", function() {
    calendarInit();
});

function calendarInit() {

    var date = new Date();
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);  // utp 표준시간
    var kstGap = 9 * 60 * 60 * 1000;    // 한국 kts 기준시간 더하기
    var today = new Date(utc + kstGap);     // 한국 시간으로 date 객체 생성

    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    var render = (thisMonth) => {
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날짜, 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();
        
        // 이번 달의 마지막 날짜, 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        var calendar = document.querySelector('.dates');
        calendar.innerHTML = '';

        // 현재 월 
        var yearMonth = document.querySelector('.year_month');
        yearMonth.innerHTML = `${currentYear}.${currentMonth + 1}`;
        
        // 지난 달 
        for(var i = prevDate - prevDay; i <= prevDate; i++){
            calendar.innerHTML += `<div class="day prev disable">${i}</div>`;
        }

        // 이번 달
        for(var i = 1; i <= nextDate; i++){
            calendar.innerHTML += `<div class="day current">${i}</div>`;
        }

        // 다음 달
        for(var i = 1; i <= (7 - nextDay == 7 ? 0 : 6 - nextDay); i++){
            calendar.innerHTML += `<div class="day next disable">${i}</div>`;
        }

        // 오늘 날짜
        if(today.getMonth() == currentMonth){
            var todayDate = today.getDate();
            var currenetMonthDate = document.querySelectorAll('.dates .current');
            currenetMonthDate[todayDate - 1].classList.add('today');
        }
    }

    render(thisMonth);

    // 이전 달 이동
    var prev = document.querySelector('.go-prev');
    prev.onclick = () => {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        console.log(thisMonth);
        render(thisMonth);
    }

    // 다음 달 이동
    var next = document.querySelector('.go-next');
    next.onclick = () => {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        render(thisMonth);
    
    }

    

}