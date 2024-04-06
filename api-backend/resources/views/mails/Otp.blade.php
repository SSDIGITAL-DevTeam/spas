<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>OTP</title>
</head>

<body>
    <table>
        <tbody>
            <tr>
                <td>
                    <p>Dear {{ $otp->user->name }},</p>

                    <p>You have requested to reset your password for your account. Please use the
                        following One Time Password (OTP) to complete the password reset process:
                    </p>

                    <h2 style="font-weight: bold; text-align: center; padding: 5px; background: #ddd;">OTP:
                        {{ $otp->code }}</h2>

                    <p>
                        This OTP is valid for a short period, so please complete the password reset as soon as possible.
                    </p>

                    <p>
                        If you did not request this password reset or have any concerns about the security of your
                        account, please contact our support team immediately at
                        <a href="mailto:hello@spas.com.sg">hello@spas.com.sg</a>.
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
