<?php
$data = json_decode(file_get_contents('php://input'), true);
$history = json_decode(file_get_contents('history.txt'), true) ?: [];

// Удаляем существующие записи с таким же ID
$history = array_filter($history, function($item) use ($data) {
    return $item['id'] !== $data['id'];
});

// Добавляем новую запись в начало
array_unshift($history, $data);

// Сохраняем только 20 последних записей
file_put_contents('history.txt', json_encode(array_slice($history, 0, 15)));
echo json_encode(['status' => 'success']);
?>