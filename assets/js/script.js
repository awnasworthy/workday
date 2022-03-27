/* Variables */
    var thisDate = moment().format('MMMM Do YYYY, h:mm a');
    var thisMoment = moment().format("H A");
    var workDay = [
    { time: "9AM", event: "" },
    { time: "10AM", event: "" },
    { time: "11AM", event: "" },
    { time: "12PM", event: "" },
    { time: "1PM", event: "" },
    { time: "2PM", event: "" },
    { time: "3PM", event: "" },
    { time: "4PM", event: "" },
    { time: "5PM", event: "" },
    ];

/* Today */
    $("#currentDay").text(thisDate);

/* Local Storage*/
    var workEvents = JSON.parse(localStorage.getItem("workLog"));
    if (workEvents) {
    workDay = workEvents;
    }

/* Create rows */
    workDay.forEach(function(timeBlock, index) {
        var timeLabel = timeBlock.time;
        var blockColor = colorRow(timeLabel);
        var row =
            '<div class="time-block"' +
            index +
            '"><div class="row input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
            timeLabel +
            '</div><textarea class="form-control ' +
            blockColor +
            '">' +
            timeBlock.event +
            '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

/*append rows*/
	$(".container").append(row);
    });

/* Color rows based on current time */
    function colorRow(time) {
        var timeNow = moment(thisMoment, "H A");
        var timeThen = moment(time, "H A");
        if (timeNow.isBefore(timeThen) === true) {
            return "future";
        } 
        else if (timeNow.isAfter(timeThen) === true) {
            return "past";
        } 
        else {
            return "present";
        }
    }

/* Save Events */
    $(".saveBtn").on("click", function() {
        var blockID = parseInt(
            $(this)
                .closest(".time-block")
                .attr("id")
        );
        var userEntry = $.trim(
            $(this)
                .parent()
                .siblings("textarea")
                .val()
        );
        workDay[blockID].event = userEntry;

/* Set local storage */
	localStorage.setItem("workLog", JSON.stringify(workDay));
    });