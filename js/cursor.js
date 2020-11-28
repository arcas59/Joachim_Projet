const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", function (e) {
    return cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;");
}),
    document.addEventListener("click", function () {
        return (
            cursor.classList.add("expand"),
            setTimeout(function () {
                return cursor.classList.remove("expand");
            }, 500)
        );
    });
