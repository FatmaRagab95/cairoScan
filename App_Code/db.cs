using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Drawing;
using System.Drawing.Imaging;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Collections.Generic;
/// <summary>
/// Summary description for db
/// </summary>
public class db
{
    public static string sitename;
    public static string sitename_ar;
    public static string logo;
    public static string email;
    public static string facebook;
    public static string twitter;
    public static string google;
    public static string linkedin;
    public static string youtube;
    
     
    public db()
    {
        //
        // TODO: Add constructor logic here
        //
        
    }
    public static string connection = ConfigurationManager.ConnectionStrings["dbcon"].ToString();
    public DataTable selectdata(string sp, params SqlParameter[] parms)
    {
        SqlConnection con = new SqlConnection(connection);
        SqlCommand com = new SqlCommand();
        com.Connection = con;
        com.CommandText = sp;
        com.CommandType = CommandType.StoredProcedure;
        foreach (SqlParameter p in parms)
        {
            com.Parameters.Add(p);
            p.Direction = ParameterDirection.Input;
        }
        con.Open();
        SqlDataAdapter adp = new SqlDataAdapter(com);
        DataTable dt = new DataTable();
        adp.Fill(dt);
        adp.Dispose();
        con.Close();
        con.Dispose();
        com.Dispose();
        return dt;
    }
    public static void addlog(string action,string table,string field,string userid)
    {
        db ob = new db();
        SqlParameter[] p = new SqlParameter[4];
        p[0] = new SqlParameter("@action", action);
        p[1] = new SqlParameter("@tablename", table);
        p[2] = new SqlParameter("@fieldid", field);
        p[3] = new SqlParameter("@userid", userid);
        ob.exnonquery("sp_log_insert", p);
    }
    public DataTable selectdata1(string text, params SqlParameter[] parms)
    {
        SqlConnection con = new SqlConnection(connection);
        SqlCommand com = new SqlCommand();
        com.Connection = con;
        com.CommandText = text;
        com.CommandType = CommandType.Text;
        foreach (SqlParameter p in parms)
        {
            com.Parameters.Add(p);
            p.Direction = ParameterDirection.Input;
        }
        con.Open();
        SqlDataAdapter adp = new SqlDataAdapter(com);
        DataTable dt = new DataTable();
        adp.Fill(dt);
        adp.Dispose();
        con.Close();
        con.Dispose();
        com.Dispose();
        return dt;
    }
    public string executescalar(string sp, params SqlParameter[] parms)
    {
        SqlConnection con = new SqlConnection(connection);
        SqlCommand com = new SqlCommand();
        com.Connection = con;
        com.CommandText = sp;
        com.CommandType = CommandType.StoredProcedure;
        foreach (SqlParameter p in parms)
        {
            com.Parameters.Add(p);
            p.Direction = ParameterDirection.Input;
        }
        con.Open();
        string val = com.ExecuteScalar().ToString();
        con.Close();
        com.Parameters.Clear();
        com.Dispose();
        return val;
    }
    public void exnonquery(string sp, params SqlParameter[] parms)
    {
        SqlConnection con = new SqlConnection(connection);
        SqlCommand com = new SqlCommand();
        com.Connection = con;
        com.CommandText = sp;
        com.CommandType = CommandType.StoredProcedure;
        foreach (SqlParameter p in parms)
        {
            com.Parameters.Add(p);
            p.Direction = ParameterDirection.Input;
        }
        con.Open();
        com.ExecuteNonQuery();
        con.Close();
        com.Parameters.Clear();
        com.Dispose();

    }
    public void exnonqueryforsql(string sp, params SqlParameter[] parms)
    {
        SqlConnection con = new SqlConnection(connection);
        SqlCommand com = new SqlCommand();
        com.Connection = con;
        com.CommandText = sp;
        com.CommandType = CommandType.Text;
        foreach (SqlParameter p in parms)
        {
            com.Parameters.Add(p);
            p.Direction = ParameterDirection.Input;
        }
        con.Open();
        com.ExecuteNonQuery();
        con.Close();
        com.Parameters.Clear();
        com.Dispose();

    }
    public string resize1(string f, string id, int w, int h, bool del)
    {
        System.Drawing.Image originalimg;
        System.Drawing.Image thumb;
        IntPtr inp = new IntPtr();
        string rootpath = System.IO.Path.GetDirectoryName(f);
        //   string filename = System.IO.Path.GetFileNameWithoutExtension(f);
        originalimg = System.Drawing.Image.FromFile(f);

        thumb = originalimg.GetThumbnailImage(w, h, null, inp);
        // Response.ContentType = "image/jpeg";

        thumb.Save(rootpath + "/" + id + ".jpg", System.Drawing.Imaging.ImageFormat.Jpeg);

        originalimg.Dispose();
        thumb.Dispose();
        if (del == true)
        {
            System.IO.File.Delete(f);
        }
        return id + ".jpg";
    }
    public string resize(string f, string id, decimal w, decimal h, bool del)
    {
        string ext = System.IO.Path.GetExtension(f);
        System.Drawing.Image originalimg;
        System.Drawing.Image thumb;
        IntPtr inp = new IntPtr();
        string rootpath = System.IO.Path.GetDirectoryName(f);
        //   string filename = System.IO.Path.GetFileNameWithoutExtension(f);
        originalimg = System.Drawing.Image.FromFile(f);
        int iw = originalimg.Width;
        int ih = originalimg.Height;
        Decimal nw;
        Decimal nh;
       
        decimal per = 1;

        //if (iw >= w && ih >= h)
        //{
        //    // per = w / iw;
        //}
        //if (iw < w && ih >= h)
        //{
        //    w = originalimg.Width;
        //}
        //if (iw >= w && ih < h)
        //{
        //    h = originalimg.Height;
        //}
        //if (iw < w && ih < h)
        //{
        //    w = originalimg.Width;
        //    h = originalimg.Height;
        //}

        if (iw > w)
        {    //check to see if resize is necessary
            //if (w > h) //get the larger dimension and get percentage
            //{
            per = Convert.ToDecimal(iw) / Convert.ToDecimal(w);
            //}
            //else
            //{
            //    per = ih / h;
            //}
        }
        else
        {
            per = 1;
        }
        w = Math.Round(Convert.ToDecimal(iw) / per, 0);
        h = Math.Round(Convert.ToDecimal(ih) / per, 0);
        System.Drawing.Size z = new System.Drawing.Size();

        // w = originalimg.Width;
        // h = originalimg.Height;
        Bitmap source_bitmap = new Bitmap(originalimg);
        //Bitmap thumb_bitmap = new Bitmap((originalimg,);
        // Bitmap thumb_bitmap = new Bitmap(iw, ih);
        Bitmap thumb_bitmap = new Bitmap(Convert.ToInt32(w), Convert.ToInt32(h));
        Graphics g = Graphics.FromImage(thumb_bitmap);
        g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
        g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
        g.FillRectangle(Brushes.White, 0, 0, Convert.ToInt32(w), Convert.ToInt32(h));
        g.DrawImage(source_bitmap, 0, 0, Convert.ToInt32(w), Convert.ToInt32(h));

        ImageCodecInfo[] Info = ImageCodecInfo.GetImageEncoders();
        EncoderParameters Params = new EncoderParameters(2);
        Params.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 70L);
        Params.Param[1] = new EncoderParameter(System.Drawing.Imaging.Encoder.ColorDepth, 100L);
        thumb_bitmap.Save(rootpath + "/img_" + id + ext, Info[1], Params);
        thumb_bitmap.Dispose();
        originalimg.Dispose();
        
