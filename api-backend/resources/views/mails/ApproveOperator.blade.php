<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Send Password</title>
</head>

<body style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div
        style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h1 style="color: #444;">Your Email and Password Details</h1>
        <p style="font-size: 16px; color: #555;">Email Address: <strong>{{ $user->email }}</strong></p>
        <p style="font-size: 16px; color: #555;">Password: <strong>{{ $newPassword }}</strong></p>
        <p style="margin-bottom: 20px; font-size: 16px; color: #555;">
            You can use this information to log in to our website.
        </p>
        <div style="margin: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <a href="https://dev.spas.com.sg/auth/login"
                style="padding: 10px 20px; background-color: #007BFF; color: #ffffff; border-radius: 5px; text-decoration: none;">Click
                here to log in</a>
        </div>
        <p style="font-size: 16px; color: #777;">Thank you</p>
    </div>
</body>

</html>
