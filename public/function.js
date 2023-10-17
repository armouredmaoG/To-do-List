function setActiveButton(btnID){
            
    // Remove the active class from all buttons
    $('button').removeClass("btnActive");

    // Add the active class to the clicked button
    $('#'+btnID).addClass("btnActive");

    // Store the active button ID in sessionStorage
    sessionStorage.setItem("activeButton", btnID);
}



    

    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "August", "September", "October", "November", "December"];
    var fullDate = new Date();
    var day = weekdays[fullDate.getDay()];
    var month = months[fullDate.getMonth()-1];
    var date = fullDate.getDate();

    var isItNewDay= fullDate.getHours();

    //Setting current date.
    $("#time").text(`${day}, ${month} ${date}`);
    

    const activeButtonID = sessionStorage.getItem("activeButton") || "daily";

    if(activeButtonID){
        setActiveButton(activeButtonID);
    }

    $("#daily").click(function(){
        setActiveButton("daily");
    });

    $("#work").click(function(){
        setActiveButton("work");
    });

    $("#add-task-btn").click(function(){
        var newtask = $("input[name=new-taskname]").val();
        var info = {
            taskName: newtask,
            activeBtn: activeButtonID
        }

        $.post("/addTask",info, function(data){
            var res = $(data).find(".task-container");
            console.log(res);
            $(".task-container").replaceWith(res);
        });

        $("input[name=new-taskname]").val(" ");
    });
