<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Get Messages</title>
</head>

<body>

    <h3>Messages from {{ $data['fullname'] }}</h3>
    <p>
        <strong>Topic : </strong> {{ $data['topic'] }}
    </p>
    <p>
        <strong>Email : </strong> {{ $data['email'] }}
    </p>
    <p>
        <strong>Message : </strong> <br />{{ $data['message'] }}
    </p>


</body>

</html>
