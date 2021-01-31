using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Specialized;
using System.Text;

public partial class Login : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
    }
  

    protected void Button_Submit_Click(object sender, EventArgs e)
    {
        int branch_id;
        db ob = new db();
        SqlParameter[] p = new SqlParameter[2];
        p[0] = new SqlParameter("@user",username.Text);
        p[1] = new SqlParameter("@pass", password.Text);
        DataTable dr = ob.selectdata("sp_admin_login", p);
        if (dr.Rows.Count > 0)
        {

            Session["admin"] = dr.Rows[0]["FullName"].ToString();
            Session["admin_id"] = dr.Rows[0]["admin_id"].ToString();
			Session["Emp_ID"] = dr.Rows[0]["Emp_ID"].ToString();
            Session["Role"] = dr.Rows[0]["Role_id"].ToString();
            Session["Dept_id"] = dr.Rows[0]["Dept_id"].ToString();
            Session["Branch_id"] = dr.Rows[0]["Branch_id"].ToString();
            Session["user_name"] = dr.Rows[0]["user_name"].ToString();
            Session["Job_Description"] = dr.Rows[0]["Job_Description"].ToString();
            Session["Email"] = dr.Rows[0]["Email"].ToString();
            Session["Title"] = dr.Rows[0]["Title"].ToString();
            Session["Mobile_1"] = dr.Rows[0]["Mobile_1"].ToString();
            Session["Mobile_2"] = dr.Rows[0]["Mobile_2"].ToString();
            branch_id = Convert.ToInt32(dr.Rows[0]["branch_id"].ToString());
            if (Request.QueryString["url"] != null)
            {
                String currurl = Request.RawUrl;
                String querystring = null;

                // Check to make sure some query string variables
                // exist and if not add some and redirect.
                int iqs = currurl.IndexOf('?');
                if (iqs >= 0)
                {
                    querystring = (iqs < currurl.Length - 1) ? currurl.Substring(iqs + 1) : String.Empty;
                }
                NameValueCollection qscoll = HttpUtility.ParseQueryString(querystring);

                // Iterate through the collection.
                StringBuilder sb = new StringBuilder("<br />");
                string url = "";
                foreach (String ss in qscoll.AllKeys)
                {
                    if (ss.ToLower() == "url")
                    {
                        url = qscoll[ss];
                    }
                    else
                    {
                        if (url.ToLower().Contains("http") == true)
                        {
                            if (url.Contains("?") == true)
                            {
                                url = url + "&" + ss + "=" + qscoll[ss];
                            }
                            else
                            {
                                url = url + "?" + ss + "=" + qscoll[ss];
                            }
                        }

                    }

                }

                // Write the result to a label.


                Response.Redirect("cpanel/Courses/default.aspx", true);
                // Response.Redirect(Request.QueryString["url"], true);

            }
            else
            {
                Response.Redirect("cpanel/Courses/default.aspx");
            }


        }
        else
        {
            Response.Write("<Script> alert('Invalid User Name or Password ,Try Again.');</Script>");
            return;
        }

    }
}


