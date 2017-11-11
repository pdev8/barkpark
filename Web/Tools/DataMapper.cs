using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BarkPark.Web.Tools
{
    public sealed class DataMapper<T> where T : class
    {
        private System.Reflection.PropertyInfo[] props;

        private static readonly DataMapper<T> _instance = new DataMapper<T>();
        private DataMapper()
        {
            props = typeof(T).GetProperties();
        }

        static DataMapper() { }

        public static DataMapper<T> Instance { get { return _instance; } }

        public T MapToObject(IDataReader reader)
        {
            IEnumerable<string> colnames = reader.GetSchemaTable().Rows.Cast<DataRow>().Select(c => c["ColumnName"].ToString().ToLower()).ToList();

            T obj = Activator.CreateInstance<T>();

            foreach (System.Reflection.PropertyInfo prop in props)
            {
                if (colnames.Contains(prop.Name.ToLower()))
                {
                    if (reader[prop.Name] != DBNull.Value)
                    {
                        if (reader[prop.Name].GetType() == typeof(decimal))
                        {
                            prop.SetValue(obj, (reader.GetDouble(prop.Name)), null);
                        }
                        else
                        {
                            prop.SetValue(obj, (reader.GetValue(reader.GetOrdinal(prop.Name)) ?? null), null);
                        }
                    }
                }

            }
            return obj;
        }

    }
    public static class DataHelper
    {
        public static double GetDouble(this DataRow dr, string columnName)
        {
            double dbl = 0;
            double.TryParse(dr[columnName].ToString(), out dbl);
            return dbl;
        }
        public static double GetDouble(this DataRow dr, int columnIndex)
        {
            double dbl = 0;
            double.TryParse(dr[columnIndex].ToString(), out dbl);
            return dbl;
        }
        public static double GetDouble(this IDataReader dr, string columnName)
        {
            double dbl = 0;
            double.TryParse(dr[columnName].ToString(), out dbl);
            return dbl;
        }
        public static double GetDouble(this IDataReader dr, int columnIndex)
        {
            double dbl = 0;
            double.TryParse(dr[columnIndex].ToString(), out dbl);
            return dbl;
        }

    }
}