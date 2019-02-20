$(function(){

    var $name = $("#name");
    var $drink = $("#drink");
    var $myOrders = $("#orders");
    var url = "http://rest.learncode.academy/api/:csing/:testing";





    function addOrder(order){
        $myOrders.append("<li>Name: " + order.name + ", Drink: "
            + order.drink + ", Order ID:" + order.id + "</li>");
    }

    $("#getOrder").click(function () {
        showOrders()
    });

    $("#addOrder").click(function () {
        var anOrder = {
            "name": $name.val(),
            "drink": $drink.val()
        };
        $.ajax({
            type: "POST",
            url: url,
            data: anOrder,
            success: function (newOrder) {
                addOrder(newOrder)
            },
            error: function () {
                alert("Error saving order");
            }
        })
    });

    $("#clearList").click(function () {

        $.ajax({
            type: "DELETE",
            url: url + "/" + $("#id").val(),
            success: function () {
                $('#orders').load(document.URL + ' #orderDiv');
                setTimeout(function (){

                    showOrders();

                }, 10);

            },
            error: function (result){
                alert(result.statusText + " " + result.status);
            }
        });
    });

    $("#updateOrder").click(function(){

        var name = $("#name").val();
        var drink = $("#drink").val();

        $.ajax({
            type: "PUT",
            url: url + "/" + $("#id").val(),
            data: { "name": name, "drink": drink },
            success: function(){

                $('#orders').load(document.URL + ' #orderDiv');
                setTimeout(function (){

                    showOrders();

                }, 10);
            },
            error: function (result) {
                console.log("ERROR " + result.statusText + " " + result.status);
            }});


    });

    function showOrders() {
        $.ajax({
            type: "GET",
            url: url,
            success: function (order) {
                $.each(order, function (i, order) {
                    addOrder(order);

                })
            },
            error: function () {
                alert("Please check your URL")
            }
        });
    }



}); //end of parent function