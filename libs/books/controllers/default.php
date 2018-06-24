<?php
if (!isset($_POST['action'])) {
    die;
}

require_once '../models/User.php';
require_once '../models/Book.php';

$user = new User();
$book = new Book();

$action = $_POST['action'];
switch ($action) {
    case 'inSession':
        if (!isset($_SESSION['user'])) {
            http_response_code(400);
        } else {
            print_r(json_encode($_SESSION['user']));
        }
        break;
    case 'login':
        $data = array('email' => isset($_POST['email']) ? $_POST['email'] : '', 'password' => isset($_POST['password']) ? sha1(sha1($_POST['password'])) : '');
        $result = $user->login($data);
        if ($result['error']) {
            http_response_code(400);
        }
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
    case 'addUser':
        $data = array(
            'email' => isset($_POST['email']) ? $_POST['email'] : '',
            'first_name' => isset($_POST['first_name']) ? $_POST['first_name'] : '',
            'last_name' => isset($_POST['last_name']) ? $_POST['last_name'] : '',
            'password' => isset($_POST['password']) ? sha1(sha1($_POST['password'])) : '');
        $result = $user->add($data);
        if ($result['error']) {
            http_response_code(400);
        }
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
    case 'logout':
        $user->logout();
        break;
    case 'findBook':
        if (isset($_POST['id'])) {
            $result = $book->findById($_POST['id']);
            if (!isset($result->id)) {
                http_response_code(400);
            }
        } else {
            $result = $book->find();
        }
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
    case 'addBook':
        $data = array(
            'name' => isset($_POST['name']) ? $_POST['name'] : NULL,
            'edition' => isset($_POST['edition']) ? $_POST['edition'] : NULL,
            'author' => isset($_POST['author']) ? $_POST['author'] : NULL,
            'nbr' => isset($_POST['nbr']) ? $_POST['nbr'] : NULL,
            'user' => isset($_SESSION['user']) ? $_SESSION['user']->id : 1,
        );
        $result = $book->add($data);
        if ($result['error']) {
            http_response_code(400);
        }
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
    case 'updateBook':
        $data = array(
            'id' => isset($_POST['id']) ? $_POST['id'] : NULL,
            'name' => isset($_POST['name']) ? $_POST['name'] : NULL,
            'edition' => isset($_POST['edition']) ? $_POST['edition'] : NULL,
            'author' => isset($_POST['author']) ? $_POST['author'] : NULL,
            'nbr' => isset($_POST['nbr']) ? $_POST['nbr'] : NULL,
            'user' => isset($_SESSION['user']) ? $_SESSION['user']->id : 1,
        );
        $result = $book->update($data);
        if ($result['error']) {
            http_response_code(400);
        }
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
    case 'emprunt':
        $data = array(
            'book' => isset($_POST['book']) ? $_POST['book'] : NULL,
            'start_date' => isset($_POST['start_date']) ? $_POST['start_date'] : NULL,
            'end_date' => isset($_POST['end_date']) ? $_POST['end_date'] : NULL,
            'user' => isset($_SESSION['user']->id) ? $_SESSION['user']->id : NULL,
        );
        $result = $book->emprunt($data);
        if ($result['error']) {
            http_response_code(400);
        }
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
    case 'returnEmprunt':
        $data = array(
            'book' => isset($_POST['book']) ? $_POST['book'] : NULL,
            'user' => isset($_SESSION['user']->id) ? $_SESSION['user']->id : NULL,
        );
        $result = $book->returnEmprunt($data);
        if ($result['error']) {
            http_response_code(400);
        }
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
    case 'findEmprunt':
        $result = $book->findEmprunt();
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
    case 'findUserEmprunt':
        $result = $book->findUserEmprunt(isset($_SESSION['user']->id) ? $_SESSION['user']->id : NULL);
        print_r(json_encode($result, JSON_NUMERIC_CHECK));
        break;
}

?>