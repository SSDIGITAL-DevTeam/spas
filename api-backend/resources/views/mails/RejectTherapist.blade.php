<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Send Reject Mail</title>
</head>

<body
    style="font-family: 'Arial', sans-serif; background-color: #f6f6f6; color: #333; padding: 20px; text-align: center;">
    <div
        style="max-width: 600px; margin: auto; background-color: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="color: #d9534f;">Registration Rejected</h3>
        <p style="font-size: 16px; line-height: 1.5;">
            Unfortunately, your registration request was not approved. We appreciate your interest in joining us, but we
            are unable to accept your application at this time.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
            Issue: <strong>{{ $validateData['provide_issue'] }}</strong>
        </p>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <a href="https://spas.com.sg/join-us"
                style="padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Click
                here to try registering again</a>
        </div>
        <p style="font-size: 16px; line-height: 1.5;">
            If you have any questions or concerns, please feel free to contact us at<br />
            <a href="tel:+6588002950" style="color: #007bff; text-decoration: none;">+65 8800-2950</a>
        </p>
        <p style="font-size: 16px; color: #666;">
            Thank you for considering us as your platform for growth and development.
        </p>
    </div>
</body>

</html>
