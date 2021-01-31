using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
	
	protected void Button_LogOut(object sender, EventArgs e)
	{
		Session.Abandon();
		Response.Redirect("http://stroketest.daralfouad.org/login.aspx?url=http://stroketest.daralfouad.org/cpanel/Courses/default.aspx", true);
	}
}
