let circles = 0

document.getElementById("addBucket").addEventListener("click", () => {
    const title = document.getElementById("iTitle")
    const progress = document.getElementById("iProgress")
    let number = parseInt(progress.value)

    if (title.value != '' && progress.value != '') {
        if (Number.isInteger(number)) {
            if (number > 100) { number = 100 }
        } else {
            number = 100
        }

        // Creat container
        document.getElementById("allBuckets").insertAdjacentHTML('beforeend', `
                <div class="col-md-3 col-sm-6">
                    <div class="box">
                    <div class="circle" id="cir-${circles}"></div>
                    <h6>${title.value}</h6>
                    </div>
                </div>`)

        // Inictliase circle
        if (title.value != "") {
            Circles.create({
            id: "cir-" + circles,
            radius: 65,
            value: number,
            maxValue: 100,
            width: 5,
            text: function (value) {
                return value + "%";
            },
            colors: ["transparent", "#ffffff"],
            duration: 400,
            wrpClass: "circles-wrp",
            textClass: "progress_text",
            valueStrokeClass: "circles-valueStroke",
            maxValueStrokeClass: "circles-maxValueStroke",
            styleWrapper: true,
            styleText: true
            });

            // Increase circle counter
            circles++;

            // Close modal
            $('#exampleModalCenter').modal('hide')

            // Reset modal
            title.value = ''
            progress.value = ''
        }
    }
})
