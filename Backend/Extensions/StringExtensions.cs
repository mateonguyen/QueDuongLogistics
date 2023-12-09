using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading;

namespace Backend.Extensions;

public static class StringExtensions
{
    public static string ToUnSign(this string s)
    {
        Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
        string temp = s.Normalize(NormalizationForm.FormD);
        return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
    }
}
