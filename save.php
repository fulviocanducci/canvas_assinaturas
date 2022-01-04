<?php

function saveImg($base64) {
    try {
        $data = base64_decode($base64);
        $name = uniqid();
        file_put_contents("{$name}.jpg", $data);
        return true;
    } catch (\Throwable $th) {
        throw $th;
    }    
}

if ($base64 = filter_input(INPUT_POST, "only")) {
    return saveImg($base64);
}