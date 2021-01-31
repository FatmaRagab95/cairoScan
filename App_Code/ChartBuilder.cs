using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

/// <summary>
/// Summary description for ChartBuilder
/// </summary>
public class ChartBuilder
{
    public ChartBuilder(ChartType type, string canvasId)
    {
        Type = type;
        CanvasId = canvasId;
        ChartLegends = new List<Legend>();
        ChartCategories = new List<ChartLineData>();
    }
    public ChartBuilder(ChartType type, string canvasId, Literal literal)
    {
        Type = type;
        CanvasId = canvasId;
        ChartLegends = new List<Legend>();
        ChartCategories = new List<ChartLineData>();
        ScriptLiteral = literal;
    }
    public enum ChartType
    {
        bar,
        line,
        pie,
        spline


    }

    public Literal ScriptLiteral { get; set; }
    public string CanvasId { get; set; }
    public ChartType Type { get; set; }

    public List<Legend> ChartLegends { get; private set; }
    public List<ChartLineData> ChartCategories { get; private set; }

    public class ChartLineData
    {
        public ChartLineData(string name)
        {
            Data = new Dictionary<Legend, double>();
            CategoryName = name;
        }
        public string CategoryName { get; private set; }
        public Dictionary<Legend, double> Data { get; private set; }
    }
    public class Legend
    {
        public Legend(string name)
        {
            PointBorderWidth = 1;
            PointBackgroundColor = "38, 185, 154, 0.7";
            PointBorderColor = "38, 185, 154, 0.7";
            PointHoverBackgroundColor = "#fff";
            PointHoverBorderColor = "220,220,220,1";
            Name = name;
        }

        public string BackgroundColor { get; set; }
        public string BorderColor { get; set; }
        public string Name { get; private set; }
        public string PointBorderColor { get; set; }
        public string PointBackgroundColor { get; set; }
        public string PointHoverBackgroundColor { get; set; }
        public string PointHoverBorderColor { get; set; }
        public int PointBorderWidth { get; private set; }

    }

    public void BuildChart()
    {
        if (ScriptLiteral != null)
        {
            ScriptLiteral.Text = PublishChart();
        }
    }

    public string PublishChart()
    {
        if (ChartCategories.Count == 0 || ChartLegends.Count == 0)
        {
            return string.Empty;
        }

        List<string> categories = new List<string>();

        foreach (var item in ChartCategories)
        {
            categories.Add(string.Format("'{0}'", item.CategoryName));
        }

        List<string> legends = new List<string>();

        foreach (var item in ChartLegends)
        {
            var categoryLegned = ChartCategories.Where(c => c.Data.Keys.Contains(item)).ToList();
            List<string> data = new List<string>();
            foreach (var l in categoryLegned)
            {
                foreach (var v in l.Data)
                {
                    if (v.Key == item)
                    {
                        data.Add(v.Value.ToString());
                    }

                }
            }

            legends.Add(@"{
                                                label: '" + item.Name + @"', backgroundColor: 'rgba(" + item.BackgroundColor + @")', borderColor: 'rgba(" + item.BorderColor + @")',
                        pointBorderColor: 'rgba(" + item.PointBorderColor + @")', pointBackgroundColor: 'rgba(" + item.PointBackgroundColor + @")', pointHoverBackgroundColor: '" + item.PointHoverBackgroundColor + @"'
                        , pointHoverBorderColor: 'rgba(" + item.PointHoverBorderColor + @")', pointBorderWidth:" + item.PointBorderWidth + @", data: [" + string.Join(",", data.ToArray()) + @"]}");

        }

        string chart = @"<script>
            if ($('#" + CanvasId + @"').length) {
                var e = document.getElementById('" + CanvasId + @"');
                new Chart(e, {
                    type: '" + Type + @"', data: {
                        labels: [" + string.Join(",", categories.ToArray()) + @"],
                        datasets: [" + string.Join(",", legends.ToArray()) + @"]
                    }
                })
            }
            </script>
            ";

        return chart;
    }
}