using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;

public class PagedData
{
    private IEnumerable _data;

    public IEnumerable rows
    {
        get { return _data; }
        set { _data = value; }
    }
    private int _total;

    public int total
    {
        get { return _total; }
        set { _total = value; }
    }

    private bool _success;
    public bool success {
        get { return _success; }
        set { _success = value; }
    }

    public PagedData(object data) : this(data, true) { }

    public PagedData(object data, bool s)
    {

        this.success = s;
        if (data is IQueryable) {
            IQueryable q = (IQueryable)data;
            this.total = q.Count();
            this.rows = q;
        }
        else if (data is IList) {
            IList l = (IList)data;
            this.total = l.Count;
            this.rows = l;
        }
        else {
            List<object> lst = new List<object>();
            lst.Add(data);
            this.total = 1;
            this.rows = lst;
        }
    }

    public PagedData Page(int start, int limit)
    {
        if (rows is IQueryable)
        {
            IQueryable q = (IQueryable)rows;
            q = q.Skip(start);
            if(limit > 0) 
                q = q.Take(limit);
            //this.total = q.Count();
            this.rows = q;
        }
        return this;
    }
}
