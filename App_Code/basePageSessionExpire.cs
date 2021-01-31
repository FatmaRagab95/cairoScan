using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Threading;

/// <summary>
/// Summary description for basePageSessionExpire
/// </summary>
public class basePageSessionExpire : System.Web.UI.Page
{
    public basePageSessionExpire()
    {
    }
    public static string SiteURL = ConfigurationManager.AppSettings["url"];
      
    override protected void OnInit(EventArgs e)
    {
        base.OnInit(e);


        //It appears from testing that the Request and Response both share the 
        // same cookie collection.  If I set a cookie myself in the Reponse, it is 
        // also immediately visible to the Request collection.  This just means that 
        // since the ASP.Net_SessionID is set in the Session HTTPModule (which 
        // has already run), thatwe can't use our own code to see if the cookie was 
        // actually sent by the agent with the request using the collection. Check if 
        // the given page supports session or not (this tested as reliable indicator 
        // if EnableSessionState is true), should not care about a page that does 
        // not need session
        if (Session["admin"] == null )
        {
             
            string url = Request.Url.AbsoluteUri;//.Replace("&", "##");
            Response.Redirect("~/login.aspx?url=" + (url));
           // Response.Redirect("~/login.aspx?url=" + Request.Url.AbsoluteUri);

            try
            {
                Response.Redirect(ConfigurationManager.AppSettings["url"] + "login.aspx?url=" + (url));

                     
            }
            catch (ThreadAbortException)
            {
                // Do nothing. ASP.NET is redirecting.
                // Always comment this so other developers know why the exception 
                // is being swallowed.
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("exit above the top directory.") == true)
                {
                    try
                    {
                        url = Request.Url.AbsoluteUri;//.Replace("&", "##");
                        Response.Redirect("~/login.aspx?url=" +  ( url));

                       // Response.Redirect("~/login.aspx?url=" + HttpUtility.UrlEncode(Request.Url.PathAndQuery));
                    }
                    catch (ThreadAbortException)
                    {
                        // Do nothing. ASP.NET is redirecting.
                        // Always comment this so other developers know why the exception 
                        // is being swallowed.
                    }
                    catch
                    {



                    }
                }
                else
                {

                }

            }
        }
        else
        {


        }
        base.OnPreInit(e);
        //if (Context.Session != null)
        //{
        //    //Tested and the IsNewSession is more advanced then simply checking if 
        //    // a cookie is present, it does take into account a session timeout, because 
        //    // I tested a timeout and it did show as a new session
        //    if (Session.IsNewSession)
        //    {
        //        // If it says it is a new session, but an existing cookie exists, then it must 
        //        // have timed out (can't use the cookie collection because even on first 
        //        // request it already contains the cookie (request and response
        //        // seem to share the collection)
        //        string szCookieHeader = Request.Headers["Cookie"];
        //        if ((null != szCookieHeader) && (szCookieHeader.IndexOf("ASP.NET_SessionId") >= 0))
        //        {
        //            Response.Redirect("login.aspx");
        //        }
        //    }
        //}
    }
}
