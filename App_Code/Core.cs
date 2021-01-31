using System;
using System.Collections.Generic;
using System.Web;

/// <summary>
/// Summary description for Core
/// </summary>
public class Core
{
    public Core()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    public static string ToString(object value)
    {
        if (value is DBNull || value == null)
        {
            return string.Empty;
        }
        else
        {
            return value.ToString();
        }
    }

    public static string ToDate(object value)
    {
        if (value is DBNull || value == null)
        {
            return string.Empty;
        }
        else
        {
            DateTime d;
            if (DateTime.TryParse(value.ToString(), out d) == true)
            {
                return d.ToString("yyyy-MM-dd");
            }
            else
            {
                return string.Empty;
            }

        }
    }

    public static string ToDateTime(object value)
    {
        if (value is DBNull || value == null)
        {
            return string.Empty;
        }
        else
        {
            DateTime d;
            if (DateTime.TryParse(value.ToString(), out d) == true)
            {
                return d.ToString("yyyy-MM-dd hh:mm:ss tt");
            }
            else
            {
                return string.Empty;
            }

        }
    }
    public static Boolean ToBoolean(object value)
    {
        if (value is DBNull || value == null)
        {
            return false;
        }
        else
        {
            Boolean b;
            Boolean.TryParse(value.ToString(), out b);

            return b;
        }
    }
    public static int ToInt(object value)
    {
        if (value is DBNull || value == null)
        {
            return 0;
        }
        else
        {
            int i;
            int.TryParse(value.ToString(), out i);

            return i;
        }
    }

}