        //if (originalimg.Width >= w && originalimg.Height >= h)
        //{
        //    thumb = originalimg.GetThumbnailImage(w, h, null, inp);
        //}
        //if (originalimg.Width < w && originalimg.Height >= h)
        //{
        //    thumb = originalimg.GetThumbnailImage(originalimg.Width, h, null, inp);
        //}
        //if (originalimg.Width >= w && originalimg.Height < h)
        //{
        //    thumb = originalimg.GetThumbnailImage(w, originalimg.Height, null, inp);
        //}
        //if (originalimg.Width < w && originalimg.Height < h)
        //{
        //    thumb = originalimg.GetThumbnailImage(originalimg.Width, originalimg.Height, null, inp);
        //}
        //// Response.ContentType = "image/jpeg";

        //thumb.Save(rootpath+"/"+id+".jpg", System.Drawing.Imaging.ImageFormat.Jpeg);

        //originalimg.Dispose();
        //thumb.Dispose();
        if (del == true)
        {
            System.IO.File.Delete(f);
        }
        return "img_" + id + ext;
    }
    public static bool isEmail(string sEmail)
    {
        if (sEmail == null)
        {
            return false;
        }

        int nFirstAT = sEmail.IndexOf('@');
        int nLastAT = sEmail.LastIndexOf('@');

        if ((nFirstAT > 0) && (nLastAT == nFirstAT) &&
        (nFirstAT < (sEmail.Length - 1)))
        {
            // address is ok regarding the single @ sign
            return (Regex.IsMatch(sEmail, @"(\w+)@(\w+)\.(\w+)"));
        }
        else
        {
            return false;
        }
    }
    public void sendmail(string frommail, string tomail, string sub, string msg)
    {
        string to = tomail;

        string subject = sub;
        string message = msg;

        string[] destination = tomail.Split(new char[] { ',' });
        MailMessage msgMail = new MailMessage();
        msgMail.From = new MailAddress(frommail);
        bool flag = false;
        for (int i = 0; i < destination.Length; i++)
        {
            if (destination[i].Length > 10)
            {
                msgMail.To.Add(new MailAddress(destination[i]));
            }
        }
        msgMail.Subject = subject;
        msgMail.IsBodyHtml = true;
        msgMail.Body = message;
        SmtpClient smtp = new SmtpClient("mail.elsyasi.com", 25);
        smtp.Credentials = new System.Net.NetworkCredential("info@elsyasi.com", "info1234");
        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
        try
        {
            smtp.Send(msgMail);
        }
        catch
        {

        }

        // return "Sent to " + to + "<br>\r\n";
        //}
        //catch (Exception)
        //{
        //    // return "Failed to send to " + to + "<br>\r\n";
        //}

    }
    
}
