﻿using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.LMS_Backend.Domain
{
    public class History : Entity<Guid>
    {
        public Guid PatronId { get; set; }
        [ForeignKey(nameof(PatronId))]
        public Patron PatronModel { get; set; }
        public DateTime DateRead { get; set; }
        public Guid BookId { get; set; }
        [ForeignKey(nameof(BookId))]
        public Book BookModel { get; set; }
    }
}
