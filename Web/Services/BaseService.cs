﻿using BarkPark.Web.Adapter;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BarkPark.Web.Services
{
    public class BaseService
    {
        public IDbAdapter Adapter
        {
            get
            {
                return new DbAdapter(new SqlCommand(), new SqlConnection("Server=sql7001.site4now.net;Database=DB_A2CD42_fuelbase;User Id=DB_A2CD42_fuelbase_admin;Password=Fuelbase1!"));

            }
        }
    }
}