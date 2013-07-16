<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="Cookbook._default" %>

        <meta content="IE=8,chrome=1" http-equiv="X-UA-Compatible">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">
        <title>CookBook</title>
        <link rel="shortcut icon" href="images/favicon.ico">

        <link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css">
        <link rel="stylesheet" type="text/css" href="css/Cookbook.css">
        <!--<script type="text/javascript" src="extjs/ext.js"></script>-->
        <script type="text/javascript" src="extjs/ext-all-dev.js">            //src="extjs/ext-debug.js">
        </script>
        <script type="text/javascript" src="CookBook.js">
        </script>
    </head>
    <body>
    <div id="cookbook" style="height: 0px;">
    </div>
    <!--[if lt IE 9]>
        <script type="text/javascript" src="app/view/mainview/CFInstallCustom.js"></script>
        <style>
        .chromeFrameInstallDefaultStyle {
        width: 100%; /* default is 800px */
        border: 5px solid blue;
        }
        </style>
        <!--[if lt IE 9]>
            <script>
            // The conditional ensures that this code will only execute in IE,
            // Therefore we can use the IE-specific attachEvent without worry
            window.attachEvent("onload", function() {
            CFInstall.check({
                mode: "overlay",
                node: "prompt",
                url: "app\\view\\mainview\\gcfsplash.html"
            });
            });
            </script>
        <![endif]>
        <![endif]-->
    </body>
    <div id="loading-mask">
    </div>
    <div id="loading">
        <div class="loading-indicator">
            Loading... Please wait.
        </div>
    </div>
</html>

