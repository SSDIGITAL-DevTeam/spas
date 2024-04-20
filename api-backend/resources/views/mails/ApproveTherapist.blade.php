<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Send Password</title>
</head>

<body>
    <h1>Your Email and Password Details</h1>
    <p>Email Address: {{ $user->email }}</p>
    <p>Password: {{ $newPassword }}</p>
    <p>
        You can use this information to log in to our website.
    </p>
    <div>
        <a href="https://dev.spas.com.sg/auth/login">Click here to log in</a>
    </div>
    <p>Thank you</p>

</body>

</html>
