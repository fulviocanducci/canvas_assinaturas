<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="jquery-3.6.0.min.js"></script>
    <title>Document</title>
</head>
<body>
    <div>
        <canvas id="painting" width="250" height="250" style="background-color: yellow;"></canvas>
        <button type="button" onclick="base64()">Enviar</button>
    </div>
    <script>
        const largura = 500;
        const altura = 300;
        const painting = document.getElementById("painting");
        painting.setAttribute("width", largura);
        painting.setAttribute("height", altura);        
        const context = painting.getContext("2d");
        context.fillStyle = "yellow";
        let drawing = false;
        painting.onmousedown = function (evt) {
            context.moveTo(evt.clientX, evt.clientY);
            drawing = true;
        }
        painting.onmouseup = function () {
            drawing = false;
        }
        painting.onmousemove = function (evt) {
            if (drawing) {
                context.lineTo(evt.clientX, evt.clientY);
                context.stroke();
            }
        }        
        function base64() {
            const data = painting.toDataURL("image/jpg", 1.0);
            const only = data.substr(data.indexOf(',') + 1, data.length)
            $.post("save.php", {only})
                .then(function(response) {
                    console.log(response);
                });
        }
    </script>
</body>
</html>