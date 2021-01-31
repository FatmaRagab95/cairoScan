<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dar elfouad hospital</title>

  <!-- Style -->
  <link href="../login/css/bootstrap.min.css" rel="stylesheet">
  <link href="../login/css/font-awesome.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../login/css/main.css" type="text/css" media="all">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  
   

</head>
<body>

     <div class='login'>
		  <div class="wrapper fadeInDown">
			<div id="formContent">
			  <div id="form-header">
				  <img class='img-fluid' src='../login/logo.png' alt='logo'/>
			  </div>
			  <h2> Sign In </h2>
			  <!-- Login Form -->
			  <form runat='server'  method="POST">
				  <asp:TextBox ID="username" runat="server"  class="fadeIn second"  placeholder="User name"></asp:TextBox>
				  <asp:TextBox ID="password" runat="server"  TextMode="Password" class="fadeIn third"  placeholder="Password"></asp:TextBox>
				  <asp:Button ID="Button_Submit" class="fadeIn fourth" OnClick="Button_Submit_Click" runat="server" Text="Submit" />
			  </form>
			</div>
		  </div>
		</div>

      <script src="../login/js/jQuery 3.2.1.js"></script>
      <script src="../login/js/main.js"></script>
    </body>
</html>