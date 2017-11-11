using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BarkPark.Web.Tools
{
    public sealed class SqlDbParameter
    {
        private static readonly SqlDbParameter _instance = new SqlDbParameter();

        private SqlDbParameter() { }
        static SqlDbParameter() { }
        public static SqlDbParameter Instance { get { return _instance; } }

        public SqlParameter BuildParameter<T>(string paramName, T paramValue, SqlDbType paramType, int paramSize = 0, ParameterDirection paramDirection = ParameterDirection.Input)
        {
            SqlParameter sqlp = new SqlParameter();
            sqlp.ParameterName = paramName;
            sqlp.SqlDbType = paramType;
            sqlp.Direction = paramDirection;
            if (paramSize > 0)
                sqlp.Size = paramSize;
            if (paramType == SqlDbType.Date || paramType == SqlDbType.DateTime)
            {
                DateTime dt = new DateTime();
                if (paramValue == null)
                {
                    sqlp.Value = DBNull.Value;
                    return sqlp;
                }
                DateTime.TryParse((string)Convert.ChangeType(paramValue, typeof(string)), out dt);
                if (dt.Year < 1900)
                    sqlp.Value = System.Data.SqlTypes.SqlDateTime.MinValue;
                else
                    sqlp.Value = paramValue;
                return sqlp;
            }
            if (paramValue == null)
                sqlp.Value = DBNull.Value;
            else
                sqlp.Value = paramValue;
            return sqlp;

        }
    }
}