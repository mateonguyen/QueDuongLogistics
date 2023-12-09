using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Entities
{
    public interface IDeletable
    {
        public DateTime? Deleted { get; set; }

        public string DeletedBy { get; set; }

        public bool IsDeleted { get; set; }
    }
}